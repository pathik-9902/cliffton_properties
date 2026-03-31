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

/* ---------------- COMPONENT ---------------- */

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
    const paramsObj: Record<string, string> = {};

    params.forEach((value, key) => {
      paramsObj[key] = value;
    });

    const next = JSON.stringify(paramsObj);
    const current = JSON.stringify(filters);

    if (next === current) return;

    setFilters(paramsObj);
    setMinPrice(paramsObj.minPrice || '');
    setMaxPrice(paramsObj.maxPrice || '');
  }, [searchString]);

  /* ---------------- UPDATE URL ---------------- */

  const updateURL = useCallback(
    (nextFilters: Record<string, string>) => {
      const params = new URLSearchParams();

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const nextQuery = params.toString();

      if (prevQueryRef.current === nextQuery) return;
      prevQueryRef.current = nextQuery;

      startTransition(() => {
        router.replace(`?${nextQuery}`, { scroll: false });
      });
    },
    [router]
  );

  /* ---------------- FIELD UPDATE ---------------- */

  const updateField = useCallback((key: string, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (value) updated[key] = value;
      else delete updated[key];

      updated.page = '';

      return updated;
    });
  }, []);

  /* ---------------- DEBOUNCE ---------------- */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      updateURL({
        ...filters,
        minPrice,
        maxPrice,
      });
    }, 250);

    return () => clearTimeout(handler);
  }, [filters, minPrice, maxPrice, updateURL]);

  /* ---------------- CLEAR ---------------- */

  const clearFilters = useCallback(() => {
    prevQueryRef.current = '';

    setFilters({});
    setMinPrice('');
    setMaxPrice('');

    startTransition(() => {
      router.replace('?', { scroll: false });
    });
  }, [router]);

  const activeCount =
    Object.keys(filters).filter((k) => filters[k]).length +
    (minPrice || maxPrice ? 1 : 0);

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white rounded-3xl border border-[#E8E2DA] shadow-sm p-6 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg text-[#1F1F1F]">
            Filters
          </h2>

          {activeCount > 0 && (
            <p className="text-xs text-[#6B6B6B] mt-1">
              {activeCount} active filters
            </p>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#C9A24D] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* FILTER GROUPS */}
      {config.map((filter) => {
        /* PRICE */
        if (filter.type === 'price') {
          return (
            <div key="price" className="space-y-3">
              <label className="text-sm font-medium text-[#1F1F1F]">
                {filter.label}
              </label>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-[#E8E2DA] bg-[#F4EFE9] p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 transition"
                />

                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-[#E8E2DA] bg-[#F4EFE9] p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 transition"
                />
              </div>
            </div>
          );
        }

        /* SELECT */
        return (
          <div key={filter.key} className="space-y-3">
            <label className="text-sm font-medium text-[#1F1F1F]">
              {filter.label}
            </label>

            <div className="relative">
              <select
                value={filters[filter.key] || ''}
                onChange={(e) =>
                  updateField(filter.key, e.target.value)
                }
                className="w-full border border-[#E8E2DA] bg-[#F4EFE9] p-3 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 transition"
              >
                <option value="">All</option>

                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] text-xs">
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