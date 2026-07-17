import type { Metadata } from "next";
import { ResourcesPage } from "@/components/pages/resources";

export const metadata: Metadata = {
  title: "What we're watching and listening to",
  description:
    "In our WhatsApp group, young people often share short videos, messages and channels that have helped them in their walk with God.",
  alternates: { canonical: "/en/resurse", languages: { ro: "/resurse", en: "/en/resurse" } },
};

export default function Page() {
  return <ResourcesPage locale="en" />;
}
