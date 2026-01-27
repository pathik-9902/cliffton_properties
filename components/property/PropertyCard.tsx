'use client';

import Image from 'next/image';
import { FullPropertyDetails } from '@/types/property';

type Props = {
  property: FullPropertyDetails;
};

export default function PropertyCard({ property }: Props) {
  const {
    title,
    category,
    listing_type,
    status,
    city,
    area,
    price,
    price_unit,
    built_up_area,
    area_unit,
    is_featured,
    residential,
    commercial,
    land,
    images,
  } = property;

  const coverImage =
    images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ??
    '/placeholder.jpg';

  return (
    <div className="group rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
      {/* IMAGE */}
      <div className="relative h-52 w-full">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="dark">{listing_type.toUpperCase()}</Badge>
          {is_featured && <Badge variant="featured">FEATURED</Badge>}
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant={status}>{status.toUpperCase()}</Badge>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* TITLE */}
        <h3 className="font-semibold text-base line-clamp-2">{title}</h3>

        {/* LOCATION */}
        <p className="text-sm text-gray-600">
          {area ? `${area}, ` : ''}
          {city}
        </p>

        {/* CATEGORY DETAILS */}
        {category === 'residential' && residential && (
          <div className="grid grid-cols-2 gap-x-3 text-sm text-gray-700">
            <Detail label="Beds" value={`${residential.bedrooms}`} />
            <Detail label="Baths" value={`${residential.bathrooms}`} />
            <Detail label="Balcony" value={`${residential.balconies}`} />
            <Detail label="Parking" value={`${residential.parking_spaces}`} />
            <Detail
              label="Floor"
              value={`${residential.floor_number}/${residential.total_floors}`}
            />
            <Detail
              label="Furnish"
              value={format(residential.furnishing_type)}
            />
          </div>
        )}

        {category === 'commercial' && commercial && (
          <div className="grid grid-cols-2 gap-x-3 text-sm text-gray-700">
            <Detail label="Type" value={commercial.commercial_subtype} />
            <Detail label="Floor" value={`${commercial.floor_number}`} />
            <Detail label="Washrooms" value={`${commercial.washrooms}`} />
            <Detail label="Meetings" value={`${commercial.meeting_rooms}`} />
            <Detail
              label="AC"
              value={commercial.central_air_conditioning ? 'Yes' : 'No'}
            />
          </div>
        )}

        {category === 'land' && land && (
          <div className="grid grid-cols-2 gap-x-3 text-sm text-gray-700">
            <Detail label="Plot Area" value={`${land.plot_area} sqft`} />
            <Detail label="Zoning" value={land.land_zoning ?? '—'} />
            <Detail label="Corner" value={land.corner_plot ? 'Yes' : 'No'} />
            {land.road_width && (
              <Detail label="Road" value={`${land.road_width} ft`} />
            )}
          </div>
        )}

        {/* PRICE */}
        <div className="flex justify-between items-end pt-3 border-t">
          <p className="font-semibold text-lg">
            ₹{price.toLocaleString()}
            {price_unit.includes('month') && (
              <span className="text-sm font-normal text-gray-600"> /month</span>
            )}
          </p>

          <span className="text-xs text-gray-500">
            {built_up_area} {area_unit}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: string;
}) {
  const base = 'text-xs px-2 py-1 rounded font-medium';

  const styles: Record<string, string> = {
    dark: 'bg-black/75 text-white',
    featured: 'bg-yellow-500 text-black',
    available: 'bg-green-600 text-white',
    sold: 'bg-gray-600 text-white',
    rented: 'bg-blue-600 text-white',
    inactive: 'bg-red-600 text-white',
  };

  return <span className={`${base} ${styles[variant] ?? styles.dark}`}>{children}</span>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-gray-500">{label}:</span>{' '}
      <span className="font-medium">{value}</span>
    </p>
  );
}

function format(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
