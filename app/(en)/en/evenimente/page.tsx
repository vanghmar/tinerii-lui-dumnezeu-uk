import type { Metadata } from "next";
import { EventsPage } from "@/components/pages/events";

export const metadata: Metadata = {
  title: "Youth gatherings",
  description:
    "Every two months, a different church hosts the gathering. All young people are welcome — bring a friend!",
  alternates: { canonical: "/en/evenimente", languages: { ro: "/evenimente", en: "/en/evenimente" } },
};

export default function Page() {
  return <EventsPage locale="en" />;
}
