import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

/* ---------------- HANDLER ---------------- */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Base filters
    const category = searchParams.get('category');
    const type = searchParams.get('listing') || searchParams.get('type');
    const subtype = searchParams.get('subtype');
    const minPrice = parseNumber(searchParams.get('minPrice'));
    const maxPrice = parseNumber(searchParams.get('maxPrice'));
    const verified = parseBoolean(searchParams.get('verified'));
    const featured = parseBoolean(searchParams.get('featured'));
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const area = searchParams.get('area');

    // Advanced filters
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const furnishing = searchParams.get('furnishing');
    const floor = searchParams.get('floor');
    const ac = parseBoolean(searchParams.get('ac'));
    const cornerPlot = parseBoolean(searchParams.get('corner_plot'));
    const landZoning = searchParams.get('land_zoning');

    // Pagination
    const page = parseNumber(searchParams.get('page')) || 1;
    const limit = parseNumber(searchParams.get('limit')) || 9;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Sorting
    const sort = searchParams.get('sort') || 'newest';

    // Normalise category once
    const normalizedCategory = category?.toLowerCase();

    // Build select string — only join relevant detail tables
    let detailSelect = '';
    if (normalizedCategory === 'residential') {
      detailSelect = 'residential_details(*)';
    } else if (normalizedCategory === 'commercial') {
      detailSelect = 'commercial_details(*)';
    } else if (normalizedCategory === 'land') {
      detailSelect = 'land_details(*)';
    } else {
      detailSelect = 'residential_details(*),commercial_details(*),land_details(*)';
    }

    let query = supabase
      .from('properties')
      .select(`*, images:property_images(*), ${detailSelect}`, { count: 'exact' });

    /* ---- BASE FILTERS ---- */

    if (normalizedCategory) {
      query = query.eq('category', normalizedCategory);
    }

    if (type) {
      query = query.eq('listing_type', type.toLowerCase());
    }

    if (minPrice !== undefined) query = query.gte('price', minPrice);
    if (maxPrice !== undefined) query = query.lte('price', maxPrice);
    if (verified !== undefined) query = query.eq('verified', verified);
    if (featured !== undefined) query = query.eq('is_featured', featured);
    if (city) query = query.ilike('city', city);
    if (area) query = query.ilike('area', area);

    /* ---- SEARCH ---- */

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,city.ilike.%${search}%,area.ilike.%${search}%`
      );
    }

    /* ---- ADVANCED FILTERS (joined tables) ---- */

    if (subtype) {
      if (normalizedCategory === 'residential') {
        query = query.eq('residential_details.property_subtype', subtype);
      } else if (normalizedCategory === 'commercial') {
        query = query.eq('commercial_details.commercial_subtype', subtype);
      } else if (normalizedCategory === 'land') {
        query = query.eq('land_details.land_subtype', subtype);
      } else {
        query = query.or(
          `residential_details.property_subtype.eq.${subtype},commercial_details.commercial_subtype.eq.${subtype},land_details.land_subtype.eq.${subtype}`
        );
      }
    }

    if (!normalizedCategory || normalizedCategory === 'residential') {
      if (bedrooms) query = query.eq('residential_details.bedrooms', bedrooms);
      if (bathrooms) query = query.gte('residential_details.bathrooms', Number(bathrooms));
      if (furnishing) query = query.eq('residential_details.furnishing_type', furnishing);
      if (floor && normalizedCategory === 'residential') {
        query = query.eq('residential_details.floor', floor);
      }
    }

    if (!normalizedCategory || normalizedCategory === 'commercial') {
      if (ac !== undefined) query = query.eq('commercial_details.central_air_conditioning', ac);
      if (floor && normalizedCategory === 'commercial') {
        query = query.eq('commercial_details.floor', floor);
      }
    }

    if (!normalizedCategory || normalizedCategory === 'land') {
      if (cornerPlot !== undefined) query = query.eq('land_details.corner_plot', cornerPlot);
      if (landZoning) query = query.eq('land_details.land_zoning', landZoning);
    }

    /* ---- SORTING ---- */

    switch (sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    /* ---- PAGINATION ---- */

    query = query.range(from, to);

    const { data: rawData, error, count } = await query;

    if (error) {
      console.error('Properties API error:', error);
      throw error;
    }

    /* ---- POST-PROCESS ---- */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenDetail = (val: any) => {
      if (Array.isArray(val)) return val.length > 0 ? val[0] : null;
      return val ?? null;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedData = (rawData || []).map((p: any) => ({
      ...p,
      images: Array.isArray(p.images)
        ? [...p.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        : [],
      residential_details: flattenDetail(p.residential_details),
      commercial_details: flattenDetail(p.commercial_details),
      land_details: flattenDetail(p.land_details),
    }));

    const total = count ?? processedData.length;

    return NextResponse.json({
      data: processedData,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Properties API fatal error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}