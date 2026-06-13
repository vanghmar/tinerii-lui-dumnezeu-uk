import Link from "next/link";
import type { ReactNode } from "react";

const pill =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "white";
}) {
  const styles = {
    primary: `${pill} bg-orange-600 text-orange-50 hover:bg-orange-700`,
    outline: `${pill} border border-orange-300 text-orange-700 hover:bg-orange-50`,
    white: `${pill} bg-white text-orange-700 hover:bg-orange-50`,
  };
  return (
    <Link href={href} className={styles[variant]}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  highlight = false,
  className = "",
}: {
  children: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 border ${
        highlight ? "border-orange-200" : "border-stone-200/70"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionBand({
  children,
  tint = false,
  className = "",
}: {
  children: ReactNode;
  tint?: boolean;
  className?: string;
}) {
  return (
    <section className={`${tint ? "bg-orange-50" : "bg-white"} ${className}`}>
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
        muted ? "text-stone-400" : "text-orange-700"
      }`}
    >
      {children}
    </p>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 mt-2">{children}</h2>
  );
}
