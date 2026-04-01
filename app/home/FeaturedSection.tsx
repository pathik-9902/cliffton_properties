'use client';

import { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/property/PropertyCard';
import { FullPropertyDetails } from '@/types/property';

type Props = {
  properties: FullPropertyDetails[];
  loading?: boolean;
  error?: boolean;
};

const MAX_ITEMS = 6;

export default function FeaturedSection({
  properties = [],
  loading = false,
  error = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ SAFE FILTER (prevents undefined crash)
  const featuredProperties = useMemo(() => {
    return properties.filter(
      (p): p is FullPropertyDetails => Boolean(p && p.is_featured)
    );
  }, [properties]);

  // ✅ SAFE DUPLICATION (for infinite loop)
  const loopData = useMemo(() => {
    const base = featuredProperties.slice(0, MAX_ITEMS);

    if (base.length === 0) return [];

    return [...base, ...base];
  }, [featuredProperties]);

  // ✅ TIME-BASED AUTO SCROLL (NO JITTER, NO DRIFT)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loopData.length === 0) return;

    let animationFrame: number;
    let isPaused = false;
    let lastTime = performance.now();

    const speed = 40; // px per second

    const step = (time: number) => {
      if (!container) return;

      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        container.scrollLeft += (speed * delta) / 1000;

        // seamless loop reset
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }

      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    const pause = () => (isPaused = true);
    const resume = () => (isPaused = false);

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, [loopData]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f]">
              Featured Properties
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Handpicked premium listings you should not miss.
            </p>
          </div>

          <Link
            href="/properties?featured=true"
            className="text-sm font-bold text-[#6f4e37]"
          >
            View All →
          </Link>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="mt-12 sm:mt-14 flex gap-4 sm:gap-6 overflow-x-auto">
            {Array.from({ length: MAX_ITEMS }).map((_, i) => (
              <div
                key={i}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[320px] h-[440px] rounded-2xl bg-[#f5efe7] animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-14 text-center text-red-500">
            Failed to load properties. Please try again.
          </div>
        ) : loopData.length === 0 ? (
          <div className="mt-14 text-center text-gray-400">
            No featured properties available.
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="mt-12 sm:mt-14 flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-hide"
          >
            {loopData.map((property, index) => {
              if (!property) return null; // ✅ final safety guard

              return (
                <div
                  key={`${property.id}-${index}`}
                  className="flex-none w-[260px] sm:w-[300px] lg:w-[320px] shrink-0"
                >
                  <PropertyCard property={property} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}