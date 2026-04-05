'use client';

import { useState } from 'react';
import { Home, Building2, LandPlot, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ================= TYPES ================= */

type CategoryType = 'residential' | 'commercial' | 'land';

type SubCategory = {
  name: string;
  label: string;
};

/* ================= COMPONENT ================= */

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [type, setType] = useState<'sale' | 'rent'>('sale');

  /* ================= DATA ================= */

  const categories: {
    title: string;
    icon: React.ReactNode;
    description: string;
    category: CategoryType;
  }[] = [
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

  const categoryMap: Record<CategoryType, SubCategory[]> = {
    residential: [
      { name: 'villa', label: 'Villa' },
      { name: 'bungalow', label: 'Bungalow' },
      { name: 'farmhouse', label: 'Farmhouse' },
      { name: 'apartment', label: 'Apartment' },
    ],
    commercial: [
      { name: 'office', label: 'Office' },
      { name: 'shop', label: 'Shop' },
      { name: 'workspace', label: 'Workspace' },
    ],
    land: [
      { name: 'agricultural_land', label: 'Agricultural Land' },
      { name: 'industrial_plot', label: 'Industrial Plot' },
      { name: 'residential_plot', label: 'Residential Plot' },
    ],
  };

  /* ================= UI ================= */

  return (
    <>
      {/* ================= SECTION ================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#181818]">
            Explore by Category
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-gray-500 text-sm sm:text-lg">
            Curated property segments designed for modern investors and living.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 sm:mt-20 grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className="cursor-pointer group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/40 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#faf7f2] via-transparent to-[#f3ede7]" />

              {/* Icon */}
              <div className="relative mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#f4eee6] text-[#6f4e37] transition-transform duration-300 group-hover:scale-105">
                {cat.icon}
              </div>

              {/* Title */}
              <h3 className="relative text-lg sm:text-xl font-medium text-[#181818]">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="relative mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
                {cat.description}
              </p>

              {/* Hint */}
              <div className="mt-6 text-xs text-[#6f4e37] opacity-70">
                Tap to explore →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="w-full sm:max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 relative max-h-[90vh] overflow-y-auto">

            {/* Close */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 capitalize">
              Select {selectedCategory} Type
            </h2>

            {/* Rent / Buy Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setType('sale')}
                className={`px-4 py-2 rounded-full text-sm ${
                  type === 'sale'
                    ? 'bg-[#6f4e37] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Buy
              </button>

              <button
                onClick={() => setType('rent')}
                className={`px-4 py-2 rounded-full text-sm ${
                  type === 'rent'
                    ? 'bg-[#6f4e37] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Subcategories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {categoryMap[selectedCategory].map((item) => (
                <Link
                  key={item.name}
                  href={`/properties/${selectedCategory}?type=${type}&subtype=${item.name}`}
                  className="group"
                  onClick={() => setSelectedCategory(null)}
                >
                  <div className="overflow-hidden rounded-xl relative">

                    <Image
                      src={`/categories/${item.name}.jpeg`}
                      alt={item.label}
                      width={400}
                      height={300}
                      className="h-28 sm:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-medium text-center">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}