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
  PhoneCall,
  Calendar,
  Users,
} from 'lucide-react';
import ImageCarousel from '@/components/Carousel';
import { FullPropertyDetails } from '@/types/property';

/* ================= HELPERS ================= */

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderAmenities = (amenities: any) => {
  if (!amenities) return null;
  if (Array.isArray(amenities)) return amenities.join(', ');
  if (typeof amenities === 'object') {
    return Object.entries(amenities)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => { 
        return v === true; 
      })
      .map(([k]) => k.replace(/_/g, ' '))
      .join(', ');
  }
  return String(amenities);
};

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
        const res = await fetch(`/api/properties/${id}`); 
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
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFE9]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-[#E8E2DA] border-t-black animate-spin" />
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B]">
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

  const isAgriLand =
    land?.land_subtype?.toLowerCase().includes('agricultural');

  const areaUnit = isAgriLand ? 'acres' : 'sqft';

  const areaValue = isAgriLand
    ? land?.plot_area
    : resi?.built_up_area || comm?.built_up_area;

  return (
    <main className="bg-[#F4EFE9] pb-24 text-[#1F1F1F]">
      {/* HERO / IMAGE */}
      <section className="pt-4 sm:pt-10">
        <div className="max-w-7xl mx-auto px-0 sm:px-6">
          <div className="relative sm:rounded-[2.5rem] overflow-hidden bg-white border-b sm:border border-[#E8E2DA] shadow-xl">
            <ImageCarousel
              images={property.images ?? []}
              title={property.title}
            />

            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10 pr-6">
              {property.is_featured && (
                <span className="bg-[#C9A24D] text-white text-[10px] sm:text-xs font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  PREMIUM
                </span>
              )}
              <span className="bg-white/95 backdrop-blur-md text-[#1F1F1F] text-[10px] sm:text-xs font-bold tracking-widest px-4 py-1.5 rounded-full shadow-lg uppercase">
                {property.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:items-start">
        
        {/* LEFT PRIMARY CONTENT */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* HEADER INFORMATION CARD */}
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-[#E8E2DA] p-6 sm:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 bg-[#F4EFE9] px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#C9A24D]">
                  {property.category === 'residential' && <Home size={14} />}
                  {property.category === 'commercial' && <Building2 size={14} />}
                  {property.category === 'land' && <LandPlot size={14} />}
                  {property.category}
                </span>

                <h1 className="text-3xl sm:text-5xl font-bold mt-6 tracking-tight leading-tight">
                  {property.title}
                </h1>

                <div className="mt-6 flex flex-wrap gap-6 text-sm sm:text-base text-[#6B6B6B] font-medium">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#C9A24D]" />
                    {property.area}, {property.city}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto md:text-right border-t md:border-t-0 pt-6 md:pt-0">
                <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F1F1F]">
                  {formatINR(property.price)}
                </p>
                <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 font-bold uppercase tracking-widest">
                  {property.listing_type === 'rent' ? 'Per Month' : 'Total Price'}
                </p>
              </div>
            </div>

            {/* QUICK STATS INFOGRAPHIC */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Stat label="Total Area" value={`${areaValue} ${areaUnit}`} icon={<Ruler size={18} />} />
              <Stat label="Listing" value={property.listing_type} icon={<Tag size={18} />} />
              <Stat label="ID Number" value={property.property_code} icon={<Key size={18} />} />
            </div>
          </div>

          {/* PROPERTY DESCRIPTION */}
          <Section title="Overview & Narrative">
            <p className="text-base sm:text-lg leading-relaxed text-[#4A4A4A] whitespace-pre-line font-medium italic opacity-90">
              {property.description}
            </p>

            <div className="mt-12 pt-8 border-t border-[#F4EFE9] flex flex-col sm:flex-row justify-between gap-6 text-sm text-[#6B6B6B] font-semibold tracking-wide">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-2 uppercase">
                  <Clock size={16} /> Modified: {new Date(property.updated_at).toLocaleDateString('en-IN')}
                </div>
                <div className="flex items-center gap-2 uppercase">
                  <Calendar size={16} /> Created: {new Date(property.created_at).toLocaleDateString('en-IN')}
                </div>
              </div>

              <p className="uppercase">
                Availability: <span className="text-[#1F1F1F]">{property.possession_date || 'Ready Move'}</span>
              </p>
            </div>
          </Section>

          {/* DETAILED FEATURES */}
          <Section title="Technical Specifications">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Maps through detail tables dynamically as before, styles already updated in sub-components */}
              {resi && (
                <>
                  <Spec label="BHK Configuration" value={resi.property_subtype} />
                  <Spec label="Bedrooms" value={resi.bedrooms} />
                  <Spec label="Bathrooms" value={resi.bathrooms} />
                  <Spec label="Balconies" value={resi.balconies} />
                  <Spec label="Built-up Area" value={`${resi.built_up_area} sqft`} />
                  <Spec label="Carpet Area" value={`${resi.carpet_area} sqft`} />
                  <Spec label="Maintenance" value={resi.maintenance_charges} />
                  <Spec label="Furnishing" value={resi.furnishing_type} />
                  <Spec label="Floor Level" value={resi.floor} />
                  <Spec label="Car Spaces" value={resi.parking_spaces} />
                  <Spec label="Age of Prop" value={resi.property_age} />
                  {resi.amenities && <Spec label="Amenities" value={renderAmenities(resi.amenities)} />}
                </>
              )}
              {/* Comm and Land details follow same pattern */}
              {comm && (
                <>
                  <Spec label="Structure" value={comm.commercial_subtype} />
                  <Spec label="Floor" value={comm.floor} />
                  <Spec label="Washrooms" value={comm.washrooms} />
                  <Spec label="Built Area" value={`${comm.built_up_area} sqft`} />
                  <Spec label="Service AC" value={comm.central_air_conditioning ? 'Yes' : 'No'} />
                  <Spec label="Frontage" value={comm.frontage_width} />
                </>
              )}
              {land && (
                <>
                  <Spec label="Zoning" value={land.land_zoning} />
                  <Spec label="Plot Size" value={`${land.plot_area} ${areaUnit}`} />
                  <Spec label="Corner Plot" value={land.corner_plot ? 'Yes' : 'No'} />
                  <Spec label="Boundary" value={land.boundary_wall ? 'Yes' : 'No'} />
                </>
              )}
            </div>
          </Section>
        </div>

        {/* RIGHT SIDEBAR - STICKY DESKTOP */}
        <aside className="relative">
          <div className="sticky top-28 space-y-8">
            <div className="bg-[#1F1F1F] rounded-[2.5rem] p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 leading-tight">
                Request a Private Viewing
              </h3>

              <div className="space-y-4">
                <button className="w-full bg-[#C9A24D] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center justify-center gap-3">
                  <PhoneCall size={18} /> Call Advisor
                </button>

                <a 
                  href={`https://wa.me/919999999999?text=Inquiry for ${property.title}`}
                  target="_blank"
                  className="w-full border-2 border-white/20 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <Users size={18} /> WhatsApp
                </a>
              </div>
              
              <p className="mt-8 text-[10px] text-white/50 uppercase tracking-[0.2em] text-center font-bold">
                Professionalism Guaranteed
              </p>
            </div>

            {property.verified && (
              <div className="bg-white border border-[#E8E2DA] rounded-[2rem] p-6 flex items-center gap-5 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#C9A24D]/10 flex items-center justify-center text-[#C9A24D]">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Verified Listing</p>
                  <p className="text-xs text-[#6B6B6B] mt-1 font-medium italic">
                    Certified details and ownership.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white/80 backdrop-blur-xl border-t border-[#E8E2DA] flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button className="flex-1 bg-[#1F1F1F] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
          <PhoneCall size={16} /> Call Now
        </button>
        <a 
          href={`https://wa.me/919999999999?text=Inquiry for ${property.title}`}
          target="_blank"
          className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
        >
           WhatsApp
        </a>
      </div>
    </main>
  );
}

/* UI */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Section({ title, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E2DA] p-8">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Stat({ label, value, icon }: any) {
  return (
    <div className="flex items-center gap-3 bg-[#F4EFE9] px-4 py-3 rounded-xl">
      {icon}
      <div>
        <p className="text-xs text-[#6B6B6B]">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Spec({ label, value }: any) {
  if (!value) return null;
  return (
    <div className="bg-[#F4EFE9] p-4 rounded-xl">
      <p className="text-xs text-[#6B6B6B] mb-1">{label}</p>
      <p className="text-sm font-medium capitalize">
        {value.toString()}
      </p>
    </div>
  );
}