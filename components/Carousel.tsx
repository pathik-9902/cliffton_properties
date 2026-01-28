'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

type Props = {
  images: { image_url: string }[];
  title: string;
};

export default function ImageCarousel({ images, title }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group">
      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="flex">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative min-w-full h-[320px] md:h-[520px]"
            >
              <Image
                src={img.image_url}
                alt={`${title} ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Optional Caption */}
              {idx === 0 && (
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs uppercase tracking-widest opacity-80">
                    Featured
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {title}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2
        opacity-0 group-hover:opacity-100 transition
        bg-white/80 backdrop-blur-md
        w-11 h-11 rounded-full
        flex items-center justify-center
        text-xl text-neutral-800
        shadow-md hover:bg-white"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2
        opacity-0 group-hover:opacity-100 transition
        bg-white/80 backdrop-blur-md
        w-11 h-11 rounded-full
        flex items-center justify-center
        text-xl text-neutral-800
        shadow-md hover:bg-white"
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}
