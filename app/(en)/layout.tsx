import type { Metadata } from "next";
import "../globals.css";
import { inter, lora } from "@/lib/fonts";
import { SiteShell } from "@/components/site-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Tinerii lui Dumnezeu UK — Young people united in Christ";
const description =
  "Every two months, young people from Romanian Baptist churches across the UK gather for fellowship, worship and God's Word.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/en", languages: { ro: "/", en: "/en" } },
  openGraph: {
    title,
    description,
    url: "/en",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/hero-youth-meeting.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} antialiased`}>
      <body>
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
