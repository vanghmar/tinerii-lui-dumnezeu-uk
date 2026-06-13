import type { Metadata } from "next";
import "../globals.css";
import { inter, lora } from "@/lib/fonts";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Tinerii lui Dumnezeu UK — Tineri uniți în Hristos",
    template: "%s · Tinerii lui Dumnezeu UK",
  },
  description:
    "O dată la două luni, tinerii din bisericile baptiste române din UK se adună pentru părtășie, închinare și Cuvântul lui Dumnezeu.",
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
