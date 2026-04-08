// lib/config/filter/filters
/* ---------------- TYPES ---------------- */

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterUIType =
  | 'select'
  | 'chips'
  | 'toggle'
  | 'price';

export type FilterConfig = {
  key: string;
  label: string;
  type: FilterUIType;

  options?: FilterOption[];

  /* 🔥 NEW UX LAYER */
  priority?: number; // order control
  icon?: string; // future use
  group?: string; // section grouping
};

/* ---------------- CATEGORY TYPES ---------------- */

type FilterCategory =
  | 'common'
  | 'residential'
  | 'commercial'
  | 'land';

type FiltersConfigType = Record<
  FilterCategory,
  FilterConfig[]
>;

/* ---------------- CONFIG ---------------- */

export const FILTERS_CONFIG: FiltersConfigType = {
  /* =======================================================
     COMMON
  ======================================================= */
  common: [
    {
      key: 'price',
      label: 'Price Range',
      type: 'price',
      priority: 1,
      group: 'budget',
    },

    {
      key: 'city',
      label: 'City',
      type: 'select',
      priority: 2,
      group: 'location',
      options: [
        { label: 'All Cities', value: '' },
        { label: 'Surat', value: 'Surat' },
        { label: 'Navsari', value: 'Navsari' },
      ],
    },

    {
      key: 'area',
      label: 'Area',
      type: 'select',
      priority: 3,
      group: 'location',
      options: [
        { label: 'All Areas', value: '' },
        { label: 'Vesu', value: 'Vesu' },
        { label: 'Adajan', value: 'Adajan' },
        { label: 'Pal', value: 'Pal' },
        { label: 'Dumas Road', value: 'Dumas Road' },
        { label: 'Udhna', value: 'Udhna' },
      ],
    },

    {
      key: 'verified',
      label: 'Verified',
      type: 'chips',
      priority: 4,
      group: 'trust',
      options: [
        { label: 'All', value: '' },
        { label: 'Verified', value: 'true' },
        { label: 'Unverified', value: 'false' },
      ],
    },

    {
      key: 'featured',
      label: 'Featured',
      type: 'chips',
      priority: 5,
      group: 'trust',
      options: [
        { label: 'All', value: '' },
        { label: 'Featured', value: 'true' },
        { label: 'Others', value: 'false' },
      ],
    },

    {
      key: 'sort',
      label: 'Sort By',
      type: 'select',
      priority: 99,
      group: 'advanced',
      options: [
        { label: 'Default', value: '' },
        { label: 'Newest', value: 'newest' },
        { label: 'Price Low to High', value: 'price_asc' },
        { label: 'Price High to Low', value: 'price_desc' },
      ],
    },
  ],

  /* =======================================================
     RESIDENTIAL
  ======================================================= */
  residential: [
    {
      key: 'bedrooms',
      label: 'BHK',
      type: 'chips',
      priority: 1,
      group: 'essentials',
      options: [
        { label: 'Any', value: '' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4+', value: '4' },
      ],
    },

    {
      key: 'bathrooms',
      label: 'Bathrooms',
      type: 'chips',
      priority: 2,
      group: 'essentials',
      options: [
        { label: 'Any', value: '' },
        { label: '1+', value: '1' },
        { label: '2+', value: '2' },
        { label: '3+', value: '3' },
      ],
    },

    {
      key: 'subtype',
      label: 'Property Type',
      type: 'chips',
      priority: 3,
      group: 'type',
      options: [
        { label: 'All', value: '' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Villa', value: 'villa' },
      ],
    },

    {
      key: 'furnishing',
      label: 'Furnishing',
      type: 'select',
      priority: 4,
      group: 'details',
      options: [
        { label: 'Any', value: '' },
        { label: 'Fully Furnished', value: 'fully-furnished' },
        { label: 'Semi Furnished', value: 'semi-furnished' },
        { label: 'Unfurnished', value: 'unfurnished' },
      ],
    },
  ],

  /* =======================================================
     COMMERCIAL
  ======================================================= */
  commercial: [
    {
      key: 'subtype',
      label: 'Property Type',
      type: 'chips',
      priority: 1,
      group: 'type',
      options: [
        { label: 'All', value: '' },
        { label: 'Office', value: 'office' },
        { label: 'Showroom', value: 'showroom' },
        { label: 'Workspace', value: 'workspace' },
      ],
    },

    {
      key: 'floor',
      label: 'Floor',
      type: 'select',
      priority: 2,
      group: 'details',
      options: [
        { label: 'Any', value: '' },
        { label: 'Ground', value: 'Ground' },
        { label: '1st', value: '1st' },
        { label: '2nd', value: '2nd' },
        { label: '3rd+', value: '3rd' },
      ],
    },

    {
      key: 'ac',
      label: 'AC',
      type: 'chips',
      priority: 3,
      group: 'features',
      options: [
        { label: 'Any', value: '' },
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
    },
  ],

  /* =======================================================
     LAND
  ======================================================= */
  land: [
    {
      key: 'subtype',
      label: 'Land Type',
      type: 'chips',
      priority: 1,
      group: 'type',
      options: [
        { label: 'All', value: '' },
        { label: 'Residential', value: 'residential_plot' },
        { label: 'Industrial', value: 'industrial_plot' },
        { label: 'Agricultural', value: 'agricultural_land' },
      ],
    },

    {
      key: 'corner_plot',
      label: 'Corner',
      type: 'chips',
      priority: 2,
      group: 'features',
      options: [
        { label: 'Any', value: '' },
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
    },

    {
      key: 'land_zoning',
      label: 'Zoning',
      type: 'select',
      priority: 3,
      group: 'details',
      options: [
        { label: 'All', value: '' },
        { label: 'Residential', value: 'residential' },
        { label: 'Industrial', value: 'industrial' },
        { label: 'Agricultural', value: 'agricultural' },
      ],
    },
  ],
};