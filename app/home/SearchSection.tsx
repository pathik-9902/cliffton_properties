'use client';

import { Search } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { parseSearch } from '@/lib/config/parseSearch';
import { SEARCH_SUGGESTIONS } from '@/lib/config/searchData';
import FeaturedListingCarousel from '@/components/property/FeaturedListingCarousel';

// ---------------- TYPES ----------------
type Property = {
  id: string;
  title: string;
  city: string;
  area?: string;
  price: number;
  images: any[];
};

export default function SearchSection() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // ---------------- FETCH FEATURED ----------------
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/allproperties?featured=true');
        const data = await res.json();

        const filtered = (data.properties || []).filter(
          (p: Property) =>
            p &&
            p.id &&
            p.title &&
            Array.isArray(p.images) &&
            p.images.length > 0
        );

        setProperties(filtered);
      } catch (err) {
        console.error('Failed to fetch featured properties', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // ---------------- CLOSE DROPDOWN ----------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---------------- FILTER ----------------
  const filteredSuggestions = useMemo(() => {
    if (!search.trim()) return [];

    return SEARCH_SUGGESTIONS.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // ---------------- BUILD QUERY ----------------
  const buildQuery = (type: 'rent' | 'sale') => {
    const parsed = parseSearch(search);
    const params = new URLSearchParams();

    params.set('listing', type);

    if (parsed.city) params.set('city', parsed.city);
    if (parsed.area) params.set('area', parsed.area);
    if (parsed.bedrooms) params.set('bedrooms', parsed.bedrooms);

    if (search.trim()) params.set('search', search.trim());

    return `/properties?${params.toString()}`;
  };

  // ---------------- ENTER KEY ----------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowModal(true);
    }
  };

  return (
    <>
      <section className="-mt-16 relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-[#eee5db] space-y-4 sm:space-y-5">

            {/* ---------------- CAROUSEL ---------------- */}
            {loading ? (
              <div className="h-44 sm:h-52 md:h-64 lg:h-72 rounded-xl bg-gray-100 animate-pulse" />
            ) : (
              <FeaturedListingCarousel properties={properties} />
            )}

            {/* ---------------- SEARCH ---------------- */}
            <div
              ref={wrapperRef}
              className="relative flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              {/* INPUT */}
              <div className="relative flex flex-grow items-center gap-2 rounded-xl border border-[#e6ddcf] px-4 py-3">
                <Search className="h-4 w-4 text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
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

              {/* BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#6f4e37] px-5 sm:px-6 py-3 text-sm font-bold text-white hover:bg-[#5a3f2d] transition"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          {/* MODAL BOX */}
          <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl z-10 text-center space-y-5">

            <h3 className="text-lg font-semibold">
              What are you looking for?
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  window.location.href = buildQuery('sale');
                }}
                className="flex-1 bg-[#6f4e37] text-white py-3 rounded-xl font-semibold hover:bg-[#5a3f2d]"
              >
                Buy
              </button>

              <button
                onClick={() => {
                  window.location.href = buildQuery('rent');
                }}
                className="flex-1 bg-[#ede3d5] text-[#6f4e37] py-3 rounded-xl font-semibold"
              >
                Rent
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}