import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const type = searchParams.get('type');

  const data = await import('@/data.json');
  let properties = data.default.properties;

  // ✅ SINGLE PROPERTY
  if (id) {
    const property = properties.find((p: any) => p.id === id);
    return NextResponse.json({
      data: property ?? null,
    });
  }

  // ✅ FILTERED LIST
  if (category) {
    properties = properties.filter((p: any) => p.category === category);
  }

  if (type) {
    properties = properties.filter((p: any) => p.listing_type === type);
  }

  return NextResponse.json({
    data: properties,
  });
}
