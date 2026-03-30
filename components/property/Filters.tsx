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

import { getFiltersConfig } from '@/lib/getFiltersConfig';
import { FilterConfig } from '@/app/api/config/filters';

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

  /* ---------------- STATE ---------------- */

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

  /* ---------------- CONFIG ---------------- */

  const config: FilterConfig[] = useMemo(() => {
    return getFiltersConfig(category);
  }, [category]);

  /* ---------------- SYNC FROM URL ---------------- */

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

  /* ---------------- ACTIVE FILTER COUNT ---------------- */

  const activeCount = Object.keys(filters).filter(
    (k) => filters[k]
  ).length + (minPrice || maxPrice ? 1 : 0);

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-6 shadow-sm sticky top-20">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">Filters</h2>
          {activeCount > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {activeCount} active
            </p>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-red-500 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* FILTERS */}
      {config.map((filter) => {
        /* ---------------- PRICE ---------------- */
        if (filter.type === 'price') {
          return (
            <div key="price" className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {filter.label}
              </label>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />

                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>
          );
        }

        /* ---------------- SELECT ---------------- */
        return (
          <div key={filter.key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {filter.label}
            </label>

            <div className="relative">
              <select
                value={filters[filter.key] || ''}
                onChange={(e) =>
                  updateField(filter.key, e.target.value)
                }
                className="w-full border p-2.5 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10 appearance-none"
              >
                <option value="">All</option>

                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Custom dropdown arrow */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>
        );
      })}

      {/* LOADING */}
      {isPending && (
        <div className="text-xs text-gray-400 animate-pulse">
          Updating results...
        </div>
      )}
    </div>
  );
}