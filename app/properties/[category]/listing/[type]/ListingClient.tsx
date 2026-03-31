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
  const searchString = searchParams.toString();

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  /* ✅ ALWAYS RUN HOOKS IN SAME ORDER */

  const filters = useMemo(() => {
    const obj: Record<string, string> = {};
    const params = new URLSearchParams(searchString);

    params.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }, [searchString]);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const properties = response?.data || [];
  const meta = response?.meta;

  /* ✅ SAFE RENDER */

  if (!mounted) {
    return (
      <section className="bg-[#F4EFE9] min-h-screen" />
    );
  }

  return (
    <section className="bg-[#F4EFE9] min-h-screen text-[#1F1F1F]">
      {/* HEADER */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#F4EFE9]/80 border-b border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold capitalize tracking-tight">
              {category} for {type}
            </h1>

            <p className="text-sm text-[#6B6B6B] mt-1">
              {loading
                ? 'Loading premium listings...'
                : `Showing ${meta?.total ?? 0} result${
                    meta?.total !== 1 ? 's' : ''
                  }`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* MOBILE FILTER */}
        <div className="lg:hidden mb-6">
          <details className="bg-white rounded-2xl shadow-sm border border-[#E8E2DA] overflow-hidden">
            <summary className="cursor-pointer px-5 py-4 font-medium text-sm">
              Filters
            </summary>

            <div className="p-5 border-t border-[#E8E2DA]">
              <Filters category={category} initialFilters={filters} />
            </div>
          </details>
        </div>

        <div className="flex gap-10">
          {/* DESKTOP FILTER */}
          <aside className="w-80 hidden lg:block">
            <div className="sticky top-28 bg-white rounded-3xl border border-[#E8E2DA] shadow-sm p-6">
              <Filters category={category} initialFilters={filters} />
            </div>
          </aside>

          {/* LISTINGS */}
          <div className="flex-1">
            {loading ? (
              <SkeletonGrid />
            ) : properties.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[#6B6B6B] text-base">
                  No properties found.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property, index) => (
                    <div
                      key={property.id}
                      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-3xl"
                    >
                      <PropertyCard
                        property={property}
                        priority={index < 3}
                      />
                    </div>
                  ))}
                </div>

                {meta && <Pagination meta={meta} filters={filters} />}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKELETON ---------------- */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-3xl border border-[#E8E2DA] shadow-sm p-4 space-y-4"
        >
          <div className="h-52 bg-[#E8E2DA] rounded-xl" />
          <div className="h-4 bg-[#E8E2DA] rounded w-3/4" />
          <div className="h-4 bg-[#E8E2DA] rounded w-1/2" />
          <div className="h-6 bg-[#D8CBBE] rounded w-1/3" />
        </div>
      ))}
    </div>
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
    <div className="flex justify-center gap-3 mt-16 flex-wrap">
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
            className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
              page === meta.page
                ? 'bg-black text-white shadow-md'
                : 'bg-white border border-[#E8E2DA] text-[#6B6B6B] hover:bg-[#F4EFE9]'
            }`}
          >
            {page}
          </a>
        );
      })}
    </div>
  );
}