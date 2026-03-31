'use client';

import Link from 'next/link';
import { FullPropertyDetails } from '@/types/property';

type Props = {
  properties: FullPropertyDetails[];
};

export default function BrowseByLocalitySection({ properties }: Props) {
  
  // ✅ EXTRACT UNIQUE AREAS + COUNT
  const localityMap = properties.reduce((acc, p) => {
    if (!p.area) return acc;

    const key = p.area;

    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key]++;

    return acc;
  }, {} as Record<string, number>);

  const areas = Object.entries(localityMap);

  return (
    <section className="bg-[#faf7f3]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        
        <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
          Browse by Locality
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Explore properties in Surat’s most sought-after areas.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map(([area, count]) => (
            <Link
              key={area}
              href={`/properties?city=Surat&area=${encodeURIComponent(area)}`}
              className="group rounded-2xl border border-[#efe6dc] bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-bold text-[#1f1f1f]">
                {area}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {count} properties available
              </p>

              <span className="mt-4 inline-block text-sm font-bold text-[#6f4e37]">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}