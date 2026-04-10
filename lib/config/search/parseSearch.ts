// lib/config/parseSearch.ts

type SuggestionItem = {
  label: string;
  type: string;
  city?: string;
};

export function parseSearch(input: string, suggestions: SuggestionItem[]) {
  const value = input.toLowerCase().trim();

  let city: string | null = null;
  let area: string | null = null;
  let bedrooms: string | null = null;

  // ---------------- BHK DETECTION ----------------
  const bhkMatch = value.match(/(\d+)\s*bhk/);
  if (bhkMatch) {
    bedrooms = bhkMatch[1];
  }

  // ---------------- MATCH AREA / CITY ----------------
  for (const item of suggestions) {
    const label = item.label.toLowerCase();

    if (value.includes(label)) {
      if (item.type === 'area') {
        area = item.label;
        city = item.city || null;
      }

      if (item.type === 'city') {
        city = item.label;
      }
    }
  }

  // ---------------- FALLBACK (if user types city manually) ----------------
  if (!city && value.includes('surat')) {
    city = 'Surat';
  }

  return {
    city,
    area,
    bedrooms,
    search: input,
  };
}