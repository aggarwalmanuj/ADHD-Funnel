import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// The funnel sells the $47 Diagnostic Report as a one-time
// payment (mode: "payment") via app/api/stripe/checkout. The
// $497 / $997 tiers are paid + booked inside Calendly's hosted
// flow, which talks to its own Stripe account — those never
// hit this webhook. So the events we care about here are:
//
//   checkout.session.completed       → success path
//   checkout.session.expired         → user abandoned (info only)
//   payment_intent.payment_failed    → card declined or 3DS failed
//   charge.refunded                  → refunded after the fact

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event
  if (secret && signature) {
    try {
      event = getStripe().webhooks.constructEvent(body, signature, secret)
    } catch (err) {
      console.error("[stripe/webhook] signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }
  } else {
    // No signature or no secret. An unsigned, unverified webhook body is
    // forgeable by anyone who knows the URL, so we FAIL CLOSED in production.
    // The unsigned fallback exists ONLY to enable local development with
    // `stripe trigger` before the CLI's webhook secret has been wired up.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[stripe/webhook] Rejected: missing stripe-signature or STRIPE_WEBHOOK_SECRET in production. " +
          "Set STRIPE_WEBHOOK_SECRET so deliveries are signature-verified.",
      )
      return NextResponse.json(
        { error: "Webhook signature verification required" },
        { status: 400 },
      )
    }
    console.warn(
      "[stripe/webhook] STRIPE_WEBHOOK_SECRET not set — accepting event without signature verification (development only)",
    )
    try {
      event = JSON.parse(body) as Stripe.Event
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      console.info("[stripe/webhook] checkout completed", {
        id: session.id,
        email: session.customer_details?.email ?? session.customer_email,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status,
        tier: session.metadata?.tier,
        productId: session.metadata?.productId,
        audience: session.metadata?.audience,
      })
      break
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session
      console.info("[stripe/webhook] checkout session expired", {
        id: session.id,
        email: session.customer_details?.email ?? session.customer_email,
        tier: session.metadata?.tier,
      })
      break
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent
      console.warn("[stripe/webhook] payment failed", {
        id: intent.id,
        amount: intent.amount,
        lastPaymentError: intent.last_payment_error?.message,
        declineCode: intent.last_payment_error?.decline_code,
        tier: intent.metadata?.tier,
      })
      break
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge
      console.warn("[stripe/webhook] charge refunded", {
        id: charge.id,
        amountRefunded: charge.amount_refunded,
        paymentIntent: charge.payment_intent,
      })
      break
    }
    default:
      console.info("[stripe/webhook] event ignored", { type: event.type })
  }

  return NextResponse.json({ received: true })
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST Stripe webhook events here. Configure endpoint in Stripe dashboard → Developers → Webhooks.",
  })
}
