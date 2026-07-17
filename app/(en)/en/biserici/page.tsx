import type { Metadata } from "next";
import { ChurchesPage } from "@/components/pages/churches";

export const metadata: Metadata = {
  title: "Participating churches",
  description:
    "These Romanian Baptist churches in the United Kingdom are part of the Tinerii lui Dumnezeu UK family. Each one takes its turn hosting the youth gatherings.",
  alternates: { canonical: "/en/biserici", languages: { ro: "/biserici", en: "/en/biserici" } },
};

export default function Page() {
  return <ChurchesPage locale="en" />;
}
