"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/data/types";
import type { Locale } from "@/lib/i18n";

export function GalleryGrid({ images, locale }: { images: GalleryImage[]; locale: Locale }) {
  const [open, setOpen] = useState<GalleryImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 text-sm"
          >
            {locale === "ro" ? "În curând" : "Coming soon"}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(img)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100"
          >
            <Image
              src={img.src}
              alt={img.alt[locale]}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/80 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-label={open.alt[locale]}
        >
          <div className="relative w-full max-w-3xl aspect-[4/3]">
            <Image src={open.src} alt={open.alt[locale]} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
