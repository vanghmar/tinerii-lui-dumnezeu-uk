import Link from "next/link";
import type { ReactNode } from "react";

const pill =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg";

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
      className={`rounded-2xl bg-white p-6 border transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 ${
        highlight ? "border-orange-300 shadow-md" : "border-stone-200/70 shadow-sm"
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
    <section className={`border-t border-stone-200/50 ${tint ? "bg-orange-50" : "bg-white"} ${className}`}>
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
    <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 mt-2 border-l-4 border-orange-500 pl-4">{children}</h2>
  );
}
