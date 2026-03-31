'use client';

import { Home, Building2, LandPlot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  listingType: 'rent' | 'sale';
};

export default function CategorySection({ listingType }: Props) {
  const categories = [
    {
      title: 'Residential',
      icon: <Home />,
      description: 'Apartments, villas, and homes.',
      category: 'residential',
    },
    {
      title: 'Commercial',
      icon: <Building2 />,
      description: 'Offices, shops, and business spaces.',
      category: 'commercial',
    },
    {
      title: 'Land',
      icon: <LandPlot />,
      description: 'Plots and development-ready land.',
      category: 'land',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      
      <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
        Explore by Category
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        Browse verified properties across all major segments.
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const query = new URLSearchParams({
            category: cat.category,
            listing: listingType, // ✅ FIXED
          }).toString();

          return (
            <Card
              key={cat.title}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              href={`/properties?${query}`}
            />
          );
        })}
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