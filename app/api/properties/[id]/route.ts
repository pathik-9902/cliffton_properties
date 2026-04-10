import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/* ---------------- HANDLER ---------------- */

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        residential_details(*),
        commercial_details(*),
        land_details(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // PG result not found
        return NextResponse.json({ data: null });
      }
      throw error;
    }

    if (!data) {
      return NextResponse.json({ data: null });
    }

    const formattedProperty = {
      ...data,
      images: Array.isArray(data.images)
        ? [...data.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        : [],
      residential_details: Array.isArray(data.residential_details)
        ? data.residential_details[0]
        : data.residential_details || null,
      commercial_details: Array.isArray(data.commercial_details)
        ? data.commercial_details[0]
        : data.commercial_details || null,
      land_details: Array.isArray(data.land_details)
        ? data.land_details[0]
        : data.land_details || null,
    };

    return NextResponse.json({
      data: formattedProperty,
    });
  } catch (error) {
    console.error('DETAIL API ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}