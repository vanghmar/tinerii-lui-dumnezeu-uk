import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Tinerii lui Dumnezeu UK began with our pastors' desire to bring together the young people of the Romanian Baptist churches in the United Kingdom.",
  alternates: { canonical: "/en/despre", languages: { ro: "/despre", en: "/en/despre" } },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
