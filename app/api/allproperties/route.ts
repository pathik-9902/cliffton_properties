import { NextResponse } from 'next/server';
import data from '@/data/data.json';
import { FullPropertyDetails, PropertyResponse } from '@/types/property';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const city = searchParams.get('city');
    const area = searchParams.get('area');
    const listing = searchParams.get('listing');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const bedrooms = searchParams.get('bedrooms');
    const search = searchParams.get('search');
    const subtype = searchParams.get('subtype');

    let properties: FullPropertyDetails[] =
      data.properties as FullPropertyDetails[];

    if (city) {
      properties = properties.filter(
        (p) => p.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (area) {
      properties = properties.filter(
        (p) => p.area?.toLowerCase() === area.toLowerCase()
      );
    }

    if (listing) {
      properties = properties.filter(
        (p) => p.listing_type.toLowerCase() === listing.toLowerCase()
      );
    }

    if (category) {
      properties = properties.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      properties = properties.filter((p) => p.is_featured);
    }

    if (bedrooms) {
      properties = properties.filter(
        (p) =>
          p.residential_details &&
          String(p.residential_details.bedrooms) === bedrooms
      );
    }

    if (subtype) {
      properties = properties.filter((p) => {
        if (p.residential_details?.property_subtype === subtype) return true;
        if (p.commercial_details?.commercial_subtype === subtype) return true;
        if (p.land_details?.land_subtype === subtype) return true;
        return false;
      });
    }

    if (search) {
      const term = search.toLowerCase();

      properties = properties.filter((p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.area?.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term)
      );
    }

    const response: PropertyResponse = {
      properties,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}