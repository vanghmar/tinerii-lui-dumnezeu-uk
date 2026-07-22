"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FeedbackCtaButton() {
  const pathname = usePathname();
  if (pathname === "/en/feedback") return null;

  return (
    <Link
      href="/en/feedback"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-orange-600 text-orange-50 shadow-lg hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-out"
    >
      Share Feedback
    </Link>
  );
}
