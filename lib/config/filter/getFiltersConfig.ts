import { FILTERS_CONFIG, FilterConfig } from '@/lib/config/filter/filters';
import { SearchAndFilterOptions } from '@/lib/services/fetchOptions';

function toOptions(values: string[], includeAll = true) {
  const opts = values.map((v) => ({ label: v, value: v }));
  if (includeAll) return [{ label: 'All', value: '' }, ...opts];
  return opts;
}

function injectDynamicOptions(
  filters: FilterConfig[],
  category: string,
  options: SearchAndFilterOptions
): FilterConfig[] {
  return filters.map((filter) => {
    switch (filter.key) {
      /* -------- COMMON -------- */
      case 'city':
        return { ...filter, options: toOptions(options.cities) };

      case 'area':
        return { ...filter, options: toOptions(options.areas.map(a => a.label)) };

      /* -------- RESIDENTIAL -------- */
      case 'bedrooms':
        if (category === 'residential') {
          return { ...filter, options: toOptions(options.bedrooms) };
        }
        return filter;

      case 'subtype':
        if (category === 'residential') {
          return { ...filter, options: toOptions(options.residentialTypes) };
        }
        if (category === 'commercial') {
          return { ...filter, options: toOptions(options.commercialTypes) };
        }
        if (category === 'land') {
          return { ...filter, options: toOptions(options.landTypes) };
        }
        return filter;

      default:
        return filter;
    }
  });
}

export function buildFiltersConfig(category: string, options: SearchAndFilterOptions | null): FilterConfig[] {
  const base = FILTERS_CONFIG.common ?? [];
  const categoryConfig = FILTERS_CONFIG[category as keyof typeof FILTERS_CONFIG] ?? [];

  const merged = [...base, ...categoryConfig];

  if (!options) return merged;

  return injectDynamicOptions(merged, category, options);
}