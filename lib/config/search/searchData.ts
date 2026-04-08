import propertiesData from '@/data/properties.json';

type SuggestionType = {
  label: string;
  type: 'city' | 'area';
  city?: string;
};

export function generateSearchSuggestions(): SuggestionType[] {
  const citySet = new Set<string>();
  const areaMap = new Map<string, string>(); // area → city

  propertiesData.properties.forEach((p) => {
    if (p.city) {
      citySet.add(p.city);
    }

    if (p.area && p.city) {
      areaMap.set(p.area, p.city);
    }
  });

  const suggestions: SuggestionType[] = [];

  /* -------- AREAS FIRST -------- */
  areaMap.forEach((city, area) => {
    suggestions.push({
      label: area,
      type: 'area',
      city,
    });
  });

  /* -------- CITIES -------- */
  citySet.forEach((city) => {
    suggestions.push({
      label: city,
      type: 'city',
    });
  });

  return suggestions;
}

export const SEARCH_SUGGESTIONS = generateSearchSuggestions();