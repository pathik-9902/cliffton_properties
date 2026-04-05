'use client';

import { useState } from 'react';
import { SEARCH_SUGGESTIONS } from '@/lib/config/searchData';
import { X } from 'lucide-react';

type CategoryType = 'residential' | 'commercial' | 'land';
type DealType = 'rent' | 'sale';

type Props = {
  open: boolean;
  onClose: () => void;
  onSearch: (data: {
    category: CategoryType;
    type: DealType;
    city: string;
    area: string;
  }) => void;
};

export default function PropertySearchModal({
  open,
  onClose,
  onSearch,
}: Props) {
  const [category, setCategory] = useState<CategoryType>('residential');
  const [type, setType] = useState<DealType>('sale');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  if (!open) return null;

  const areas = SEARCH_SUGGESTIONS.filter((s) => s.type === 'area');
  const cities = SEARCH_SUGGESTIONS.filter((s) => s.type === 'city');

  const chipBase =
    'px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer';

  const activeChip =
    'bg-[#6f4e37] text-white border-[#6f4e37] shadow-md';

  const inactiveChip =
    'bg-white text-gray-700 border-gray-200 hover:border-[#6f4e37] hover:text-[#6f4e37]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border border-white/20 animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Find Your Perfect Property
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Refine your search in seconds
          </p>
        </div>

        {/* CATEGORY (Residential / Commercial / Land) */}
        <div className="mb-6">
          <p className="font-semibold mb-3 text-gray-800">
            Property Category
          </p>
          <div className="flex flex-wrap gap-3">
            {(['residential', 'commercial', 'land'] as CategoryType[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`${chipBase} ${
                  category === c ? activeChip : inactiveChip
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* TYPE (Rent / Buy) */}
        <div className="mb-6">
          <p className="font-semibold mb-3 text-gray-800">
            Looking For
          </p>
          <div className="flex gap-3">
            {(['rent', 'sale'] as DealType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`${chipBase} ${
                  type === t ? activeChip : inactiveChip
                }`}
              >
                {t === 'rent' ? 'Rent' : 'Buy'}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="mb-6">
          <p className="font-semibold mb-3 text-gray-800">City</p>
          <div className="flex flex-wrap gap-3">
            {cities.map((c) => (
              <button
                key={c.label}
                onClick={() => {
                  setCity(c.label);
                  setArea('');
                }}
                className={`${chipBase} ${
                  city === c.label ? activeChip : inactiveChip
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="mb-6 sm:mb-8">
          <p className="font-semibold mb-3 text-gray-800">
            Area (Optional)
          </p>
          <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto pr-1">
            {areas
              .filter((a) => !city || a.city === city)
              .map((a) => (
                <button
                  key={a.label}
                  onClick={() => setArea(a.label)}
                  className={`${chipBase} ${
                    area === a.label ? activeChip : inactiveChip
                  }`}
                >
                  {a.label}
                </button>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSearch({
                category,
                type,
                city,
                area,
              })
            }
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6f4e37] to-[#c6a15b] text-white font-semibold shadow-lg hover:scale-[1.03] transition-all"
          >
            Search Properties →
          </button>
        </div>
      </div>
    </div>
  );
}