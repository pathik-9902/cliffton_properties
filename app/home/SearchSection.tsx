'use client';

import { Search, MapPin } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { parseSearch } from '@/lib/config/search/parseSearch';
import { useFilterOptions } from '@/lib/hooks/useFilterOptions';
import FeaturedListingCarousel from '@/components/property/FeaturedListingCarousel';

// ---------------- TYPES ----------------
type Property = {
  id: string;
  title: string;
  city: string;
  area?: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
};

export default function SearchSection() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const { options } = useFilterOptions();

  const SEARCH_SUGGESTIONS = useMemo(() => {
    if (!options) return [];
    return [
      ...options.cities.map(c => ({ label: c, type: 'city' })),
      ...options.areas.map(a => ({ label: a.label, type: 'area', city: a.city }))
    ];
  }, [options]);

  const [showModal, setShowModal] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // ---------------- FETCH FEATURED ----------------
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/properties?featured=true');
        const data = await res.json();

        const filtered = (data.data || []).filter(
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
    const parsed = parseSearch(search, SEARCH_SUGGESTIONS);
    const params = new URLSearchParams();

    params.set('listing', type);

    if (parsed.city) params.set('city', parsed.city);
    if (parsed.area) params.set('area', parsed.area);
    if (parsed.bedrooms) params.set('bedrooms', parsed.bedrooms);

    if (search.trim()) params.set('search', search.trim());

    return `/properties/residential?${params.toString()}`;
  };


  // ---------------- ENTER KEY ----------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowModal(true);
    }
  };

  return (
    <>
      <section className="-mt-12 sm:-mt-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] bg-white/95 backdrop-blur-md p-5 sm:p-8 shadow-2xl border border-[#ede5db] space-y-5 sm:space-y-6">

            {/* ---------------- CAROUSEL ---------------- */}
            {loading ? (
              <div className="h-48 sm:h-72 rounded-[2rem] bg-gray-100 animate-pulse" />
            ) : (
              <FeaturedListingCarousel properties={properties} />
            )}

            {/* ---------------- SEARCH ---------------- */}
            <div
              ref={wrapperRef}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* INPUT */}
              <div className="relative group flex-grow">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-[#C9A24D]">
                  <Search size={20} className="text-gray-400 group-focus-within:text-[#C9A24D]" />
                </div>

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Where would you like to live?"
                  className="w-full bg-[#f8f6f2] rounded-2xl sm:rounded-3xl pl-14 pr-6 py-4 sm:py-5 text-sm sm:text-base outline-none border-2 border-transparent focus:border-[#C9A24D]/30 focus:bg-white transition-all duration-300"
                />

                {/* DROPDOWN */}
                {showDropdown && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-[#E8E2DA] rounded-2xl shadow-2xl z-50 max-h-72 overflow-y-auto overflow-x-hidden">
                    {filteredSuggestions.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          setSearch(item.label);
                          setShowDropdown(false);
                        }}
                        className="px-6 py-4 text-sm sm:text-base hover:bg-[#fcfaf7] cursor-pointer flex items-center gap-3 border-b border-[#f5efe7] last:border-0"
                      >
                        <MapPin size={16} className="text-[#C9A24D]" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto flex items-center justify-center gap-3 rounded-2xl sm:rounded-3xl bg-[#1F1F1F] px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-bold text-white hover:bg-[#C9A24D] transition-all duration-300 shadow-xl active:scale-95"
              >
                Find Properties
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
                className="flex-1 bg-[#1F1F1F] text-white py-3 rounded-xl font-semibold hover:bg-[#C9A24D] transition-colors"
              >
                Buy
              </button>

              <button
                onClick={() => {
                  window.location.href = buildQuery('rent');
                }}
                className="flex-1 bg-[#f8f6f2] text-[#1F1F1F] border border-[#E8E2DA] hover:border-[#C9A24D] py-3 rounded-xl font-semibold transition-colors"
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