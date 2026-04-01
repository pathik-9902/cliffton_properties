'use client';

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
  properties,
  loading = false,
  error = false,
}: Props) {

  // ✅ SAFETY FILTER
  const featuredProperties = properties.filter(
    (p) => p.is_featured
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1f1f1f]">
              Featured Properties
            </h2>
            <p className="mt-2 text-gray-600">
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
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: MAX_ITEMS }).map((_, i) => (
              <div
                key={i}
                className="h-[300px] rounded-2xl bg-[#f5efe7] animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-14 text-center text-red-500">
            Failed to load properties. Please try again.
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="mt-14 text-center text-gray-400">
            No featured properties available.
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties
              .slice(0, MAX_ITEMS)
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}