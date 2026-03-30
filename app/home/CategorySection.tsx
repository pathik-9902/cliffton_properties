'use client';

import { Home, Building2, LandPlot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  listingType: 'rent' | 'sale';
};

export default function CategorySection({ listingType }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
        Explore by Category
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        Browse verified properties across all major segments.
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
       <Card
  icon={<Home />}
  title="Residential"
  description="Apartments, villas, and homes."
  href={`/properties/residential/listing/${listingType}?category=residential&listingType=${listingType}`}
/>

<Card
  icon={<Building2 />}
  title="Commercial"
  description="Offices, shops, and business spaces."
  href={`/properties/commercial/listing/${listingType}?category=commercial&listingType=${listingType}`}
/>

<Card
  icon={<LandPlot />}
  title="Land"
  description="Plots and development-ready land."
  href={`/properties/land/listing/${listingType}?category=land&listingType=${listingType}`}
/>
      </div>
    </section>
  );
}

function Card({
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