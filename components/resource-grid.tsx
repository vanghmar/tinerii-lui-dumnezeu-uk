"use client";

import { useState } from "react";
import type { Resource } from "@/data/types";
import { type Locale } from "@/lib/i18n";
import { Card } from "@/components/ui";
import { PlayIcon, ChevronDownIcon } from "@/components/icons";

const INITIAL_COUNT = 4;

const copy = {
  showMore: { ro: "Arată mai multe", en: "Show more" },
  showLess: { ro: "Arată mai puține", en: "Show less" },
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="h-full flex items-start gap-3">
        <PlayIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-stone-800 leading-snug">{resource.title}</p>
          <p className="text-sm text-stone-400 mt-1">{resource.source}</p>
        </div>
      </Card>
    </a>
  );
}

export function ResourceGrid({ items, locale }: { items: Resource[]; locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = items.length > INITIAL_COUNT;
  const visible = expanded || !canCollapse ? items : items.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {visible.map((r) => (
          <ResourceCard key={r.url} resource={r} />
        ))}
      </div>
      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 text-orange-700 px-5 py-2 text-sm font-medium mt-5 hover:bg-orange-50 transition-colors duration-200"
        >
          {expanded ? copy.showLess[locale] : copy.showMore[locale]}
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}
