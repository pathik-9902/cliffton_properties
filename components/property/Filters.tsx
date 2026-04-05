'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  useState,
  useEffect,
  useMemo,
  useTransition,
  useRef,
  useCallback,
} from 'react';

import { getFiltersConfig } from '@/lib/config/getFiltersConfig';
import { FilterConfig } from '@/lib/config/filters';

/* ---------------- TYPES ---------------- */

type Props = {
  category: string;
  initialFilters?: Record<string, string>;
};

export default function Filters({
  category,
  initialFilters = {},
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchString = searchParams.toString();

  const [filters, setFilters] =
    useState<Record<string, string>>(initialFilters);

  const [minPrice, setMinPrice] = useState(
    initialFilters.minPrice || ''
  );

  const [maxPrice, setMaxPrice] = useState(
    initialFilters.maxPrice || ''
  );

  const isFirstRender = useRef(true);
  const prevQueryRef = useRef('');

  const config: FilterConfig[] = useMemo(() => {
    return getFiltersConfig(category);
  }, [category]);

  /* ---------------- SYNC ---------------- */

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const obj: Record<string, string> = {};

    params.forEach((value, key) => {
      obj[key] = value;
    });

    if (!obj.type) obj.type = 'sale'; // ✅ default

    setFilters(obj);
    setMinPrice(obj.minPrice || '');
    setMaxPrice(obj.maxPrice || '');
  }, [searchString]);

  /* ---------------- UPDATE URL ---------------- */

  const updateURL = useCallback(
    (next: Record<string, string>) => {
      const params = new URLSearchParams();

      Object.entries(next).forEach(([key, value]) => {
        if (!value && key !== 'type') return;
        params.set(key, value || 'sale');
      });

      const query = params.toString();

      if (prevQueryRef.current === query) return;
      prevQueryRef.current = query;

      startTransition(() => {
        router.replace(`?${query}`, { scroll: false });
      });
    },
    [router]
  );

  /* ---------------- UPDATE FIELD ---------------- */

  const updateField = useCallback((key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: '',
    }));
  }, []);

  /* ---------------- DEBOUNCE ---------------- */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const t = setTimeout(() => {
      updateURL({
        ...filters,
        minPrice,
        maxPrice,
      });
    }, 250);

    return () => clearTimeout(t);
  }, [filters, minPrice, maxPrice, updateURL]);

  /* ---------------- CLEAR ---------------- */

  const clearFilters = () => {
    prevQueryRef.current = '';

    const base = { type: 'sale' };

    setFilters(base);
    setMinPrice('');
    setMaxPrice('');

    router.replace('?type=sale');
  };

  const activeCount =
    Object.keys(filters).filter((k) => filters[k]).length +
    (minPrice || maxPrice ? 1 : 0);

  /* ---------------- UI ---------------- */

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-[#E8E2DA] shadow-xl rounded-[28px] p-6 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Filters
          </h2>
          {activeCount > 0 && (
            <p className="text-xs text-[#6B6B6B] mt-1">
              {activeCount} active
            </p>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#C9A24D] hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* 🔥 PREMIUM SEGMENTED CONTROL */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Listing Type</label>

        <div className="relative flex bg-[#F4EFE9] p-1 rounded-2xl">
          {['sale', 'rent'].map((t) => {
            const active = (filters.type || 'sale') === t;

            return (
              <button
                key={t}
                onClick={() => updateField('type', t)}
                className={`
                  relative z-10 flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300
                  ${active
                    ? 'bg-white shadow text-black'
                    : 'text-[#6B6B6B]'}
                `}
              >
                {t === 'sale' ? 'Sale' : 'Rent'}
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER GROUPS */}
      {config.map((filter) => {
        if (filter.type === 'price') {
          return (
            <div key="price" className="space-y-3">
              <label className="text-sm font-medium">
                {filter.label}
              </label>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-[#F4EFE9] border border-transparent focus:border-[#C9A24D]/40 focus:ring-2 focus:ring-[#C9A24D]/20 rounded-xl p-3 text-sm transition"
                />

                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-[#F4EFE9] border border-transparent focus:border-[#C9A24D]/40 focus:ring-2 focus:ring-[#C9A24D]/20 rounded-xl p-3 text-sm transition"
                />
              </div>
            </div>
          );
        }

        return (
          <div key={filter.key} className="space-y-3">
            <label className="text-sm font-medium">
              {filter.label}
            </label>

            <div className="relative">
              <select
                value={filters[filter.key] || ''}
                onChange={(e) =>
                  updateField(filter.key, e.target.value)
                }
                className="w-full bg-[#F4EFE9] border border-transparent focus:border-[#C9A24D]/40 focus:ring-2 focus:ring-[#C9A24D]/20 rounded-xl p-3 text-sm appearance-none transition"
              >
                <option value="">All</option>

                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6B6B]">
                ▼
              </span>
            </div>
          </div>
        );
      })}

      {/* LOADING */}
      {isPending && (
        <div className="text-xs text-[#6B6B6B] animate-pulse">
          Updating results...
        </div>
      )}
    </div>
  );
}