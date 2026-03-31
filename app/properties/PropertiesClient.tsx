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

  // ---------------- FILTER HANDLERS ----------------
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.replace(`/properties?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.replace('/properties');
  };

  // ---------------- LABEL MAP ----------------
  const labelMap: Record<string, string> = {
    listing: 'Type',
    category: 'Category',
    featured: 'Featured',
    city: 'City',
    area: 'Area',
    bedrooms: 'BHK',
    subtype: 'Type',
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* FILTER CONTROLS */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          onChange={(e) => updateFilter('listing', e.target.value)}
          value={searchParams.get('listing') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

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

        <select
          onChange={(e) => updateFilter('featured', e.target.value)}
          value={searchParams.get('featured') || ''}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="true">Featured</option>
        </select>
      </div>

      {/* ACTIVE FILTERS */}
      {searchParams.toString() && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {Array.from(searchParams.entries()).map(([key, value]) => {
            if (!value) return null;

            return (
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
            );
          })}

          {/* CLEAR ALL */}
          <button
            onClick={clearAllFilters}
            className="ml-2 text-sm text-red-500 font-semibold"
          >
            Clear All
          </button>
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