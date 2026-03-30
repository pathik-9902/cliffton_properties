'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import PropertyCard from '@/components/property/PropertyCard';
import Filters from '@/components/property/Filters';
import { FullPropertyDetails } from '@/types/property';

/* ---------------- TYPES ---------------- */

type ApiResponse = {
  data: FullPropertyDetails[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/* ---------------- COMPONENT ---------------- */

export default function ListingClient({
  category,
  type,
}: {
  category: string;
  type: string;
}) {
  const searchParams = useSearchParams();

  /* 🔥 STABLE STRING */
  const searchString = searchParams.toString();

  /* ---------------- STATE ---------------- */

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- NORMALIZE FILTERS ---------------- */

  const filters = useMemo(() => {
    const obj: Record<string, string> = {};
    const params = new URLSearchParams(searchString);

    params.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }, [searchString]);

  /* ---------------- FETCH FROM API ---------------- */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProperties() {
      setLoading(true);

      try {
        const query = new URLSearchParams({
          category,
          type,
          ...filters,
        });

        const res = await fetch(`/api/properties?${query.toString()}`, {
          signal: controller.signal,
        });

        const data: ApiResponse = await res.json();

        setResponse(data);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();

    return () => controller.abort();
  }, [category, type, filters]);

  /* ---------------- DATA ---------------- */

  const properties = response?.data || [];
  const meta = response?.meta;

  /* ---------------- UI ---------------- */

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* HEADER */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold capitalize">
            {category} properties for {type}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Loading...'
              : `Showing ${meta?.total ?? 0} result${
                  meta?.total !== 1 ? 's' : ''
                }`}
          </p>
        </div>
      </header>

      {/* MOBILE FILTER */}
      <div className="lg:hidden mb-4">
        <details className="bg-white border rounded-xl">
          <summary className="cursor-pointer p-3 font-medium">
            Filters
          </summary>

          <div className="p-4 border-t">
            <Filters category={category} initialFilters={filters} />
          </div>
        </details>
      </div>

      <div className="flex gap-8">
        {/* DESKTOP FILTER */}
        <aside className="w-72 hidden lg:block">
          <Filters category={category} initialFilters={filters} />
        </aside>

        {/* LISTINGS */}
        <div className="flex-1">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              Loading properties...
            </div>
          ) : properties.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              No properties found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    priority={index < 3}
                  />
                ))}
              </div>

              {meta && <Pagination meta={meta} filters={filters} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAGINATION ---------------- */

function Pagination({
  meta,
  filters,
}: {
  meta: { page: number; totalPages: number };
  filters: Record<string, string>;
}) {
  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10 flex-wrap">
      {Array.from({ length: meta.totalPages }).map((_, i) => {
        const page = i + 1;

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.set(key, value);
        });

        params.set('page', String(page));

        return (
          <a
            key={page}
            href={`?${params.toString()}`}
            className={`px-4 py-2 border rounded-lg text-sm ${
              page === meta.page
                ? 'bg-black text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {page}
          </a>
        );
      })}
    </div>
  );
}