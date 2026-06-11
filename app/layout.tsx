import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ChallengeProvider } from "@/context/challenge-context";
import FacebookPixelTracker from "@/components/facebook-pixel";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const RAW_FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
// Hard-validate format to prevent template injection via inline script.
// Facebook Pixel IDs are numeric strings.
const FB_PIXEL_ID =
  RAW_FB_PIXEL_ID && /^\d{6,20}$/.test(RAW_FB_PIXEL_ID) ? RAW_FB_PIXEL_ID : null;

// Google Analytics 4 measurement ID. Env-overridable for non-prod
// properties; defaults to the production tag. Format-validated (G-XXXX…)
// because the value is interpolated into an inline <script>.
const RAW_GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-J4575YSZQH";
const GA_MEASUREMENT_ID = /^G-[A-Z0-9]{4,15}$/i.test(RAW_GA_ID)
  ? RAW_GA_ID
  : null;

// Canonical site origin. Set NEXT_PUBLIC_SITE_URL in production env so absolute
// URLs in metadata, OG tags, and JSON-LD all resolve correctly.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aimerge.live"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Clarity Call Waitlist | AIMerge",
  description:
    "A private system built for executives and founders with ADHD-style brains. Join the Clarity Call waitlist.",
  applicationName: "AIMerge",
  generator: "Next.js",
  authors: [
    { name: "Manuj Aggarwal", url: "https://www.linkedin.com/in/manujaggarwal/" },
  ],
  creator: "Manuj Aggarwal",
  publisher: "TetraNoodle Technologies",
  category: "Business Strategy",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "AIMerge",
    title: "Clarity Call Waitlist | AIMerge",
    description:
      "A private system built for executives and founders with ADHD-style brains. Join the Clarity Call waitlist.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarity Call Waitlist | AIMerge",
    description:
      "A private system built for executives and founders with ADHD-style brains. Join the Clarity Call waitlist.",
    creator: "@manujaggarwal",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0F",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#manuj`,
  name: "Manuj Aggarwal",
  jobTitle: "Founder & Fractional CTO",
  worksFor: { "@id": `${SITE_URL}/#tetranoodle` },
  description:
    "Founder of TetraNoodle Technologies. Creator of the AI Merge framework — a human–AI decision system peer-reviewed in the Mensa Research Journal and protected by four patents.",
  image: `${SITE_URL}/manuj/1762108515290.jpg`,
  url: SITE_URL,
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Fractional CTO Services",
    "AI Strategy",
    "Human-AI Decision Systems",
    "Enterprise AI Adoption",
  ],
  award: [
    "Four U.S. patents in human–AI decision systems",
    "Published in the Mensa Research Journal",
    "United Nations keynote speaker",
    "$500M+ documented business impact",
  ],
  sameAs: [
    "https://www.linkedin.com/in/manujaggarwal/",
    "https://tetranoodle.com",
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#tetranoodle`,
  name: "TetraNoodle Technologies",
  founder: { "@id": `${SITE_URL}/#manuj` },
  url: SITE_URL,
  description:
    "AI strategy and Fractional CTO services for founders and operators. Powered by AI Merge — a peer-reviewed human–AI decision system.",
  areaServed: ["United States", "Canada", "Worldwide"],
  serviceType: [
    "Fractional CTO",
    "AI Strategy Consulting",
    "Enterprise AI Adoption",
    "Human–AI Decision Systems",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "CTO Services",
    "AI Merge Framework",
  ],
  award: [
    "Four U.S. patents in human–AI decision systems",
    "Featured in the Mensa Research Journal",
  ],
  sameAs: [
    "https://tetranoodle.com",
    "https://www.linkedin.com/company/tetranoodle/",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        {/*
          Use plain <script> with suppressHydrationWarning rather than
          next/script for these CSP-nonced inline blocks. Browsers strip
          the `nonce` attribute from the live DOM after parsing, so React's
          hydration diff sees the server-rendered nonce vs an empty client
          value and warns. The mismatch is intentional and unavoidable.
        */}
        <script
          id="strip-bitdefender-attrs"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){function s(n){n&&n.removeAttribute&&n.removeAttribute('bis_skin_checked')}new MutationObserver(function(ms){ms.forEach(function(m){if(m.attributeName==='bis_skin_checked')s(m.target);m.addedNodes&&m.addedNodes.forEach(function(n){s(n);n.querySelectorAll&&n.querySelectorAll('[bis_skin_checked]').forEach(s)})})}).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:['bis_skin_checked']})})();`,
          }}
        />
        {GA_MEASUREMENT_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              nonce={nonce}
            />
            <script
              id="ga-gtag"
              nonce={nonce}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        ) : null}
        <script
          id="ld-person"
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          id="ld-professional-service"
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        {FB_PIXEL_ID ? (
          <>
            <script
              id="fb-pixel"
              nonce={nonce}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                hidden
                alt=""
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <Suspense fallback={null}>
              <FacebookPixelTracker />
            </Suspense>
          </>
        ) : null}
        <ChallengeProvider>{children}</ChallengeProvider>
        <CookieConsent />
        <Analytics />
        {/* Local-only dev tools (autofill panel). Rendered ONLY outside
            production, and the script it loads (/devtools.js) is gitignored,
            so nothing dev-related ever ships to prod. The nonce is required
            for the strict-dynamic CSP to allow the script. */}
        {process.env.NODE_ENV !== "production" && (
          <script src="/devtools.js" nonce={nonce} defer suppressHydrationWarning />
        )}
      </body>
    </html>
  );
}
