import { NextResponse } from 'next/server';

import propertiesData from '@/data/properties.json';
import imagesData from '@/data/property_images.json';
import residentialData from '@/data/residential_details.json';
import commercialData from '@/data/commercial_details.json';
import landData from '@/data/land_details.json';

/* ---------------- TYPES ---------------- */

type Property = ReturnType<typeof buildProperties>[number];

/* ---------------- HELPERS ---------------- */

const parseNumber = (value: string | null) => {
  if (!value) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
};

const parseBoolean = (value: string | null) => {
  if (value === null) return undefined;
  return value === 'true';
};

/* ---------------- BUILD JOINED DATA ---------------- */

function buildProperties() {
  const residentialMap = new Map(
    residentialData.residential_details.map((r) => [r.property_id, r])
  );

  const commercialMap = new Map(
    commercialData.commercial_details.map((c) => [c.property_id, c])
  );

  const landMap = new Map(
    landData.land_details.map((l) => [l.property_id, l])
  );

  const imagesMap = new Map<string, any[]>();

  imagesData.property_images.forEach((img) => {
    if (!imagesMap.has(img.property_id)) {
      imagesMap.set(img.property_id, []);
    }
    imagesMap.get(img.property_id)!.push(img);
  });

  return propertiesData.properties.map((p) => ({
    ...p,
    images: imagesMap.get(p.id) || [],
    residential_details: residentialMap.get(p.id),
    commercial_details: commercialMap.get(p.id),
    land_details: landMap.get(p.id),
  }));
}

/* ---------------- FILTER ENGINE ---------------- */

function applyFilters(
  properties: Property[],
  searchParams: URLSearchParams
) {
  const category = searchParams.get('category');

  // ✅ DEFAULT SALE (IMPORTANT)
  const type = searchParams.get('type') || 'sale';

  const minPrice = parseNumber(searchParams.get('minPrice'));
  const maxPrice = parseNumber(searchParams.get('maxPrice'));

  const verified = parseBoolean(searchParams.get('verified'));
  const featured = parseBoolean(searchParams.get('featured'));

  const search = searchParams.get('search');

  return properties.filter((p) => {
    /* ---------- CORE ---------- */

    if (category && p.category !== category) return false;

    // ✅ TYPE FILTER (MANDATORY)
    if (p.listing_type !== type) return false;

    /* ---------- SEARCH ---------- */

    if (search) {
      const s = search.toLowerCase();

      if (
        !p.title.toLowerCase().includes(s) &&
        !p.description.toLowerCase().includes(s)
      ) {
        return false;
      }
    }

    /* ---------- PRICE ---------- */

    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;

    /* ---------- FLAGS ---------- */

    if (verified !== undefined && p.verified !== verified) return false;
    if (featured !== undefined && p.is_featured !== featured) return false;

    /* ---------- LOCATION ---------- */

    if (searchParams.get('city') && p.city !== searchParams.get('city'))
      return false;

    if (searchParams.get('area') && p.area !== searchParams.get('area'))
      return false;

    /* =======================================================
       CATEGORY-SPECIFIC FILTERS
    ======================================================= */

    /* ---------- RESIDENTIAL ---------- */
    if (p.category === 'residential') {
      const r = p.residential_details;
      if (!r) return false;

      if (searchParams.get('bedrooms')) {
        if (r.bedrooms < Number(searchParams.get('bedrooms')))
          return false;
      }

      if (searchParams.get('bathrooms')) {
        if (r.bathrooms < Number(searchParams.get('bathrooms')))
          return false;
      }

      if (searchParams.get('furnishing')) {
        if (r.furnishing_type !== searchParams.get('furnishing'))
          return false;
      }

      if (searchParams.get('subtype')) {
        if (r.property_subtype !== searchParams.get('subtype'))
          return false;
      }
    }

    /* ---------- COMMERCIAL ---------- */
    if (p.category === 'commercial') {
      const c = p.commercial_details;
      if (!c) return false;

      if (searchParams.get('floor')) {
        if (c.floor !== searchParams.get('floor')) return false;
      }

      if (searchParams.get('ac')) {
        if (
          c.central_air_conditioning !==
          (searchParams.get('ac') === 'true')
        )
          return false;
      }

      if (searchParams.get('subtype')) {
        if (c.commercial_subtype !== searchParams.get('subtype'))
          return false;
      }
    }

    /* ---------- LAND ---------- */
    if (p.category === 'land') {
      const l = p.land_details;
      if (!l) return false;

      if (searchParams.get('corner_plot')) {
        if (
          l.corner_plot !== (searchParams.get('corner_plot') === 'true')
        )
          return false;
      }

      if (searchParams.get('land_zoning')) {
        if (l.land_zoning !== searchParams.get('land_zoning'))
          return false;
      }

      if (searchParams.get('subtype')) {
        if (l.land_subtype !== searchParams.get('subtype'))
          return false;
      }
    }

    return true;
  });
}

/* ---------------- SORTING ---------------- */

function applySorting(properties: Property[], sort: string | null) {
  if (!sort) return properties;

  const sorted = [...properties];

  switch (sort) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      break;

    case 'newest':
      sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
      break;
  }

  return sorted;
}

/* ---------------- PAGINATION ---------------- */

function applyPagination(
  properties: Property[],
  page: number,
  limit: number
) {
  const start = (page - 1) * limit;
  return properties.slice(start, start + limit);
}

/* ---------------- HANDLER ---------------- */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const allProperties = buildProperties();

  /* ---------- SINGLE PROPERTY ---------- */
  const id = searchParams.get('id');

  if (id) {
    const property = allProperties.find((p) => p.id === id);

    return NextResponse.json({
      data: property ?? null,
    });
  }

  /* ---------- FILTER ---------- */
  const filtered = applyFilters(allProperties, searchParams);

  /* ---------- SORT ---------- */
  const sorted = applySorting(filtered, searchParams.get('sort'));

  /* ---------- PAGINATION ---------- */
  const page = parseNumber(searchParams.get('page')) || 1;
  const limit = parseNumber(searchParams.get('limit')) || 9;

  const paginated = applyPagination(sorted, page, limit);

  /* ---------- RESPONSE ---------- */
  return NextResponse.json({
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  });
}