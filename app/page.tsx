'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  Home,
  Building2,
  LandPlot,
  ArrowRight,
  ShieldCheck,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const [listingType, setListingType] = useState<'rent' | 'sale'>('rent');

  return (
    <main className="bg-[#faf7f3]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/90 via-[#8b6f4e]/70 to-[#c6a15b]/40" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Discover Properties That <br className="hidden sm:block" />
            Match Your Ambition
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Buy or rent verified residential, commercial, and land properties
            with confidence.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/properties/residential/listing/${listingType}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] transition-all hover:bg-[#ede3d5]"
            >
              Browse Properties
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/want-to-list"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-bold text-white transition-all hover:bg-white/10"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="-mt-16 relative z-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl bg-white p-6 shadow-xl border border-[#eee5db] space-y-4">

            {/* Rent / Sale Toggle */}
            <div className="flex gap-2">
              {(['rent', 'sale'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setListingType(type)}
                  className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                    listingType === type
                      ? 'bg-[#6f4e37] text-white'
                      : 'bg-[#ede3d5] text-[#6f4e37]'
                  }`}
                >
                  {type === 'rent' ? 'Rent' : 'Buy'}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-grow items-center gap-2 rounded-xl border border-[#e6ddcf] px-4 py-3">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by city, area, or property name"
                  className="w-full text-sm outline-none"
                />
              </div>

              <Link
                href={`/properties/residential/listing/${listingType}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#6f4e37] px-6 py-3 font-bold text-white transition-all hover:bg-[#5a3f2d]"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
          Explore by Category
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Browse verified properties across all major segments.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            icon={<Home />}
            title="Residential"
            description="Apartments, villas, and homes."
            href={`/properties/residential/listing/${listingType}`}
          />
          <CategoryCard
            icon={<Building2 />}
            title="Commercial"
            description="Offices, shops, and business spaces."
            href={`/properties/commercial/listing/${listingType}`}
          />
          <CategoryCard
            icon={<LandPlot />}
            title="Land"
            description="Plots and development-ready land."
            href={`/properties/land/listing/${listingType}`}
          />
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
            Why Choose Us
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<ShieldCheck />}
              title="Verified Listings"
              text="Every property is reviewed for accuracy."
            />
            <Feature
              icon={<Users />}
              title="Customer Focused"
              text="Built for buyers, renters, and investors."
            />
            <Feature
              icon={<TrendingUp />}
              title="Market Intelligence"
              text="Smart pricing powered by real data."
            />
          </div>
        </div>
      </section>

      {/* ================= LIST CTA ================= */}
      <section className="bg-[#6f4e37]">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Own a Property? Let’s List It.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Reach serious buyers and tenants faster.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/want-to-list"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] transition-all hover:bg-[#ede3d5]"
            >
              List Your Property
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function CategoryCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#efe6dc] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ede3d5] text-[#6f4e37]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1f1f1f]">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#6f4e37]">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#ede3d5] text-[#6f4e37]">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1f1f1f]">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}
