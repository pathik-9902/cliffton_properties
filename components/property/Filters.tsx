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

import { getFiltersConfig } from '@/lib/config/filter/getFiltersConfig';
import { FilterConfig } from '@/lib/config/filter/filters';

/* ---------------- TYPES ---------------- */

type Props = {
  category: string;
  initialFilters?: Record<string, string>;
};

/* ---------------- UI TOKENS ---------------- */

const ui = {
  container:
    'bg-white border border-gray-200 rounded-2xl p-6 space-y-8 shadow-sm',

  section: 'space-y-4',

  label: 'text-sm font-medium text-gray-800',

  input:
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 transition',

  chip:
    'px-3 py-1.5 rounded-full text-xs transition border',

  chipActive:
    'bg-black text-white border-black shadow-sm',

  chipInactive:
    'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',

  buttonBase:
    'text-sm font-medium rounded-full transition',

  toggleActive:
    'bg-black text-white shadow-sm',

  toggleInactive:
    'bg-gray-100 text-gray-600 hover:bg-gray-200',

  divider: 'border-t border-gray-200 pt-6',
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

  /* ---------------- CONFIG ---------------- */

  const config: FilterConfig[] = useMemo(() => {
    const raw = getFiltersConfig(category);

    return raw.sort(
      (a, b) => (a.priority || 999) - (b.priority || 999)
    );
  }, [category]);

  /* ---------------- GROUPING ---------------- */

  const groupedFilters = useMemo(() => {
    const groups: Record<string, FilterConfig[]> = {};

    config.forEach((filter) => {
      const group = filter.group || 'other';

      if (!groups[group]) groups[group] = [];
      groups[group].push(filter);
    });

    return groups;
  }, [config]);

  /* ---------------- SYNC ---------------- */

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const obj: Record<string, string> = {};

    params.forEach((value, key) => {
      obj[key] = value;
    });

    if (!obj.type) obj.type = 'sale';

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

  /* ---------------- RENDER FIELD ---------------- */

  const renderField = (filter: FilterConfig) => {
    if (filter.type === 'price') {
      return (
        <div key="price" className={ui.section}>
          <label className={ui.label}>{filter.label}</label>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={ui.input}
            />

            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={ui.input}
            />
          </div>
        </div>
      );
    }

    if (!filter.options) return null;

    /* ---------------- CHIPS ---------------- */

    if (filter.type === 'chips') {
      return (
        <div key={filter.key} className={ui.section}>
          <label className={ui.label}>{filter.label}</label>

          <div className="flex flex-wrap gap-2">
            {filter.options.map((opt) => {
              const active =
                (filters[filter.key] || '') === opt.value;

              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    updateField(filter.key, opt.value)
                  }
                  className={`${ui.chip} ${
                    active ? ui.chipActive : ui.chipInactive
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ---------------- SELECT ---------------- */

    return (
      <div key={filter.key} className={ui.section}>
        <label className={ui.label}>{filter.label}</label>

        <select
          value={filters[filter.key] || ''}
          onChange={(e) =>
            updateField(filter.key, e.target.value)
          }
          className={ui.input}
        >
          <option value="">All</option>

          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="sticky top-6">
      <div className={ui.container}>
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Filters</h2>

            {activeCount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {activeCount} active filters
              </p>
            )}
          </div>

          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              Reset
            </button>
          )}
        </div>

        {/* LISTING TYPE */}
        <div className={ui.section}>
          <label className={ui.label}>Listing Type</label>

          <div className="flex gap-2">
            {['sale', 'rent'].map((t) => {
              const active = (filters.type || 'sale') === t;

              return (
                <button
                  key={t}
                  onClick={() => updateField('type', t)}
                  className={`flex-1 py-2 ${ui.buttonBase} ${
                    active
                      ? ui.toggleActive
                      : ui.toggleInactive
                  }`}
                >
                  {t === 'sale' ? 'Buy' : 'Rent'}
                </button>
              );
            })}
          </div>
        </div>

        {/* GROUPED FILTERS */}
        {Object.entries(groupedFilters).map(
          ([group, filters], index) => (
            <div
              key={group}
              className={index !== 0 ? ui.divider : ''}
            >
              <div className="text-xs font-semibold uppercase text-gray-400 tracking-wide mb-4">
                {group}
              </div>

              <div className="space-y-6">
                {filters.map((f) => renderField(f))}
              </div>
            </div>
          )
        )}

        {/* LOADING */}
        {isPending && (
          <div className="text-xs text-gray-500 animate-pulse">
            Updating results...
          </div>
        )}
      </div>
    </div>
  );
}