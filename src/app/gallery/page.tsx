"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { getGallery } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { PageHero } from "@/components/ui/PageHero";

const galleryItems = getGallery();

export default function GalleryPage() {
  const [filter, setFilter] = useState<"photo" | "video">("photo");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; type: "image" | "video" } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = galleryItems.filter((item) => item.category === filter);
  useStaggerReveal(containerRef, { childSelector: ".gallery-item" });

  return (
    <div>
      <PageHero title="Gallery" subtitle="Photos and moments from our journey." imageUrl="/assets/hero.svg" />
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setFilter("photo")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === "photo" ? "bg-primary text-white" : "bg-white text-primary border border-primary/30 hover:bg-primary/5"
              }`}
            >
              Photos
            </button>
            <button
              type="button"
              onClick={() => setFilter("video")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === "video" ? "bg-primary text-white" : "bg-white text-primary border border-primary/30 hover:bg-primary/5"
              }`}
            >
              Videos
            </button>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-neutral-muted py-12">No {filter}s in this section yet.</p>
          ) : (
            <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  className="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  onClick={() =>
                    setLightbox({
                      src: item.src,
                      alt: item.alt,
                      type: item.category === "video" ? "video" : "image",
                    })
                  }
                >
                  <Image
                    src={item.thumbnail || item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
          src={lightbox.src}
          alt={lightbox.alt}
          type={lightbox.type}
        />
      )}
    </div>
  );
}
