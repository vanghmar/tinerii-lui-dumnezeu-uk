import type { Metadata } from "next";
import { ResourcesPage } from "@/components/pages/resources";

export const metadata: Metadata = {
  title: "Ce ascultăm și ce urmărim",
  description:
    "În grupul nostru de WhatsApp, tinerii împărtășesc adesea scurte videoclipuri, predici și canale care i-au ajutat în umblarea lor cu Dumnezeu.",
  alternates: { canonical: "/resurse", languages: { ro: "/resurse", en: "/en/resurse" } },
};

export default function Page() {
  return <ResourcesPage locale="ro" />;
}
