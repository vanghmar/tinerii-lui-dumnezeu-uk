// Lightweight inline SVG icons — stroke-based, inherit currentColor.
// Decorative by default (aria-hidden); pass a title for meaningful icons.

type IconProps = { className?: string };

function base(className = "w-4 h-4") {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 21s-6.5-5.2-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
