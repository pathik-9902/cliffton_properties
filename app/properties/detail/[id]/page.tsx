import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FullPropertyDetails } from '@/types/property';

// Helper for currency formatting
const formatINR = (amount: number) => 
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

type Props = {
  params: Promise<{ id: string }>;
};

async function getProperty(id: string): Promise<FullPropertyDetails | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/properties?id=${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) notFound();

  // Mapping the specific details based on the category
  const resi = property.residential;
  const comm = property.commercial;
  const land = property.land;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. CREATIVE HERO GALLERY */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[500px]">
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden group">
              <Image 
                src={property.images?.[0]?.image_url || '/placeholder.png'} 
                alt={property.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.is_featured && (
                  <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">FEATURED</span>
                )}
                <span className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase">
                  {property.status}
                </span>
              </div>
            </div>
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden">
                <Image src={property.images?.[1]?.image_url || '/placeholder.png'} alt="View 2" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image src={property.images?.[2]?.image_url || '/placeholder.png'} alt="View 3" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer">
                  +{property.images?.length ? property.images.length - 3 : 0} Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. MAIN DETAILS COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header & Essential Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">{property.title}</h1>
                <p className="text-slate-500 flex items-center gap-2">
                  <span className="p-1 bg-slate-100 rounded">📍</span> {property.area}, {property.city}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-blue-600">{formatINR(property.price)}</p>
                <p className="text-sm font-medium text-slate-400">{property.price_unit}</p>
              </div>
            </div>

            {/* QUICK STATS BAR */}
            <div className="flex flex-wrap gap-4 border-t pt-6">
              <QuickStat label="Built-up" value={`${property.built_up_area} ${property.area_unit}`} icon="📐" />
              <QuickStat label="Category" value={property.category} icon="🏷️" />
              <QuickStat label="Type" value={property.listing_type} icon="🔑" />
              {property.maintenance_charges > 0 && (
                <QuickStat label="Maintenance" value={`₹${property.maintenance_charges}/mo`} icon="🛠️" />
              )}
            </div>
          </div>

          {/* DYNAMIC CATEGORY DETAILS GRID */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               Deep Specifications
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8">
              {/* Residential Logic */}
              {resi && (
                <>
                  <DetailCell label="Bedrooms" value={resi.bedrooms} />
                  <DetailCell label="Bathrooms" value={resi.bathrooms} />
                  <DetailCell label="Floor" value={`${resi.floor_number} of ${resi.total_floors}`} />
                  <DetailCell label="Furnishing" value={resi.furnishing_type.replace('_', ' ')} />
                  <DetailCell label="Parking" value={`${resi.parking_spaces} Slots`} />
                  <DetailCell label="Age" value={`${resi.property_age} Years`} />
                  <DetailCell label="Balconies" value={resi.balconies} />
                  <DetailCell label="Lift" value={resi.lift ? "Available" : "No"} />
                </>
              )}

              {/* Commercial Logic */}
              {comm && (
                <>
                  <DetailCell label="Subtype" value={comm.commercial_subtype} />
                  <DetailCell label="Washrooms" value={comm.washrooms} />
                  <DetailCell label="Meeting Rooms" value={comm.meeting_rooms} />
                  <DetailCell label="AC" value={comm.central_air_conditioning ? "Centralized" : "Split/None"} />
                  <DetailCell label="Lifts (Pass/Ser)" value={`${comm.passenger_lift ? 'Yes' : 'No'} / ${comm.service_lift ? 'Yes' : 'No'}`} />
                  <DetailCell label="Frontage" value={`${comm.frontage_width} ft`} />
                  <DetailCell label="Pantry" value={comm.pantry ? "Private" : "No"} />
                </>
              )}

              {/* Land Logic */}
              {land && (
                <>
                  <DetailCell label="Plot Area" value={`${land.plot_area} sqft`} />
                  <DetailCell label="Dimensions" value={land.plot_dimensions} />
                  <DetailCell label="Zoning" value={land.land_zoning} />
                  <DetailCell label="Approved Use" value={land.approved_use} />
                  <DetailCell label="Road Width" value={`${land.road_width} ft`} />
                  <DetailCell label="Corner Plot" value={land.corner_plot ? "Yes" : "No"} />
                  <DetailCell label="Boundary Wall" value={land.boundary_wall ? "Constructed" : "No"} />
                </>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About this Property</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {property.description}
            </p>
            <div className="mt-6 pt-6 border-t flex items-center justify-between text-sm text-slate-400">
              <p>Property Code: <span className="font-mono text-slate-900">{property.property_code}</span></p>
              <p>Available from: <span className="text-slate-900">{property.possession_date || 'Immediate'}</span></p>
            </div>
          </div>
        </div>

        {/* 3. STICKY ACTION SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-blue-400">Interested?</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all transform hover:-translate-y-1">
                  Contact Owner
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold backdrop-blur transition-all">
                  Request a Tour
                </button>
              </div>
              <p className="mt-6 text-xs text-slate-400 text-center">
                Last updated on {new Date(property.updated_at).toLocaleDateString()}
              </p>
            </div>
            
            {/* Trust badge */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="text-2xl">🛡️</div>
              <div>
                <p className="text-sm font-bold text-blue-900">Verified Listing</p>
                <p className="text-xs text-blue-700">Documents checked by our team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function QuickStat({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">{label}</p>
        <p className="text-sm font-bold text-slate-700 capitalize">{value}</p>
      </div>
    </div>
  );
}

function DetailCell({ label, value }: { label: string; value: string | number | undefined }) {
  if (value === undefined || value === null) return null;
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-black text-slate-300 tracking-widest">{label}</p>
      <p className="text-base font-bold text-slate-800 capitalize">{value}</p>
    </div>
  );
}