# ADHD Funnel — AIMerge

Landing page and Clarity Call waitlist funnel for **AIMerge**, a four-week program built around how ADHD-style brains actually operate. Built for executives, founders, and operators whose talent is real but rarely lands the way it should.

> 29% of entrepreneurs self-report ADHD — 6× the general adult population.
> *— Freeman MD, UCSF*

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens via CSS custom properties in `app/globals.css`)
- **Framer Motion** for all motion and micro-interactions
- **next/font** with **Fraunces** (headings) + **Inter** (body)

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx          # font loading, metadata
  page.tsx            # section order — single source of truth for the page
  globals.css         # design tokens, body styles, overflow guards
components/
  Nav.tsx             # sticky nav, shrink-on-scroll, mobile drawer
  Hero.tsx            # H1, eyebrow, bullets, hero image, CTA
  Credibility.tsx     # logos, credentials grid, animated stat bar
  Pain.tsx            # quote cards
  RealCost.tsx        # research narrative + pullquote
  FourWeeks.tsx       # "What changes in four weeks" — 5 numbered rows
  Testimonials.tsx    # Nick + Bansari proof cards
  Differentiation.tsx # 3 contrast rows + Mensa note
  HowItWorks.tsx      # 3-step waitlist process
  Fit.tsx             # for / not for, with draw-on icons
  WaitlistForm.tsx    # 4-step inline form with validation
  Footer.tsx          # final CTA + site footer
  FadeIn.tsx          # scroll-in fade wrapper
  Magnetic.tsx        # cursor-pull wrapper for CTAs
  CountUp.tsx         # number count-up triggered on scroll
  ScrollProgress.tsx  # 1px progress bar at top
hooks/
  useIsMobile.ts      # breakpoint hook (≤1024px)
public/
  images/             # hero, meeting, logo, brand marks
```

## Design system

All design tokens live as CSS custom properties at the top of `app/globals.css`:

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0A0A0F` | page base |
| `--bg-alt` | `#12131C` | subtle alternating section bg |
| `--bg-2` | `#0F1624` | deeper surface |
| `--bg-card` | `#141B2E` | card backgrounds |
| `--border` | `#1E2235` | dividers and outlines |
| `--accent` | `#E8962A` | amber — italics, CTAs, numerals |
| `--accent-dark` | `#C57E20` | gradient ends |
| `--text-muted` | `#8A8A9A` | body copy support |
| `--text-dim` | `#5A5F6E` | eyebrows, captions |
| `--font-heading` | Fraunces | H1–H4, stat numerals, italic accents |
| `--font-body` | Inter | everything else |

Sections alternate between `--bg` and `--bg-alt` for a quiet rhythm down the page.

## Motion principles

Animation is restrained on purpose — every motion either guides attention or rewards interaction. Nothing is decorative.

- **Cubic-ease curve `[0.22, 1, 0.36, 1]`** is used everywhere — gentle in, soft out.
- **Durations** sit in the 500–900ms range. No 200ms snaps.
- **Triggers** are mostly `whileInView` (once) or `whileHover`. No looping ambient animations.

Highlights:

- **ScrollProgress** — 1px amber bar at the top, spring-smoothed
- **CountUp** — `29 → 29%`, `44 → 44%`, `47` animate the first time they scroll into view
- **FourWeeks rows** — hover any row: number nudges, a short amber line draws between the number and heading
- **RealCost** — the 3px amber pullquote border draws top-to-bottom on scroll-in
- **HowItWorks** — `Step 01 / 02 / 03` drop into place with a staggered cascade
- **Differentiation** — hover any row: subtle `rgba(255,255,255,0.02)` wash, tag shifts 6px right
- **Fit** — checks and crosses draw stroke-by-stroke when the card enters view
- **Magnetic CTAs** — Hero and Footer buttons drift subtly toward the cursor

## Section order

The single source of truth for what renders on the page is `app/page.tsx`:

```
Nav → Hero → Credibility → Pain → RealCost → FourWeeks
    → Testimonials → Differentiation → HowItWorks
    → Fit → WaitlistForm → Footer
```

## Conventions

- **No CSS modules** — components use inline styles + CSS variables, keeping layout and tokens co-located.
- **`useIsMobile` for responsive branches** — single breakpoint at 1024px. Avoids juggling viewport queries inside style objects.
- **Components are largely self-contained** — copy lives in arrays at the top of each component file, not in a CMS.
- **Avoid hardcoded colors** — always reach for `var(--accent)` etc. so a palette swap stays a one-file change.

## Deploy

The simplest path is [Vercel](https://vercel.com/new) — connect the repo, no config needed.

Manual deploy:

```bash
npm run build
npm run start    # any Node host
```

## License

Private project — © TetraNoodle Technologies.
