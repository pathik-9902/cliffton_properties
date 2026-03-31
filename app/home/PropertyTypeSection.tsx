'use client';

import Link from 'next/link';
import {
  Home,
  Building2,
  Warehouse,
  LandPlot,
} from 'lucide-react';

export default function PropertyTypeSection() {
  const types = [
    {
      title: 'Apartments',
      icon: <Home />,
      category: 'residential',
      subtype: 'apartment',
    },
    {
      title: 'Villas',
      icon: <Home />,
      category: 'residential',
      subtype: 'villa',
    },
    {
      title: 'Offices',
      icon: <Building2 />,
      category: 'commercial',
      subtype: 'office',
    },
    {
      title: 'Showrooms',
      icon: <Building2 />,
      category: 'commercial',
      subtype: 'showroom',
    },
    {
      title: 'Warehouses',
      icon: <Warehouse />,
      category: 'commercial',
      subtype: 'warehouse',
    },
    {
      title: 'Plots',
      icon: <LandPlot />,
      category: 'land',
      subtype: 'plot',
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
          Browse by Property Type
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Quickly find properties that match your intent.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t) => {
            const query = new URLSearchParams({
              category: t.category,
              subtype: t.subtype, // future-proof
            }).toString();

            return (
              <Link
                key={t.title}
                href={`/properties?${query}`}
                className="group rounded-2xl border border-[#efe6dc] bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ede3d5] text-[#6f4e37]">
                  {t.icon}
                </div>

                <h3 className="text-lg font-bold text-[#1f1f1f]">
                  {t.title}
                </h3>

                <span className="mt-4 inline-block text-sm font-bold text-[#6f4e37]">
                  Explore →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}