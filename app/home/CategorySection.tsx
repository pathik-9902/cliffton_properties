'use client';

import { Home, Building2, LandPlot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      title: 'Residential',
      icon: <Home strokeWidth={1.4} />,
      description: 'Apartments, villas, and private residences.',
      category: 'residential',
    },
    {
      title: 'Commercial',
      icon: <Building2 strokeWidth={1.4} />,
      description: 'Offices, retail shops, and workspaces.',
      category: 'commercial',
    },
    {
      title: 'Land',
      icon: <LandPlot strokeWidth={1.4} />,
      description: 'Plots, investments, and development land.',
      category: 'land',
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">

      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-[#181818]">
          Explore by Category
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500 text-lg">
          Curated property segments designed for modern investors and living.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} {...cat} />
        ))}
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  description,
  category,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}) {
  // ✅ Correct segment-based routes
  const rentUrl = `/properties/${category}/listing/rent`;
  const saleUrl = `/properties/${category}/listing/sale`;

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/40 bg-white/70 backdrop-blur-xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,0,0,0.12)]">

      {/* Ambient gradient */}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#faf7f2] via-transparent to-[#f3ede7]" />

      {/* Icon */}
      <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4eee6] text-[#6f4e37] transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>

      {/* Content */}
      <h3 className="relative text-xl font-medium text-[#181818]">
        {title}
      </h3>

      <p className="relative mt-3 text-sm text-gray-500 leading-relaxed">
        {description}
      </p>

      {/* Divider */}
      <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-[#e7dfd6] to-transparent" />

      {/* Actions */}
      <div className="relative grid grid-cols-2 gap-3">

        {/* Rent */}
        <Link
          href={rentUrl}
          className="group/btn flex items-center justify-center gap-2 rounded-xl border border-[#e5ddd5] bg-white/80 backdrop-blur px-4 py-3 text-sm font-medium text-[#1a1a1a] transition-all duration-300 hover:border-[#cbb8a6] hover:bg-[#f8f5f1]"
        >
          Rent
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>

        {/* Buy */}
        <Link
          href={saleUrl}
          className="group/btn flex items-center justify-center gap-2 rounded-xl border border-[#e5ddd5] bg-white/80 backdrop-blur px-4 py-3 text-sm font-medium text-[#1a1a1a] transition-all duration-300 hover:border-[#cbb8a6] hover:bg-[#f8f5f1]"
        >
          Buy
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>

      </div>
    </div>
  );
}