'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

import { FullPropertyDetails } from '@/types/property';

/* ---------------- TYPES ---------------- */

type PropertyCardProps = {
  property: FullPropertyDetails;
  priority?: boolean;
};

/* ---------------- COMPONENT ---------------- */

function PropertyCardComponent({
  property,
  priority = false,
}: PropertyCardProps) {
  const {
    id,
    title,
    category,
    listing_type,
    city,
    area,
    price,
    is_featured,
    verified,
    residential_details,
    commercial_details,
    land_details,
    images,
  } = property;

  /* ---------------- IMAGE SLIDER ---------------- */

  const sortedImages = useMemo(() => {
    return images?.slice().sort((a, b) => a.sort_order - b.sort_order) || [];
  }, [images]);

  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const prevImage = () => {
    setIndex((prev) =>
      prev === 0 ? sortedImages.length - 1 : prev - 1
    );
  };

  const currentImage =
    sortedImages[index]?.image_url || '/placeholder.png';

  /* ---------------- DERIVED ---------------- */

  const builtUpArea =
    residential_details?.built_up_area ??
    commercial_details?.built_up_area;

  const formattedPrice = useMemo(() => {
    if (price >= 1_00_00_000)
      return `${(price / 1_00_00_000).toFixed(2)} Cr`;
    if (price >= 1_00_000)
      return `${(price / 1_00_000).toFixed(2)} L`;
    return price.toLocaleString('en-IN');
  }, [price]);

  const whatsappLink = `https://wa.me/919999999999?text=Interested in ${title}`;

  /* ---------------- UI ---------------- */

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500">

      {/* IMAGE */}
      <div className="relative h-60 w-full">

        <Image
          src={currentImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"

          // ✅ Critical LCP Fix
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* LUXURY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* SLIDER CONTROLS */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/50"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/50"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full tracking-widest">
            {listing_type.toUpperCase()}
          </span>

          {is_featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] px-3 py-1 rounded-full">
              PREMIUM
            </span>
          )}
        </div>

        {/* WISHLIST */}
        <button className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/50 transition">
          <Heart size={16} />
        </button>

        {/* VERIFIED */}
        {verified && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            <ShieldCheck size={12} />
            Verified
          </div>
        )}

        {/* PRICE OVERLAY */}
        <div className="absolute bottom-4 right-4 text-right">
          <p className="text-white text-xl font-bold">
            ₹{formattedPrice}
          </p>
          <p className="text-xs text-white/70">
            {listing_type === 'rent' ? '/month' : ''}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        {/* TITLE */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>

        {/* LOCATION */}
        <p className="text-sm text-gray-500 flex items-center">
          <MapPin size={14} className="mr-1 opacity-70" />
          {area ? `${area}, ` : ''}
          {city}
        </p>

        {/* SPECS */}
        <div className="flex flex-wrap gap-2 pt-2">
          {category === 'residential' && residential_details && (
            <>
              <Chip icon={<Bed size={12} />} value={`${residential_details.bedrooms} BHK`} />
              <Chip icon={<Bath size={12} />} value={`${residential_details.bathrooms}`} />
            </>
          )}

          {builtUpArea && (
            <Chip icon={<Maximize size={12} />} value={`${builtUpArea} sqft`} />
          )}
        </div>

        {/* CTA */}
        <div className="pt-4 flex justify-between items-center">
          <Link href={`/properties/detail/${id}`}>
            <button className="text-sm font-medium text-gray-900 hover:underline">
              View Details
            </button>
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            className="bg-black text-white px-4 py-2 rounded-full text-xs hover:bg-gray-800 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MEMO ---------------- */

const PropertyCard = React.memo(PropertyCardComponent);
export default PropertyCard;

/* ---------------- CHIP ---------------- */

function Chip({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1 bg-gray-100/70 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-700">
      {icon}
      <span>{value}</span>
    </div>
  );
}