import type { Metadata } from "next";
import { EventsPage } from "@/components/pages/events";

export const metadata: Metadata = {
  title: "Întâlnirile tinerilor",
  description:
    "La fiecare două luni, o altă biserică găzduiește întâlnirea. Toți tinerii sunt bineveniți — vino cu un prieten!",
  alternates: { canonical: "/evenimente", languages: { ro: "/evenimente", en: "/en/evenimente" } },
};

export default function Page() {
  return <EventsPage locale="ro" />;
}
