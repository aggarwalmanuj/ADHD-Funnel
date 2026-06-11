import { CosmosClient, type Container, type Database } from "@azure/cosmos"

/* ═══════════════════════════════════════════════
   Cosmos DB Client — Clarity Call waitlist storage
   ═══════════════════════════════════════════════ */

const ENDPOINT = process.env.COSMOS_ENDPOINT ?? ""
const KEY = process.env.COSMOS_KEY ?? ""
const DB_NAME = process.env.COSMOS_DATABASE ?? "funnel-db"

let _client: CosmosClient | null = null
let _db: Database | null = null
let _initialized = false

function getClient(): CosmosClient {
  if (!_client) {
    if (!ENDPOINT || !KEY) throw new Error("Cosmos DB is not configured")
    _client = new CosmosClient({ endpoint: ENDPOINT, key: KEY })
  }
  return _client
}

function getDatabase(): Database {
  if (!_db) {
    _db = getClient().database(DB_NAME)
  }
  return _db
}

/** Auto-create database and the waitlist container if they don't exist (runs once). */
async function ensureInitialized(): Promise<void> {
  if (_initialized) return
  const client = getClient()
  await client.databases.createIfNotExists({ id: DB_NAME })
  const db = getDatabase()
  // Clarity Call waitlist submissions from the landing page. Partition key /email.
  await db.containers.createIfNotExists({ id: "waitlist", partitionKey: { paths: ["/email"] } })
  _initialized = true
}

function waitlistContainer(): Container {
  return getDatabase().container("waitlist")
}

export function isCosmosConfigured(): boolean {
  return Boolean(ENDPOINT && KEY && DB_NAME)
}

/* ═══════════════════════════════════════════════
   Waitlist — Clarity Call landing-page submissions
   ═══════════════════════════════════════════════ */

export type WaitlistEntry = {
  firstName: string
  businessName: string
  email: string
  phone?: string
  revenue?: string
  lastWeek?: string
  diagnosis?: string
  clarity?: string
  clarityOther?: string
  source?: string
  // Lifecycle marker shown as a badge in the admin panel. Empty for a plain
  // waitlist signup; "paid-call" once the person books a paid Clarity Call.
  status?: string
}

export type WaitlistDocument = WaitlistEntry & {
  id: string
  createdAt: string
}

/**
 * Persist a Clarity Call waitlist submission. Always creates a new document
 * (repeat emails are allowed — someone may re-apply). Uses a random UUID id.
 * Partition key is /email.
 */
export async function appendWaitlistEntry(entry: WaitlistEntry): Promise<string> {
  await ensureInitialized()
  const container = waitlistContainer()
  const id = crypto.randomUUID()

  const doc: WaitlistDocument = {
    id,
    firstName: entry.firstName,
    businessName: entry.businessName,
    email: entry.email,
    phone: entry.phone ?? "",
    revenue: entry.revenue ?? "",
    lastWeek: entry.lastWeek ?? "",
    diagnosis: entry.diagnosis ?? "",
    clarity: entry.clarity ?? "",
    clarityOther: entry.clarityOther ?? "",
    source: entry.source ?? "adhd-landing",
    status: entry.status ?? "",
    createdAt: new Date().toISOString(),
  }

  await container.items.create(doc)
  return id
}

/** Read all waitlist submissions, newest first (admin panel). */
export async function fetchWaitlist(): Promise<WaitlistDocument[]> {
  await ensureInitialized()
  const container = waitlistContainer()
  const { resources } = await container.items
    .query<WaitlistDocument>("SELECT * FROM c ORDER BY c.createdAt DESC")
    .fetchAll()
  return resources ?? []
}

/**
 * Collapse submissions that share an email into a single record. The newest
 * submission survives; any blank field on it is backfilled from older ones,
 * and the older documents are deleted. Partition key is /email, so each
 * group lives in one partition and the deletes stay cheap.
 */
export async function mergeDuplicateWaitlistEntries(): Promise<{ removed: number; merged: number }> {
  await ensureInitialized()
  const container = waitlistContainer()
  const all = await fetchWaitlist() // newest first

  const byEmail = new Map<string, WaitlistDocument[]>()
  for (const doc of all) {
    const key = (doc.email ?? "").toLowerCase()
    if (!key) continue
    const group = byEmail.get(key) ?? []
    group.push(doc)
    byEmail.set(key, group)
  }

  let removed = 0
  let merged = 0
  for (const group of byEmail.values()) {
    if (group.length < 2) continue
    merged++

    // group[0] is newest (list is sorted DESC). Backfill its empty fields.
    const survivor: WaitlistDocument = { ...group[0] }
    for (const older of group.slice(1)) {
      for (const k of Object.keys(older) as (keyof WaitlistDocument)[]) {
        if (k === "id" || k === "createdAt") continue
        if (!survivor[k] && older[k]) {
          ;(survivor as Record<string, unknown>)[k] = older[k]
        }
      }
    }

    await container.items.upsert(survivor)
    for (const older of group.slice(1)) {
      await container.item(older.id, older.email).delete()
      removed++
    }
  }

  return { removed, merged }
}
