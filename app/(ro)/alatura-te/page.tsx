import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/join";

export const metadata: Metadata = {
  title: "Vino așa cum ești",
  description:
    "Nu trebuie să cunoști pe nimeni ca să vii — vino așa cum ești. Scrie-ne și te punem în legătură cu biserica cea mai apropiată de tine.",
  alternates: { canonical: "/alatura-te", languages: { ro: "/alatura-te", en: "/en/alatura-te" } },
};

export default function Page() {
  return <JoinPage locale="ro" />;
}
