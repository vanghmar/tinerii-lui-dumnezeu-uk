import { Eyebrow, SectionBand } from "@/components/ui";
import { FeedbackForm } from "@/components/feedback-form";

export function FeedbackPage() {
  return (
    <SectionBand tint>
      <Eyebrow>Feedback</Eyebrow>
      <h1 className="font-serif text-4xl text-stone-800 mt-3">Share your feedback</h1>
      <p className="text-stone-600 mt-4 max-w-2xl leading-relaxed">
        Your voice matters to us. Tell us what you like, what we could do better, and what you&apos;d
        like to see next.
      </p>
      <div className="max-w-2xl mt-8">
        <FeedbackForm />
      </div>
    </SectionBand>
  );
}
