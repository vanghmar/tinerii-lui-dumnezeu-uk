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

  // Build render list: inject section headers before the first photo of each section
  const items: Array<{ type: "header"; label: string } | { type: "photo"; img: GalleryImage }> = [];
  for (const img of images) {
    if (img.section) {
      items.push({ type: "header", label: img.section[locale] });
    }
    items.push({ type: "photo", img });
  }

  // Collect only photos for lightbox navigation
  const photos = images;

  return (
    <>
      <div className="space-y-10">
        {(() => {
          const sections: Array<{ header?: string; photos: GalleryImage[] }> = [];
          let current: { header?: string; photos: GalleryImage[] } = { photos: [] };
          for (const img of images) {
            if (img.section) {
              if (current.photos.length > 0 || current.header) sections.push(current);
              current = { header: img.section[locale], photos: [img] };
            } else {
              current.photos.push(img);
            }
          }
          if (current.photos.length > 0 || current.header) sections.push(current);

          return sections.map((section, si) => (
            <div key={si}>
              {section.header && (
                <div className="mb-4">
                  <h3 className="font-serif text-xl text-stone-800">{section.header}</h3>
                  <div className="mt-1 h-px w-16 bg-orange-500" />
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {section.photos.map((img) => (
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
            </div>
          ));
        })()}
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
