'use client';

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
} from 'lucide-react';

import { FullPropertyDetails } from '@/types/property';

type PropertyCardProps = {
  property: FullPropertyDetails;
};

export default function PropertyCard({ property }: PropertyCardProps) {
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

  /* ---------------- DERIVED VALUES ---------------- */

  const coverImage =
    images?.slice().sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ??
    '/placeholder.png';

  const builtUpArea =
    residential_details?.built_up_area ??
    commercial_details?.built_up_area ??
    undefined;

  const formatPrice = (amount: number) => {
    if (amount >= 1_00_00_000) return `${(amount / 1_00_00_000).toFixed(2)} Cr`;
    if (amount >= 1_00_000) return `${(amount / 1_00_000).toFixed(2)} L`;
    return amount.toLocaleString('en-IN');
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="group flex flex-col h-full rounded-2xl overflow-hidden border border-[#eee5db] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden bg-[#f5efe8]">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="dark">{listing_type.toUpperCase()}</Badge>
          {is_featured && <Badge variant="featured">FEATURED</Badge>}
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant={status.toLowerCase()}>
            {status.toUpperCase()}
          </Badge>
        </div>

        {possession_date && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-[10px] font-bold bg-black/60 backdrop-blur px-2 py-1 rounded-md">
            <Calendar className="w-3 h-3" />
            {new Date(possession_date).toLocaleDateString('en-IN', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        {/* HEADER */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-[#8b6f4e] text-[10px] font-bold uppercase tracking-widest mb-1">
            <Building2 className="w-3 h-3" />
            {category}
          </div>

          <h3 className="font-bold text-lg text-[#1f1f1f] line-clamp-2 leading-tight min-h-[3rem]">
            {title}
          </h3>

          <p className="text-sm text-gray-500 flex items-center mt-2 font-medium">
            <MapPin className="w-4 h-4 mr-1 text-[#b08968]" />
            {area ? `${area}, ` : ''}
            {city}
          </p>
        </div>

        {/* SPECS */}
        <div className="flex-grow grid grid-cols-3 gap-4 border-y border-[#efe6dc] py-4 my-2">
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
        <div className="flex justify-between items-center pt-4 mt-auto">
          <div>
            <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
              Price
            </p>
            <p className="font-extrabold text-2xl text-[#1f1f1f]">
              ₹{formatPrice(price)}
            </p>
          </div>

          <Link href={`/properties/detail/${id}`}>
            <button className="bg-[#ede3d5] text-[#6f4e37] p-3 rounded-xl hover:bg-[#6f4e37] hover:text-white transition-all duration-300 shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

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
      <div className="text-gray-400 mb-1.5 [&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </div>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-1">
        {label}
      </span>
      <span className="font-bold text-gray-800 text-xs truncate w-full">
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
