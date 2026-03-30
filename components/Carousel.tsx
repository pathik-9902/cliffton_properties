'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

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

  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group rounded-2xl overflow-hidden">

      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((img, idx) => (
            <div key={idx} className="relative min-w-full h-[320px] md:h-[520px]">
              <Image
                src={img.image_url}
                alt={`${title} ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-5 left-5 text-white pointer-events-none">
        <p className="text-[11px] uppercase tracking-widest opacity-70 mb-0.5">
          Featured
        </p>
        <h3 className="text-base md:text-lg font-medium leading-tight">
          {title}
        </h3>
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
        {current + 1} / {images.length}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === current ? '20px' : '6px',
              background: idx === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full
          flex items-center justify-center
          bg-white/15 hover:bg-white/28 backdrop-blur-md
          border border-white/30
          text-white text-xl
          opacity-0 group-hover:opacity-100
          transition-all duration-200
        "
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        aria-label="Next image"
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full
          flex items-center justify-center
          bg-white/15 hover:bg-white/28 backdrop-blur-md
          border border-white/30
          text-white text-xl
          opacity-0 group-hover:opacity-100
          transition-all duration-200
        "
      >
        ›
      </button>
    </div>
  );
}