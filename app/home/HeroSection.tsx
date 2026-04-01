'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertySearchModal from '@/components/property/ProopertySearchModal';

export default function HeroSection(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (data: {
    type: string;
    category: string;
    city: string;
    area?: string;
  }) => {
    const { type, category, city, area } = data;

    let url = `/properties/${type}/listing/${category}?city=${city}`;

    if (area) {
      url += `&area=${area}`;
    }

    router.push(url);
  };

  return (
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

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] hover:bg-[#ede3d5]"
          >
            Browse Properties
            <ArrowRight className="h-5 w-5" />
          </button>

          <Link
            href="/want-to-list"
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            List Your Property
          </Link>
        </div>
      </div>

      <PropertySearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSearch={handleSearch}
      />
    </section>
  );
}