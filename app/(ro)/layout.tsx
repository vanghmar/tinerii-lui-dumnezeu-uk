import type { Metadata } from "next";
import "../globals.css";
import { inter, lora } from "@/lib/fonts";
import { SiteShell } from "@/components/site-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Tinerii lui Dumnezeu UK — Tineri uniți în Hristos";
const description =
  "O dată la două luni, tinerii din bisericile baptiste române din UK se adună pentru părtășie, închinare și Cuvântul lui Dumnezeu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/", languages: { ro: "/", en: "/en" } },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/images/hero-youth-meeting.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${lora.variable} antialiased`}>
      <body>
        <SiteShell locale="ro">{children}</SiteShell>
      </body>
    </html>
  );
}
