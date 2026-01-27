'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Layers,
  CornerUpRight,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';

import { FullPropertyDetails } from '@/types/property';

type PropertyCardProps = {
    property: FullPropertyDetails;
};

export default function PropertyCard({ property }: PropertyCardProps) {
    const {
        title,
        category,
        listing_type,
        status,
        city,
        area,
        price,
        price_unit,
        built_up_area,
        area_unit,
        is_featured,
        possession_date,
        residential,
        commercial,
        land,
        images,
    } = property;

    const coverImage =
        images?.slice().sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ??
        '/placeholder.png';

    const formatPrice = (amount: number) => {
        if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
        if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`;
        return amount.toLocaleString('en-IN');
    };

    return (

        <div className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* --- IMAGE SECTION --- */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant="dark">{listing_type.toUpperCase()}</Badge>
                    {is_featured && <Badge variant="featured">FEATURED</Badge>}
                </div>

                <div className="absolute top-4 right-4">
                    <Badge variant={status.toLowerCase()}>{status.toUpperCase()}</Badge>
                </div>

                {possession_date && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-[10px] font-bold bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3" />
                        POSSESSION: {new Date(possession_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()}
                    </div>
                )}
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                    <div className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                        <Building2 className="w-3 h-3" />
                        {category}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight min-h-[3rem]">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-2 font-medium">
                        <MapPin className="w-4 h-4 mr-1 text-rose-500" />
                        <span className="truncate">{area ? `${area}, ` : ''}{city}</span>
                    </p>
                </div>

                {/* DYNAMIC SPECIFICATIONS GRID */}
                <div className="flex-grow grid grid-cols-3 gap-4 border-y border-gray-50 py-4 my-2">
                    {category === 'residential' && residential && (
                        <>
                            <Spec icon={<Bed />} label="Beds" value={residential.bedrooms} />
                            <Spec icon={<Bath />} label="Baths" value={residential.bathrooms} />
                            <Spec icon={<Maximize />} label="Sqft" value={built_up_area} />
                        </>
                    )}

                    {category === 'commercial' && commercial && (
                        <>
                            <Spec icon={<Layers />} label="Floor" value={commercial.floor_number} />
                            <Spec icon={<ShieldCheck />} label="AC" value={commercial.central_air_conditioning ? 'Yes' : 'No'} />
                            <Spec icon={<Maximize />} label="Sqft" value={built_up_area} />
                        </>
                    )}

                    {category === 'land' && land && (
                        <>
                            <Spec icon={<Maximize />} label="Plot" value={land.plot_area} />
                            <Spec icon={<CornerUpRight />} label="Corner" value={land.corner_plot ? 'Yes' : 'No'} />
                            {/* FIXED: Added fallback '—' to satisfy TS string | number constraint */}
                            <Spec icon={<Layers />} label="Zoning" value={land.land_zoning ?? '—'} />
                        </>
                    )}
                </div>

                {/* --- FOOTER SECTION --- */}
                <div className="flex justify-between items-center pt-4 mt-auto">
                    <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold leading-none mb-1">Price</p>
                        <p className="font-extrabold text-2xl text-slate-900 tracking-tight">
                            ₹{formatPrice(price)}
                            {price_unit.toLowerCase().includes('month') && (
                                <span className="text-sm font-normal text-gray-500"> /mo</span>
                            )}
                        </p>
                    </div>
                    <Link href={`/properties/detail/${property.id}`}>

                        <button className="bg-blue-50 text-blue-700 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn shadow-sm">
                            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

/* ---------------- HELPERS ---------------- */

// FIXED: Defined value as string | number to match usage
function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-gray-400 mb-1.5 [&>svg]:w-4 [&>svg]:h-4">
                {icon}
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none mb-1">{label}</span>
            <span className="font-bold text-gray-800 text-xs leading-none truncate w-full">{value}</span>
        </div>
    );
}

function Badge({ children, variant }: { children: React.ReactNode; variant: string }) {
    const base = 'text-[10px] px-2.5 py-1.5 rounded-lg font-bold tracking-wider shadow-sm backdrop-blur-md';
    const styles: Record<string, string> = {
        dark: 'bg-slate-900/80 text-white',
        featured: 'bg-amber-400 text-amber-950',
        available: 'bg-emerald-500/90 text-white',
        sold: 'bg-rose-600/90 text-white',
        rented: 'bg-indigo-600/90 text-white',
        inactive: 'bg-gray-400/90 text-white',
    };
    return <span className={`${base} ${styles[variant] ?? styles.dark}`}>{children}</span>;
}