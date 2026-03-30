'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

export default function SearchSection({
  listingType,
  setListingType,
}: {
  listingType: 'rent' | 'sale';
  setListingType: (v: 'rent' | 'sale') => void;
}) {
  return (
    <section className="-mt-16 relative z-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl border border-[#eee5db] space-y-4">
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

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-grow items-center gap-2 rounded-xl border border-[#e6ddcf] px-4 py-3">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                placeholder="Search by city, area, or property name"
                className="w-full text-sm outline-none"
              />
            </div>

            <Link
              href={`/properties/residential/listing/${listingType}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6f4e37] px-6 py-3 font-bold text-white hover:bg-[#5a3f2d]"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}