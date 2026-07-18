import type { Metadata } from "next";
import { CookiePolicyPage } from "@/components/pages/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How we use cookies on tinericrestini.uk.",
  alternates: {
    canonical: "/en/politica-cookie-uri",
    languages: { ro: "/politica-cookie-uri", en: "/en/politica-cookie-uri" },
  },
};

export default function Page() {
  return <CookiePolicyPage locale="en" />;
}
