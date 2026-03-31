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
  PhoneCall,
  Calendar,
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
      {/* HERO */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E8E2DA] shadow-lg">
            <ImageCarousel
              images={property.images ?? []}
              title={property.title}
            />

            <div className="absolute top-6 left-6 flex gap-3 z-10">
              {property.is_featured && (
                <span className="bg-[#C9A24D] text-white text-[10px] px-4 py-1 rounded-full">
                  FEATURED
                </span>
              )}
              <span className="bg-white/90 text-[#1F1F1F] text-[10px] px-4 py-1 rounded-full uppercase">
                {property.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          {/* HEADER */}
          <div className="bg-white rounded-3xl border border-[#E8E2DA] p-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#F4EFE9] px-4 py-1 rounded-full text-[10px] uppercase">
                  {property.category === 'residential' && <Home size={12} />}
                  {property.category === 'commercial' && <Building2 size={12} />}
                  {property.category === 'land' && <LandPlot size={12} />}
                  {property.category}
                </span>

                <h1 className="text-3xl sm:text-4xl font-semibold mt-4">
                  {property.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#6B6B6B]">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {property.area}, {property.city}
                  </span>

                  <span className="flex items-center gap-2">
                    <Eye size={14} /> {property.views_count ?? 0}
                  </span>

                  <span className="flex items-center gap-2">
                    <MessageSquare size={14} /> {property.enquiries_count ?? 0}
                  </span>
                </div>
              </div>

              <div className="md:text-right">
                <p className="text-4xl font-semibold">
                  {formatINR(property.price)}
                </p>
                <p className="text-xs text-[#6B6B6B] mt-1 uppercase">
                  {property.listing_type === 'rent'
                    ? 'Per Month'
                    : 'Total Price'}
                </p>
              </div>
            </div>

            {/* FULL STATS */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Stat label="Area" value={`${areaValue} ${areaUnit}`} icon={<Ruler size={16} />} />
              <Stat label="Listing Type" value={property.listing_type} icon={<Tag size={16} />} />
              <Stat label="Property Code" value={property.property_code} icon={<Key size={16} />} />
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <Section title="Property Specifications">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">

              {resi && (
                <>
                  <Spec label="Type" value={resi.property_subtype} />
                  <Spec label="Bedrooms" value={resi.bedrooms} />
                  <Spec label="Bathrooms" value={resi.bathrooms} />
                  <Spec label="Balconies" value={resi.balconies} />
                  <Spec label="Built-up Area" value={`${resi.built_up_area} sqft`} />
                  <Spec label="Carpet Area" value={`${resi.carpet_area} sqft`} />
                  <Spec label="Maintenance" value={resi.maintenance_charges} />
                  <Spec label="Furnishing" value={resi.furnishing_type} />
                  <Spec label="Floor" value={resi.floor} />
                  <Spec label="Parking" value={resi.parking_spaces} />
                  <Spec label="Lift" value={resi.lift ? 'Yes' : 'No'} />
                  <Spec label="Property Age" value={resi.property_age} />
                </>
              )}

              {comm && (
                <>
                  <Spec label="Type" value={comm.commercial_subtype} />
                  <Spec label="Floor" value={comm.floor} />
                  <Spec label="Washrooms" value={comm.washrooms} />
                  <Spec label="Built-up Area" value={`${comm.built_up_area} sqft`} />
                  <Spec label="Maintenance" value={comm.maintenance_charges} />
                  <Spec label="Pantry" value={comm.pantry ? 'Yes' : 'No'} />
                  <Spec label="Meeting Rooms" value={comm.meeting_rooms} />
                  <Spec label="AC" value={comm.central_air_conditioning ? 'Yes' : 'No'} />
                  <Spec label="Passenger Lift" value={comm.passenger_lift ? 'Yes' : 'No'} />
                  <Spec label="Service Lift" value={comm.service_lift ? 'Yes' : 'No'} />
                  <Spec label="Frontage" value={comm.frontage_width} />
                </>
              )}

              {land && (
                <>
                  <Spec label="Subtype" value={land.land_subtype} />
                  <Spec label="Plot Area" value={`${land.plot_area} ${areaUnit}`} />
                  <Spec label="Price/unit" value={land.price_per_unit} />
                  <Spec label="Dimensions" value={land.plot_dimensions} />
                  <Spec label="Road Width" value={land.road_width} />
                  <Spec label="Corner Plot" value={land.corner_plot ? 'Yes' : 'No'} />
                  <Spec label="Zoning" value={land.land_zoning} />
                  <Spec label="Approved Use" value={land.approved_use} />
                  <Spec label="Boundary Wall" value={land.boundary_wall ? 'Yes' : 'No'} />
                </>
              )}

            </div>
          </Section>

          {/* DESCRIPTION */}
          <Section title="Description">
            <p className="text-[15px] leading-8 text-[#6B6B6B] whitespace-pre-line">
              {property.description}
            </p>

            <div className="mt-8 pt-6 border-t border-[#E8E2DA] flex flex-col sm:flex-row justify-between gap-4 text-sm text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                Updated: {new Date(property.updated_at).toLocaleDateString('en-IN')}
              </div>

              <p>
                Available:{' '}
                <span className="font-semibold text-[#1F1F1F]">
                  {property.possession_date || 'Immediate'}
                </span>
              </p>
            </div>
          </Section>
        </div>

        {/* RIGHT CTA */}
        <div>
          <div className="sticky top-10 space-y-6">
            <div className="bg-white border border-[#E8E2DA] rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-6">
                Interested in this property?
              </h3>

              <div className="space-y-4">
                <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
                  <PhoneCall size={16} /> Contact Agent
                </button>

                <button className="w-full border border-[#E8E2DA] py-3 rounded-xl hover:bg-[#F4EFE9] transition flex items-center justify-center gap-2">
                  <Calendar size={16} /> Schedule Visit
                </button>
              </div>
            </div>

            {property.verified && (
              <div className="bg-white border border-[#E8E2DA] rounded-2xl p-5 flex items-center gap-3">
                <ShieldCheck className="text-[#C9A24D]" />
                <div>
                  <p className="text-sm font-semibold">Verified</p>
                  <p className="text-xs text-[#6B6B6B]">
                    Authentic listing
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* UI */

function Section({ title, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E2DA] p-8">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

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