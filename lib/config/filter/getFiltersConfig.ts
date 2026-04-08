import { FILTERS_CONFIG, FilterConfig } from '@/lib/config/filter/filters';

import {
  getDynamicCities,
  getDynamicAreas,
  getDynamicBHK,
  getDynamicResidentialTypes,
  getDynamicCommercialTypes,
  getDynamicLandTypes,
} from './dynamicFilter';

/* ---------------- CACHE ---------------- */

const configCache = new Map<string, FilterConfig[]>();

/* ---------------- INJECTOR ---------------- */

function injectDynamicOptions(
  filters: FilterConfig[],
  category: string
): FilterConfig[] {
  return filters.map((filter) => {
    switch (filter.key) {
      /* -------- COMMON -------- */
      case 'city':
        return { ...filter, options: getDynamicCities() };

      case 'area':
        return { ...filter, options: getDynamicAreas() };

      /* -------- RESIDENTIAL -------- */
      case 'bedrooms':
        if (category === 'residential') {
          return { ...filter, options: getDynamicBHK() };
        }
        return filter;

      case 'subtype':
        if (category === 'residential') {
          return { ...filter, options: getDynamicResidentialTypes() };
        }
        if (category === 'commercial') {
          return { ...filter, options: getDynamicCommercialTypes() };
        }
        if (category === 'land') {
          return { ...filter, options: getDynamicLandTypes() };
        }
        return filter;

      default:
        return filter;
    }
  });
}

/* ---------------- MAIN FUNCTION ---------------- */

export function getFiltersConfig(category: string): FilterConfig[] {
  if (configCache.has(category)) {
    return configCache.get(category)!;
  }

  const base = FILTERS_CONFIG.common ?? [];
  const categoryConfig =
    FILTERS_CONFIG[category as keyof typeof FILTERS_CONFIG] ?? [];

  const merged = [...base, ...categoryConfig];

  const finalConfig = injectDynamicOptions(merged, category);

  configCache.set(category, finalConfig);

  return finalConfig;
}