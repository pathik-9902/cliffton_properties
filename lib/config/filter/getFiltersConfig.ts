import { FILTERS_CONFIG, FilterConfig } from '@/lib/config/filter/filters';

/* ---------------- CACHE ---------------- */

const configCache = new Map<string, FilterConfig[]>();

/* ---------------- FUNCTION ---------------- */

export function getFiltersConfig(category: string): FilterConfig[] {
  if (configCache.has(category)) {
    return configCache.get(category)!;
  }

  const base = FILTERS_CONFIG.common ?? [];
  const categoryConfig =
    FILTERS_CONFIG[category as keyof typeof FILTERS_CONFIG] ?? [];

  const merged = [...base, ...categoryConfig];

  configCache.set(category, merged);

  return merged;
}