'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Layers,
  CornerUpRight,
  ShieldCheck,
  Building2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

import { FullPropertyDetails } from '@/types/property';

/* ---------------- TYPES ---------------- */

type PropertyCardProps = {
  property: FullPropertyDetails;
  priority?: boolean; // 🔥 for above-the-fold images
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
    status,
    city,
    area,
    price,
    is_featured,
    possession_date,
    residential_details,
    commercial_details,
    land_details,
    images,
  } = property;

  /* ---------------- MEMOIZED DERIVED VALUES ---------------- */

  const coverImage = useMemo(() => {
    return (
      images?.slice().sort((a, b) => a.sort_order - b.sort_order)[0]
        ?.image_url ?? '/placeholder.png'
    );
  }, [images]);

  const builtUpArea = useMemo(() => {
    return (
      residential_details?.built_up_area ??
      commercial_details?.built_up_area ??
      undefined
    );
  }, [residential_details, commercial_details]);

  const formattedPrice = useMemo(() => {
    if (price >= 1_00_00_000)
      return `${(price / 1_00_00_000).toFixed(2)} Cr`;
    if (price >= 1_00_000)
      return `${(price / 1_00_000).toFixed(2)} L`;
    return price.toLocaleString('en-IN');
  }, [price]);

  const formattedDate = useMemo(() => {
    if (!possession_date) return null;

    return new Date(possession_date).toLocaleDateString('en-IN', {
      month: 'short',
      year: 'numeric',
    });
  }, [possession_date]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/919999999999?text=I am interested in property ${id} - ${title}`;
  }, [id, title]);

  /* ---------------- UI ---------------- */

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-[#eee5db] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#f6f1eb]">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={priority} // 🔥 only true for first few cards
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* LEFT BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="dark">{listing_type.toUpperCase()}</Badge>
          {is_featured && <Badge variant="featured">FEATURED</Badge>}
        </div>

        {/* STATUS */}
        <div className="absolute top-4 right-4">
          <Badge variant={status.toLowerCase()}>
            {status.toUpperCase()}
          </Badge>
        </div>

        {/* POSSESSION */}
        {formattedDate && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        )}

       
      </div>

      {/* CONTENT */}
      <div className="flex flex-grow flex-col p-5">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#8b6f4e]">
            <Building2 className="h-3 w-3" />
            {category}
          </div>

          <h3 className="min-h-[3rem] text-lg font-bold leading-tight text-[#1f1f1f] line-clamp-2">
            {title}
          </h3>

          <p className="mt-2 flex items-center text-sm font-medium text-gray-500">
            <MapPin className="mr-1 h-4 w-4 text-[#b08968]" />
            {area ? `${area}, ` : ''}
            {city}
          </p>
        </div>

        {/* SPECS */}
        <div className="my-3 grid flex-grow grid-cols-3 gap-4 border-y border-[#efe6dc] py-4">
          {category === 'residential' && residential_details && (
            <>
              <Spec icon={<Bed />} label="Beds" value={residential_details.bedrooms} />
              <Spec icon={<Bath />} label="Baths" value={residential_details.bathrooms} />
              {builtUpArea && (
                <Spec icon={<Maximize />} label="Sqft" value={builtUpArea} />
              )}
            </>
          )}

          {category === 'commercial' && commercial_details && (
            <>
              <Spec icon={<Layers />} label="Floor" value={commercial_details.floor} />
              <Spec
                icon={<ShieldCheck />}
                label="AC"
                value={commercial_details.central_air_conditioning ? 'Yes' : 'No'}
              />
              {builtUpArea && (
                <Spec icon={<Maximize />} label="Sqft" value={builtUpArea} />
              )}
            </>
          )}

          {category === 'land' && land_details && (
            <>
              <Spec icon={<Maximize />} label="Plot" value={land_details.plot_area} />
              <Spec
                icon={<CornerUpRight />}
                label="Corner"
                value={land_details.corner_plot ? 'Yes' : 'No'}
              />
              <Spec
                icon={<Layers />}
                label="Zoning"
                value={land_details.land_zoning ?? '—'}
              />
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
              Price
            </p>
            <p className="text-2xl font-extrabold text-[#1f1f1f]">
              ₹{formattedPrice}
            </p>
          </div>

          <div className="flex gap-2">
            <Link href={`/properties/detail/${id}`}>
              <button className="flex items-center justify-center rounded-xl bg-[#ede3d5] p-3 text-[#6f4e37] shadow-sm transition hover:bg-[#6f4e37] hover:text-white">
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              className="flex items-center justify-center rounded-xl bg-green-500 p-3 text-white shadow-sm hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MEMO WRAPPER ---------------- */

const PropertyCard = React.memo(PropertyCardComponent);

export default PropertyCard;

/* ---------------- SUB COMPONENTS ---------------- */

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-1.5 text-gray-400 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>
      <span className="mb-1 text-[10px] font-bold uppercase tracking-tight text-gray-400">
        {label}
      </span>
      <span className="w-full truncate text-xs font-bold text-gray-800">
        {value}
      </span>
    </div>
  );
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) {
  const base =
    'text-[10px] px-2.5 py-1.5 rounded-lg font-bold tracking-wider backdrop-blur shadow-sm';

  const styles: Record<string, string> = {
    dark: 'bg-black/70 text-white',
    featured: 'bg-[#c6a15b] text-white',
    available: 'bg-emerald-600/90 text-white',
    sold: 'bg-rose-600/90 text-white',
    rented: 'bg-indigo-600/90 text-white',
    inactive: 'bg-gray-400/90 text-white',
  };

  return (
    <span className={`${base} ${styles[variant] ?? styles.dark}`}>
      {children}
    </span>
  );
}