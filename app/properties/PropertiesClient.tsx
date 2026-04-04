'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropertyCard from '@/components/property/PropertyCard';
import { FullPropertyDetails } from '@/types/property';

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<FullPropertyDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  // ---------------- BUILD QUERY ----------------
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      if (value) params.set(key, value);
    });

    return params.toString();
  }, [searchParams]);

  // ---------------- FETCH ----------------
  useEffect(() => {
    const fetchProperties = async () => {
      if (controllerRef.current) controllerRef.current.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);

      try {
        const res = await fetch(`/api/allproperties?${queryString}`, {
          signal: controller.signal,
        });

        const data = await res.json();
        setProperties(data.properties || []);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [queryString]);

  // ---------------- FILTER HANDLER ----------------
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // auto-clean empty params
    for (const [k, v] of params.entries()) {
      if (!v) params.delete(k);
    }

    const newQuery = params.toString();
    router.replace(newQuery ? `/properties?${newQuery}` : '/properties');
  };

  // ---------------- LABEL MAP ----------------
  const labelMap: Record<string, string> = {
    listing: 'Type',
    category: 'Category',
    featured: 'Featured',
    city: 'City',
    area: 'Area',
    bedrooms: 'BHK',
    subtype: 'Subtype',
    sort: 'Sort',
  };

  const activeFilters = Array.from(searchParams.entries()).filter(
    ([_, value]) => value
  );

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* FILTER CONTROLS */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* LISTING */}
        <select
          onChange={(e) => updateFilter('listing', e.target.value)}
          value={searchParams.get('listing') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        {/* CATEGORY */}
        <select
          onChange={(e) => updateFilter('category', e.target.value)}
          value={searchParams.get('category') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>

        {/* FEATURED */}
        <select
          onChange={(e) => updateFilter('featured', e.target.value)}
          value={searchParams.get('featured') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="true">Featured</option>
        </select>

        {/* SORT (NEW) */}
        <select
          onChange={(e) => updateFilter('sort', e.target.value)}
          value={searchParams.get('sort') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">Default</option>
          <option value="latest">Latest</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
        </select>
      </div>

      {/* ACTIVE FILTERS (AUTO HIDE IF EMPTY) */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeFilters.map(([key, value]) => (
            <div
              key={`${key}-${value}`}
              className="flex items-center gap-2 bg-[#ede3d5] text-[#6f4e37] px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>
                {labelMap[key] || key}: {value}
              </span>

              <button
                onClick={() => updateFilter(key, '')}
                className="text-xs font-bold hover:text-black"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* STATES */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No properties found
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}