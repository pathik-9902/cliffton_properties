'use client';

import Link from 'next/link';
import PropertyCard from '@/components/property/PropertyCard';
import { FullPropertyDetails } from '@/types/property';

type Props = {
  properties: FullPropertyDetails[];
};

export default function FeaturedPropertiesSection({
  properties,
}: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
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
            href="/properties/residential/sale"
            className="text-sm font-bold text-[#6f4e37]"
          >
            View All →
          </Link>
        </div>

        {/* LIST */}
        {properties.length === 0 ? (
          <div className="mt-14 text-center text-gray-400">
            No featured properties available.
          </div>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
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