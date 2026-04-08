import { NextResponse } from 'next/server';

import propertiesData from '@/data/properties.json';
import imagesData from '@/data/property_images.json';
import residentialData from '@/data/residential_details.json';
import commercialData from '@/data/commercial_details.json';
import landData from '@/data/land_details.json';

/* ---------------- BUILD ---------------- */

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

/* ---------------- HANDLER ---------------- */

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ IMPORTANT FIX
    const { id } = await context.params;

    const all = buildProperties();

    const property = all.find((p) => p.id === id);

    return NextResponse.json({
      data: property ?? null,
    });
  } catch (error) {
    console.error('DETAIL API ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}