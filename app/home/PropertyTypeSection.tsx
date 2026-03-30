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
      href: '/properties?type=apartment',
    },
    {
      title: 'Villas',
      icon: <Home />,
      href: '/properties?type=villa',
    },
    {
      title: 'Offices',
      icon: <Building2 />,
      href: '/properties?type=office',
    },
    {
      title: 'Showrooms',
      icon: <Building2 />,
      href: '/properties?type=showroom',
    },
    {
      title: 'Warehouses',
      icon: <Warehouse />,
      href: '/properties?type=warehouse',
    },
    {
      title: 'Plots',
      icon: <LandPlot />,
      href: '/properties?type=plot',
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
          {types.map((t) => (
            <Link
              key={t.title}
              href={t.href}
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
          ))}
        </div>
      </div>
    </section>
  );
}