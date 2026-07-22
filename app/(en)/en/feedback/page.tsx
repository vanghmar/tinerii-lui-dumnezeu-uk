import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/feedback";

export const metadata: Metadata = {
  title: "Share your feedback",
  description: "Tell us what you like, what we could improve, and what you'd like to see on the site.",
  alternates: { canonical: "/en/feedback" },
};

export default function Page() {
  return <FeedbackPage />;
}
