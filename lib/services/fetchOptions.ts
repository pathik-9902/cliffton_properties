import { supabase } from '@/lib/supabase';

export type SearchAndFilterOptions = {
  cities: string[];
  areas: { label: string; city: string }[];
  residentialTypes: string[];
  commercialTypes: string[];
  landTypes: string[];
  bedrooms: string[];
};

export async function getSearchAndFilterOptions(): Promise<SearchAndFilterOptions> {
  const [propRes, resRes, commRes, landRes] = await Promise.all([
    supabase.from('properties').select('city, area'),
    supabase.from('residential_details').select('property_subtype, bedrooms'),
    supabase.from('commercial_details').select('commercial_subtype'),
    supabase.from('land_details').select('land_subtype'),
  ]);

  const props = propRes.data || [];
  const resi = resRes.data || [];
  const comm = commRes.data || [];
  const land = landRes.data || [];

  const unique = (arr: any[]) => Array.from(new Set(arr)).filter(Boolean);

  const citySet = new Set<string>();
  const areaMap = new Map<string, string>();
  props.forEach(p => {
    if (p.city) citySet.add(p.city);
    if (p.area && p.city) areaMap.set(p.area, p.city);
  });

  const areas = Array.from(areaMap.entries()).map(([area, city]) => ({
    label: area,
    city
  }));

  return {
    cities: Array.from(citySet),
    areas,
    residentialTypes: unique(resi.map(r => r.property_subtype)),
    bedrooms: unique(resi.map(r => r.bedrooms).map(String)),
    commercialTypes: unique(comm.map(c => c.commercial_subtype)),
    landTypes: unique(land.map(l => l.land_subtype)),
  };
}
