import type { Metadata } from "next";
import { CookiePolicyPage } from "@/components/pages/cookie-policy";

export const metadata: Metadata = {
  title: "Politica de cookie-uri",
  description: "Cum folosim cookie-urile pe tinericrestini.uk.",
  alternates: {
    canonical: "/politica-cookie-uri",
    languages: { ro: "/politica-cookie-uri", en: "/en/politica-cookie-uri" },
  },
};

export default function Page() {
  return <CookiePolicyPage locale="ro" />;
}
