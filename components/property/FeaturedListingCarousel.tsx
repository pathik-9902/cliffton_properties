'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------- TYPES ----------------
type Property = {
  id: string;
  title: string;
  city: string;
  area?: string;
  price: number;
  images: any[];
};

type Props = {
  properties: Property[];
};

const AUTO_PLAY_DELAY = 4000;

export default function FeaturedListingCarousel({ properties }: Props) {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  // ---------------- RESET INDEX ----------------
  useEffect(() => {
    if (index >= properties.length) {
      setIndex(0);
    }
  }, [properties]);

  // ---------------- AUTO PLAY ----------------
  useEffect(() => {
    if (paused || properties.length === 0) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % properties.length);
    }, AUTO_PLAY_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, properties]);

  // ---------------- SAFE IMAGE ----------------
  const getImageSrc = (images: any[]) => {
    if (!images?.length) return '/placeholder.png';

    const first = images[0];

    if (typeof first === 'string') return first;

    if (typeof first === 'object') {
      if (first.public_id) return first.public_id; // ✅ FIX
      if (first.url) return first.url;
      if (first.src) return first.src;
    }

    return '/placeholder.png';
  };

  // ---------------- PRELOAD ----------------
  useEffect(() => {
    if (properties.length > 1) {
      const next = properties[(index + 1) % properties.length];
      const img = new Image();
      img.src = getImageSrc(next.images);
    }
  }, [index, properties]);

  // ---------------- TOUCH ----------------
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      setIndex((prev) => (prev + 1) % properties.length);
    } else if (diff < -50) {
      setIndex((prev) =>
        prev === 0 ? properties.length - 1 : prev - 1
      );
    }

    touchStartX.current = null;
  };

  // ---------------- CLICK HANDLER ----------------
  const handleNavigate = () => {
    const property = properties[index];
    router.push(`/properties/detail/${property.id}`);
  };

  // ---------------- EMPTY ----------------
  if (!properties || properties.length === 0) {
    return (
      <div className="h-44 sm:h-52 md:h-64 lg:h-72 rounded-xl bg-gray-100 animate-pulse" />
    );
  }

  const property = properties[index];
  const imageSrc = getImageSrc(property.images);

  return (
    <div
      className="
        relative 
        h-48 sm:h-56 md:h-72 lg:h-[420px] xl:h-[520px] 2xl:h-[600px]
        rounded-xl 
        overflow-hidden 
        group 
        border border-white/10
        cursor-pointer
      "
      onClick={handleNavigate}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={property.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={imageSrc}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '/placeholder.png';
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* CONTENT */}
          <div className="absolute bottom-0 w-full p-3 sm:p-4 text-white pointer-events-none">

            <p className="text-[11px] sm:text-xs opacity-80 mb-1">
              {property.area}, {property.city}
            </p>

            <p className="text-xs sm:text-sm mt-1 font-semibold text-white/90">
              ₹ {property.price?.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
        <motion.div
          key={index}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: paused ? 0 : AUTO_PLAY_DELAY / 1000,
            ease: 'linear',
          }}
          className="h-full bg-white"
        />
      </div>

      {/* DOTS */}
      <div className="absolute bottom-2 right-2 sm:right-3 flex gap-1">
        {properties.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation(); // 🔥 important
              setIndex(i);
            }}
            className={`transition-all h-1.5 rounded-full ${i === index
                ? 'w-4 bg-white'
                : 'w-1.5 bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* NAV BUTTONS */}
      <div className="absolute inset-0 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) =>
              prev === 0 ? properties.length - 1 : prev - 1
            );
          }}
          className="bg-black/40 hover:bg-black/60 text-white px-2 py-1 rounded-md text-sm"
        >
          ‹
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) => (prev + 1) % properties.length);
          }}
          className="bg-black/40 hover:bg-black/60 text-white px-2 py-1 rounded-md text-sm"
        >
          ›
        </button>
      </div>
    </div>
  );
}