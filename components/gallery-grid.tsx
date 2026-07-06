"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { ChevronIcon, CloseIcon } from "@/components/icons";

export function GalleryGrid({ images, locale }: { images: GalleryImage[]; locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const goNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

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

  const open = openIndex !== null ? images[openIndex] : null;

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
              <div className={`grid gap-3 ${section.photos.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"}`}>
                {section.photos.map((img) => {
                  const index = images.indexOf(img);
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt[locale]}
                        fill
                        sizes={section.photos.length === 1 ? "(max-width: 640px) 90vw, 672px" : "(max-width: 640px) 50vw, 33vw"}
                        className="object-cover transition-all duration-300 hover:scale-105"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ));
        })()}
      </div>

      {open && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-label={open.alt[locale]}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label={locale === "ro" ? "Închide" : "Close"}
            className="absolute z-10 top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white transition-colors duration-200 p-2"
          >
            <CloseIcon className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={locale === "ro" ? "Fotografia anterioară" : "Previous photo"}
            className="absolute z-10 left-1 sm:left-4 text-white/70 hover:text-white transition-all duration-200 hover:scale-110 p-2 sm:p-3 bg-black/0 hover:bg-black/20 rounded-full"
          >
            <ChevronIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </button>

          <div
            className="relative w-full max-w-3xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={open.src} alt={open.alt[locale]} fill className="object-contain" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={locale === "ro" ? "Fotografia următoare" : "Next photo"}
            className="absolute z-10 right-1 sm:right-4 text-white/70 hover:text-white transition-all duration-200 hover:scale-110 p-2 sm:p-3 bg-black/0 hover:bg-black/20 rounded-full rotate-180"
          >
            <ChevronIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </button>

          <p className="absolute z-10 bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
