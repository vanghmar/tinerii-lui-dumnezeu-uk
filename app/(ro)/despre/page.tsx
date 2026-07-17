import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Tinerii lui Dumnezeu UK a început din dorința păstorilor noștri de a-i aduce împreună pe tinerii din bisericile baptiste române din Marea Britanie.",
  alternates: { canonical: "/despre", languages: { ro: "/despre", en: "/en/despre" } },
};

export default function Page() {
  return <AboutPage locale="ro" />;
}
