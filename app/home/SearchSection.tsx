'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { parseSearch } from '@/lib/config/parseSearch';
import { SEARCH_SUGGESTIONS } from '@/lib/config/searchData';

type Props = {
  listingType: 'rent' | 'sale';
  setListingType: (v: 'rent' | 'sale') => void;
};

export default function SearchSection({
  listingType,
  setListingType,
}: Props) {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ----------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---------------- FILTER SUGGESTIONS ----------------
  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return [];

    return SEARCH_SUGGESTIONS.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // ---------------- BUILD QUERY ----------------
  const buildQuery = () => {
    const parsed = parseSearch(search);
    const query = new URLSearchParams();

    if (listingType) query.set('listing', listingType);
    if (parsed.city) query.set('city', parsed.city);
    if (parsed.area) query.set('area', parsed.area);
    if (parsed.bedrooms) query.set('bedrooms', parsed.bedrooms);
    if (search) query.set('search', search);

    return query.toString();
  };

  return (
    <section className="-mt-16 relative z-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl border border-[#eee5db] space-y-4">
          
          {/* RENT / SALE */}
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

          {/* SEARCH INPUT */}
          <div
            ref={wrapperRef}
            className="relative flex flex-col gap-4 sm:flex-row"
          >
            <div className="relative flex flex-grow items-center gap-2 rounded-xl border border-[#e6ddcf] px-4 py-3">
              <Search className="h-4 w-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search city, area, or '2 BHK in Vesu'"
                className="w-full text-sm outline-none"
              />

              {/* DROPDOWN */}
              {showDropdown && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => {
                        setSearch(item.label);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 text-sm hover:bg-[#f5efe7] cursor-pointer"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEARCH BUTTON */}
            <Link
              href={`/properties?${buildQuery()}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6f4e37] px-6 py-3 font-bold text-white hover:bg-[#5a3f2d]"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}