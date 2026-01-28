'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Clock,
  Tag,
  Key,
  Ruler,
  Home,
  Building2,
  LandPlot,
  Eye,
  MessageSquare,
} from 'lucide-react';
import ImageCarousel from '@/components/Carousel';
import { FullPropertyDetails } from '@/types/property';

/* ---------------- HELPERS ---------------- */

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

type Props = {
  params: Promise<{ id: string }>;
};

/* ================= PAGE ================= */

export default function PropertyDetailPage({ params }: Props) {
  const { id } = use(params);
  const [property, setProperty] = useState<FullPropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties?id=${id}`);
        if (!res.ok) throw new Error('Fetch failed');
        const json = await res.json();
        setProperty(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3E6D7]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-black/20 border-t-black animate-spin" />
          <p className="text-xs tracking-widest uppercase text-black/60">
            Loading Property
          </p>
        </div>
      </div>
    );
  }

  if (!property) notFound();

  const resi = property.residential_details;
  const comm = property.commercial_details;
  const land = property.land_details;

  // Unit Logic: Agricultural Land = acres, Plot/Others = sqft
  const isAgriLand = land?.land_subtype?.toLowerCase().includes('agricultural');
  const areaUnit = isAgriLand ? 'acres' : 'sqft';
      const areaValue = isAgriLand ? land?.plot_area : (resi?.built_up_area || comm?.built_up_area);

  return (
    <main className="min-h-screen bg-[#F3E6D7] pb-24">
      {/* ================= HERO ================= */}
      <section className="pt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden relative">
            <ImageCarousel images={property.images ?? []} title={property.title} />

            <div className="absolute top-6 left-6 flex gap-3 z-10">
              {property.is_featured && (
                <span className="bg-[#C9A24D] text-black text-[11px] font-extrabold px-5 py-1 rounded-full tracking-widest">
                  FEATURED
                </span>
              )}
              <span className="bg-white/90 backdrop-blur text-black text-[11px] font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                {property.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-4 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-10">

          {/* HEADER */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-black/5 px-4 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold mb-4">
                  {property.category === 'residential' && <Home size={12} />}
                  {property.category === 'commercial' && <Building2 size={12} />}
                  {property.category === 'land' && <LandPlot size={12} />}
                  {property.category}
                </span>

                <h1 className="text-4xl font-serif font-semibold text-black">
                  {property.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-black/60 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {property.area}, {property.city}
                  </span>
                  <span className="flex items-center gap-1.5 border-l pl-4">
                    <Eye size={14} /> {property.views_count ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={14} /> {property.enquiries_count ?? 0}
                  </span>
                </div>
              </div>

              <div className="md:text-right">
                <p className="text-4xl font-black text-black">
                  {formatINR(property.price)}
                </p>
                <p className="text-xs tracking-[0.35em] uppercase text-black/50 mt-1">
                  {property.listing_type === 'rent' ? 'PER MONTH' : 'TOTAL PRICE'}
                </p>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="mt-10 pt-8 border-t flex flex-wrap gap-4">
              <QuickStat 
                label={isAgriLand ? "Plot Area" : "Built-up Area"} 
                value={`${areaValue} ${areaUnit}`} 
                icon={<Ruler size={16} />} 
              />
              <QuickStat label="Listing Type" value={property.listing_type} icon={<Tag size={16} />} />
              <QuickStat label="Property Code" value={property.property_code} icon={<Key size={16} />} />
   
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg">
            <h2 className="text-2xl font-serif font-semibold mb-8">
              Property Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* ================= RESIDENTIAL ================= */}
              {resi && (
                <>
                  <DetailCell label="Property Type" value={resi.property_subtype} />
                  <DetailCell label="Bedrooms" value={resi.bedrooms} />
                  <DetailCell label="Bathrooms" value={resi.bathrooms} />
                  <DetailCell label="Floor" value={resi.floor} />
                  <DetailCell label="Furnishing" value={resi.furnishing_type.replace('_', ' ')} />
                  <DetailCell label="Parking" value={`${resi.parking_spaces} Slots`} />
                  <DetailCell label="Property Age" value={`${resi.property_age} Years`} />
                  <DetailCell label="Balconies" value={resi.balconies} />
                  <DetailCell label="Lift" value={resi.lift ? 'Available' : 'Not Available'} />
                  <DetailCell label="Carpet Area" value={`${resi.carpet_area} sqft`} />
                  <DetailCell label="Key Amenity" value={resi.amenity} />
                             {resi.maintenance_charges > 0 && (
                <QuickStat label="Maintenance" value={`₹${resi.maintenance_charges}/mo`} icon={<ShieldCheck size={16} />} />
              )}
                </>
              )}

              {/* ================= COMMERCIAL ================= */}
              {comm && (
                <>
                  <DetailCell label="Commercial Type" value={comm.commercial_subtype} />
                  <DetailCell label="Floor (Unit/Total)" value={comm.floor} />
                  <DetailCell label="Washrooms" value={comm.washrooms} />
                  <DetailCell label="Meeting Rooms" value={comm.meeting_rooms} />
                  <DetailCell label="Pantry" value={comm.pantry ? 'Available' : 'Not Available'} />
                  <DetailCell label="Air Conditioning" value={comm.central_air_conditioning ? 'Centralized' : 'Non-AC'} />
                  <DetailCell label="Passenger Lift" value={comm.passenger_lift ? 'Yes' : 'No'} />
                  <DetailCell label="Service Lift" value={comm.service_lift ? 'Yes' : 'No'} />
                  <DetailCell label="Frontage Width" value={`${comm.frontage_width} ft`} />
                             {comm.maintenance_charges > 0 && (
                <QuickStat label="Maintenance" value={`₹${comm.maintenance_charges}/mo`} icon={<ShieldCheck size={16} />} />
              )}
                </>
              )}

              {/* ================= LAND ================= */}
              {land && (
                <>
                  <DetailCell label="Land Subtype" value={land.land_subtype} />
                  <DetailCell label="Plot Area" value={`${land.plot_area} ${areaUnit}`} />
                  <DetailCell label="Dimensions" value={land.plot_dimensions} />
                  <DetailCell label="Zoning" value={land.land_zoning} />
                  <DetailCell label="Approved Use" value={land.approved_use} />
                  <DetailCell label="Road Width" value={`${land.road_width} ft`} />
                  <DetailCell label="Corner Plot" value={land.corner_plot ? 'Yes' : 'No'} />
                  <DetailCell label="Boundary Wall" value={land.boundary_wall ? 'Constructed' : 'Not Constructed'} />
                </>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg">
            <div className="w-16 h-[2px] bg-[#C9A24D] mb-6" />
            <h2 className="text-2xl font-serif font-semibold mb-4">Description</h2>
            <p className="text-[15px] leading-8 text-black/70 whitespace-pre-line">
              {property.description}
            </p>

            <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between gap-4 text-sm text-black/50">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                Last Updated: {new Date(property.updated_at).toLocaleDateString('en-IN')}
              </div>
              <p>
                Available from:{' '}
                <span className="font-semibold text-black">
                  {property.possession_date || 'Immediate'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 space-y-6">
            <div className="bg-black rounded-[32px] p-8 text-white shadow-2xl">
              <h3 className="text-xl font-serif mb-8 text-[#C9A24D]">Interested?</h3>
              <div className="space-y-4">
                <button className="w-full bg-[#C9A24D] text-black py-4 rounded-full font-bold tracking-wide hover:bg-[#b38f42] transition-colors">
                  Contact Agent
                </button>
                <button className="w-full border border-white/30 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Request a Tour
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A24D] rounded-full flex items-center justify-center text-black font-bold">
                  {property.city.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">Property Manager</p>
                  <p className="text-xs text-white/60">Response time &lt; 2 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C9A24D] rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-black" size={22} />
              </div>
              <div>
                <p className="font-bold text-sm">Verified Listing</p>
                <p className="text-xs text-black/60">
                  Listed on {new Date(property.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= SMALL COMPONENTS ================= */

function QuickStat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-black/5 px-5 py-3 rounded-full">
      {icon}
      <div>
        <p className="text-[9px] tracking-widest uppercase font-bold text-black/50">{label}</p>
        <p className="text-sm font-semibold text-black">{value}</p>
      </div>
    </div>
  );
}

function DetailCell({ label, value }: { label: string; value: string | number | undefined | null }) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <div className="bg-black/5 p-5 rounded-2xl">
      <p className="text-[10px] tracking-widest uppercase text-black/50 mb-1">{label}</p>
      <p className="text-sm font-semibold text-black capitalize">{value.toString()}</p>
    </div>
  );
}