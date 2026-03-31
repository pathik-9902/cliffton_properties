// lib/config/searchData.ts

export type SuggestionType = {
  label: string;
  type: 'city' | 'area';
  city?: string;
};

export const SEARCH_SUGGESTIONS: SuggestionType[] = [
  { label: 'Vesu', type: 'area', city: 'Surat' },
  { label: 'Adajan', type: 'area', city: 'Surat' },
  { label: 'Pal', type: 'area', city: 'Surat' },
  { label: 'Dumas Road', type: 'area', city: 'Surat' },
  { label: 'Ring Road', type: 'area', city: 'Surat' },
  { label: 'Sachin GIDC', type: 'area', city: 'Surat' },

  { label: 'Surat', type: 'city' },

  // FUTURE READY
  { label: 'Ahmedabad', type: 'city' },
  { label: 'Mumbai', type: 'city' },
];