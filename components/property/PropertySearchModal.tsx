'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFilterOptions } from '@/lib/hooks/useFilterOptions';
import { X, Loader2 } from 'lucide-react';

type CategoryType = 'residential' | 'commercial' | 'land';
type DealType = 'rent' | 'sale';

type SubCategory = {
  name: string;
  label: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSearch: (data: {
    category: CategoryType;
    subCategory: string;
    type: DealType;
    city?: string;
    area?: string;
  }) => void;
};

export default function PropertySearchModal({
  open,
  onClose,
  onSearch,
}: Props) {
  const { options, loading } = useFilterOptions();
  
  const [category, setCategory] = useState<CategoryType>('residential');
  const [subCategory, setSubCategory] = useState<string>('');
  const [type, setType] = useState<DealType>('sale');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');

  const categoryMap: Record<CategoryType, SubCategory[]> = useMemo(() => {
    if (!options) return { residential: [], commercial: [], land: [] };
    const toSub = (arr: string[]) => arr.map(s => ({ 
      name: s, 
      label: s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
    }));
    
    return {
      residential: options.residentialTypes.length ? toSub(options.residentialTypes) : toSub(['Villa', 'Apartment']),
      commercial: options.commercialTypes.length ? toSub(options.commercialTypes) : toSub(['Office', 'Shop']),
      land: options.landTypes.length ? toSub(options.landTypes) : toSub(['Agricultural', 'Plot'])
    };
  }, [options]);

  useEffect(() => {
    if (categoryMap[category].length > 0 && !subCategory) {
      setSubCategory(categoryMap[category][0].name);
    }
  }, [category, categoryMap, subCategory]);

  if (!open) return null;

  if (loading || !options) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    );
  }

  const areas = options.areas;
  const cities = options.cities.map(c => ({ label: c }));

  const chipBase =
    'px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer';

  const activeChip =
    'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-md';

  const inactiveChip =
    'bg-white text-gray-700 border-[#E8E2DA] hover:border-[#C9A24D] hover:text-[#C9A24D]';

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4">
      <div className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[90vh] flex flex-col rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-white shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#F4EFE9]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] tracking-tight">
                Refine Your Search
              </h2>
              <p className="text-[#6B6B6B] text-sm mt-1 uppercase tracking-widest font-semibold opacity-60">
                Seconds to your dream home
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-hide">
          
          {/* CATEGORY */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24D] mb-4">
              Property Category
            </p>
            <div className="flex flex-wrap gap-2">
              {(['residential', 'commercial', 'land'] as CategoryType[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setSubCategory(categoryMap[c][0].name);
                  }}
                  className={`${chipBase} py-1.5 px-4 rounded-xl ${
                    category === c ? activeChip : inactiveChip
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          {/* SUBCATEGORY */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24D] mb-4">
              Property Type
            </p>
            <div className="flex flex-wrap gap-2">
              {categoryMap[category].map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => setSubCategory(sub.name)}
                  className={`${chipBase} py-1.5 px-4 rounded-xl ${
                    subCategory === sub.name ? activeChip : inactiveChip
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </section>

          {/* TYPE */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24D] mb-4">
              Looking For
            </p>
            <div className="flex gap-2">
              {(['rent', 'sale'] as DealType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`${chipBase} flex-1 py-3 rounded-xl ${
                    type === t ? activeChip : inactiveChip
                  }`}
                >
                  {t === 'rent' ? 'To Rent' : 'To Buy'}
                </button>
              ))}
            </div>
          </section>

          {/* CITY & AREA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24D] mb-4">
                City
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => {
                      setCity(c.label);
                      setArea('');
                    }}
                    className={`${chipBase} py-1.5 px-4 rounded-xl ${
                      city === c.label ? activeChip : inactiveChip
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A24D] mb-4">
                Area (Optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {areas
                  .filter((a) => !city || a.city === city)
                  .map((a) => (
                    <button
                      key={a.label}
                      onClick={() => setArea(a.label)}
                      className={`${chipBase} py-1.5 px-4 rounded-xl ${
                        area === a.label ? activeChip : inactiveChip
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 bg-[#F4EFE9]/50 border-t border-[#F4EFE9] flex items-center justify-between gap-6">
          <button
            onClick={onClose}
            className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-[#1F1F1F] transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const payload: any = {
                category,
                subCategory,
                type,
              };

              if (city) payload.city = city;
              if (area) payload.area = area;

              onSearch(payload);
            }}
            className="flex-1 sm:flex-none px-10 py-4 rounded-2xl bg-[#1F1F1F] text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-[#C9A24D] transition-all duration-300"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}