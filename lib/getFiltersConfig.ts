import { FILTERS_CONFIG, FilterConfig } from '@/app/api/config/filters';

/* ---------------- CACHE ---------------- */

const configCache = new Map<string, FilterConfig[]>();

/* ---------------- FUNCTION ---------------- */

export function getFiltersConfig(category: string): FilterConfig[] {
  /* ✅ RETURN FROM CACHE */
  if (configCache.has(category)) {
    return configCache.get(category)!;
  }

  const base = FILTERS_CONFIG.common ?? [];
  const categoryConfig =
    FILTERS_CONFIG[category as keyof typeof FILTERS_CONFIG] ?? [];

  /* 🔥 IMPORTANT: create ONCE */
  const merged = [...base, ...categoryConfig];

  /* ✅ STORE */
  configCache.set(category, merged);

  return merged;
}