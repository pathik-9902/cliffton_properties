import propertiesData from '@/data.json';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types/property';

type Props = {
  params: Promise<{
    category: string;
    type: string;
  }>;
};

export default async function ListingPage({ params }: Props) {
  const { category, type } = await params;

  const properties = propertiesData.properties as Property[];

  const filtered = properties.filter(
    (p) =>
      p.category === category &&
      p.listing_type === type  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold capitalize mb-6">
        {category} properties for {type}
      </h1>

      {filtered.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
