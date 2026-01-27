import PropertyCard from '@/components/property/PropertyCard';
import { FullPropertyDetails } from '@/types/property';

type Props = {
  params: Promise<{
    category: string;
    type: string;
  }>;
};

async function getProperties(
  category: string,
  type: string
): Promise<FullPropertyDetails[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(
    `${baseUrl}/api/properties?category=${category}&type=${type}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }

  const json = await res.json();
  return json.data ?? [];
}

export default async function ListingPage({ params }: Props) {
  // ✅ REQUIRED IN NEXT 14
  const { category, type } = await params;

  const properties = await getProperties(category, type);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold capitalize">
          {category} properties for {type}
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          Showing {properties.length} listing
          {properties.length !== 1 && 's'}
        </p>
      </header>

      {properties.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No properties found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
