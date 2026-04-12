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
  Sparkles,
} from 'lucide-react';

import { FullPropertyDetails } from '@/types/property';
import { cloudinaryUrl } from '@/lib/cloudinary';

/* ---------------- TYPES ---------------- */

type PropertyCardProps = {
  property: FullPropertyDetails;
  priority?: boolean;
};

type AmenityItem = {
  key: string;
  label: string;
  icon: string;
};

type AmenitiesMap = Record<string, boolean>;

/* ---------------- AMENITIES MASTER ---------------- */

const AMENITIES: AmenityItem[] = [
  { key: 'lift', label: 'Private Lift', icon: '🛗' },
  { key: 'gym', label: 'Smart Gym', icon: '🏋️‍♂️' },
  { key: 'garden', label: 'Zen Garden', icon: '🌳' },
  { key: 'security', label: '24/7 Security', icon: '⚔️' },
  { key: 'swimming_pool', label: 'Swimming Pool', icon: '🏊‍♂️' },
  { key: 'club_house', label: 'Club House', icon: '🏠' },
  { key: 'playground', label: 'Play Area', icon: '🎠' },
  { key: 'gas_connection', label: 'Gas Line', icon: '🔥' },
  { key: 'power_backup', label: 'Power Backup', icon: '⚡' },
  { key: 'cctv', label: 'CCTV', icon: '📹' },
  { key: 'intercom', label: 'Intercom', icon: '📞' },
  { key: 'jogging_track', label: 'Jogging Track', icon: '🏃‍♂️' },
];

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

  const currentImage = cloudinaryUrl(
    sortedImages[index]?.public_id || '',
    { width: 600 }
  );

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

  /* ---------------- SAFE AMENITIES ACCESS ---------------- */

  const amenitiesObject: AmenitiesMap =
    (residential_details?.amenities as AmenitiesMap) ||
    ((commercial_details as { amenities?: AmenitiesMap })?.amenities ?? {});

  const activeAmenities = useMemo(() => {
    return AMENITIES.filter(
      (item) => amenitiesObject[item.key] === true
    );
  }, [amenitiesObject]);

  const visibleAmenities = activeAmenities.slice(0, 4);
  const extraAmenitiesCount =
    activeAmenities.length > 4
      ? activeAmenities.length - 4
      : 0;

  /* ---------------- UI ---------------- */

  return (
    <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-[#F7F4EF]/80 backdrop-blur-xl border border-[#E5DFD8] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">

      {/* IMAGE */}
      <div className="relative h-60 w-full">
        <Image
          src={currentImage}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* SLIDER CONTROLS */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md p-2 rounded-full text-[#2B2B2B] hover:bg-white transition"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={nextImage}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md p-2 rounded-full text-[#2B2B2B] hover:bg-white transition"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-[#2B2B2B]/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full tracking-widest">
            {listing_type.toUpperCase()}
          </span>

          {is_featured && (
            <span className="bg-[#6B4A3A] text-white text-[10px] px-3 py-1 rounded-full">
              PREMIUM
            </span>
          )}
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-2 rounded-full text-[#6B4A3A] hover:bg-white transition"
        >
          <Heart size={16} />
        </button>

        {/* VERIFIED */}
        {verified && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs bg-[#6B4A3A]/90 backdrop-blur-md px-3 py-1 rounded-full">
            <ShieldCheck size={12} />
            Verified
          </div>
        )}

        {/* PRICE */}
        <div className="absolute bottom-4 right-4 text-right">
          <p className="text-white text-xl font-semibold tracking-tight">
            ₹{formattedPrice}
          </p>
          <p className="text-xs text-white/70">
            {listing_type === 'rent' ? '/month' : ''}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col h-[260px]">

        {/* TITLE */}
        <h3 className="text-base font-semibold text-[#2B2B2B] leading-snug line-clamp-2 min-h-[44px]">
          {title}
        </h3>

        {/* LOCATION */}
        <p className="text-sm text-[#6B7280] flex items-center mt-1">
          <MapPin size={14} className="mr-1 opacity-70" />
          {area ? `${area}, ` : ''}
          {city}
        </p>

        {/* SPECS */}
        <div className="flex flex-wrap gap-2 pt-3 min-h-[44px]">
          {category === 'residential' && residential_details && (
            <>
              <Chip
                icon={<Bed size={12} />}
                value={`${residential_details.bedrooms} BHK`}
              />
              <Chip
                icon={<Bath size={12} />}
                value={`${residential_details.bathrooms}`}
              />
            </>
          )}

          {builtUpArea && (
            <Chip
              icon={<Maximize size={12} />}
              value={`${builtUpArea} sqft`}
            />
          )}
        </div>

        {/* AMENITIES */}
        {activeAmenities.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#6B4A3A]" />
              <p className="text-xs font-semibold tracking-wide uppercase text-[#6B4A3A]">
                Luxury Amenities
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {visibleAmenities.map((amenity) => (
                <AmenityPill
                  key={amenity.key}
                  icon={amenity.icon}
                  label={amenity.label}
                />
              ))}

              {extraAmenitiesCount > 0 && (
                <div className="flex items-center px-3 py-2 rounded-2xl bg-[#E8DED2] text-[#6B4A3A] text-xs font-medium">
                  +{extraAmenitiesCount} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-5 flex justify-between items-center">
          <Link href={`/properties/detail/${id}`}>
            <button className="text-sm font-medium text-[#2B2B2B] hover:text-[#6B4A3A] transition">
              View Details
            </button>
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6B4A3A] text-white px-4 py-2 rounded-full text-xs hover:bg-[#5a3e30] transition shadow-sm"
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
    <div className="flex items-center gap-1 bg-[#EFE7DD] px-3 py-1 rounded-full text-xs text-[#6B4A3A]">
      {icon}
      <span>{value}</span>
    </div>
  );
}

/* ---------------- AMENITY PILL ---------------- */

function AmenityPill({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="group/amenity relative overflow-hidden rounded-2xl border border-[#E8DED2] bg-white px-3 py-2 text-xs text-[#4B3A30] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <span className="font-medium whitespace-nowrap">{label}</span>
      </div>
    </div>
  );
}