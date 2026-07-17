import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/join";

export const metadata: Metadata = {
  title: "Come as you are",
  description:
    "You don't need to know anyone to come — come as you are. Write to us and we'll connect you with the church nearest to you.",
  alternates: { canonical: "/en/alatura-te", languages: { ro: "/alatura-te", en: "/en/alatura-te" } },
};

export default function Page() {
  return <JoinPage locale="en" />;
}
