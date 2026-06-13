import type { Metadata } from "next";
import "../globals.css";
import { inter, lora } from "@/lib/fonts";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Tinerii lui Dumnezeu UK — Young people united in Christ",
    template: "%s · Tinerii lui Dumnezeu UK",
  },
  description:
    "Every two months, young people from Romanian Baptist churches across the UK gather for fellowship, worship and God's Word.",
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
