'use client';

import Link from 'next/link';

export default function BrowseByLocalitySection() {
  const areas = [
    'Vesu',
    'Adajan',
    'Pal',
    'Dumas Road',
    'Ring Road',
    'Sachin GIDC',
  ];

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
          {areas.map((area) => (
            <Link
              key={area}
              href={`/properties?city=Surat&area=${area}`}
              className="group rounded-2xl border border-[#efe6dc] bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-bold text-[#1f1f1f]">{area}</h3>
              <p className="mt-2 text-sm text-gray-600">
                View available properties
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