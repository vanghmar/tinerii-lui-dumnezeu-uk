import type { Metadata } from "next";
import { ChurchesPage } from "@/components/pages/churches";

export const metadata: Metadata = {
  title: "Bisericile participante",
  description:
    "Aceste biserici baptiste române din Marea Britanie fac parte din familia Tinerii lui Dumnezeu UK. Fiecare găzduiește, pe rând, întâlnirile tinerilor.",
  alternates: { canonical: "/biserici", languages: { ro: "/biserici", en: "/en/biserici" } },
};

export default function Page() {
  return <ChurchesPage locale="ro" />;
}
