import properties from '@/data/properties.json';
import residentialDetails from '@/data/residential_details.json';
import commercialDetails from '@/data/commercial_details.json';
import landDetails from '@/data/land_details.json';

import { FilterOption } from './filters';

/* ---------------- HELPERS ---------------- */

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function toOptions(values: (string | number)[], includeAll = true): FilterOption[] {
  const opts = values.map((v) => ({
    label: String(v),
    value: String(v),
  }));

  if (includeAll) {
    return [{ label: 'All', value: '' }, ...opts];
  }

  return opts;
}

/* ---------------- COMMON FILTERS ---------------- */

export function getDynamicCities(): FilterOption[] {
  const cities = unique(properties.properties.map((p) => p.city));
  return [{ label: 'All Cities', value: '' }, ...toOptions(cities, false)];
}

export function getDynamicAreas(): FilterOption[] {
  const areas = unique(properties.properties.map((p) => p.area));
  return [{ label: 'All Areas', value: '' }, ...toOptions(areas, false)];
}

/* ---------------- RESIDENTIAL ---------------- */

export function getDynamicBHK(): FilterOption[] {
  const bhk = unique(
    residentialDetails.residential_details.map((r) => r.bedrooms)
  );

  return [{ label: 'Any', value: '' }, ...toOptions(bhk, false)];
}

export function getDynamicResidentialTypes(): FilterOption[] {
  const types = unique(
    residentialDetails.residential_details.map((r) => r.property_subtype)
  );

  return [{ label: 'All', value: '' }, ...toOptions(types, false)];
}

/* ---------------- COMMERCIAL ---------------- */

export function getDynamicCommercialTypes(): FilterOption[] {
  const types = unique(
    commercialDetails.commercial_details.map((c) => c.commercial_subtype)
  );

  return [{ label: 'All', value: '' }, ...toOptions(types, false)];
}

/* ---------------- LAND ---------------- */

export function getDynamicLandTypes(): FilterOption[] {
  const types = unique(
    landDetails.land_details.map((l) => l.land_subtype)
  );

  return [{ label: 'All', value: '' }, ...toOptions(types, false)];
}