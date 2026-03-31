/* ---------------- TYPES ---------------- */

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig =
  | {
      key: string;
      label: string;
      type: 'select';
      options: FilterOption[];
    }
  | {
      key: 'price';
      label: string;
      type: 'price';
    };

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
     COMMON (GLOBAL FILTERS)
  ======================================================= */
  common: [
    {
      key: 'price',
      label: 'Price Range',
      type: 'price',
    },

    {
      key: 'city',
      label: 'City',
      type: 'select',
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
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Verified Only', value: 'true' },
        { label: 'Unverified', value: 'false' },
      ],
    },

    {
      key: 'featured',
      label: 'Featured',
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Featured Only', value: 'true' },
        { label: 'Non Featured', value: 'false' },
      ],
    },

    {
      key: 'sort',
      label: 'Sort By',
      type: 'select',
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
      type: 'select',
      options: [
        { label: 'Any', value: '' },
        { label: '1 BHK', value: '1' },
        { label: '2 BHK', value: '2' },
        { label: '3 BHK', value: '3' },
        { label: '4+ BHK', value: '4' },
      ],
    },

    {
      key: 'bathrooms',
      label: 'Bathrooms',
      type: 'select',
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
      type: 'select',
      options: [
        { label: 'All Types', value: '' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Villa', value: 'villa' },
      ],
    },

    {
      key: 'furnishing',
      label: 'Furnishing',
      type: 'select',
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
      type: 'select',
      options: [
        { label: 'All Types', value: '' },
        { label: 'Office', value: 'office' },
        { label: 'Showroom', value: 'showroom' },
        { label: 'Warehouse', value: 'warehouse' },
      ],
    },

    {
      key: 'floor',
      label: 'Floor',
      type: 'select',
      options: [
        { label: 'Any', value: '' },
        { label: 'Ground', value: 'Ground' },
        { label: '1st Floor', value: '1st' },
        { label: '2nd Floor', value: '2nd' },
        { label: '3rd+ Floor', value: '3rd' },
      ],
    },

    {
      key: 'ac',
      label: 'Air Conditioning',
      type: 'select',
      options: [
        { label: 'Any', value: '' },
        { label: 'With AC', value: 'true' },
        { label: 'Without AC', value: 'false' },
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
      type: 'select',
      options: [
        { label: 'All Types', value: '' },
        { label: 'Residential Plot', value: 'residential_plot' },
        { label: 'Industrial Plot', value: 'industrial_plot' },
        { label: 'Agricultural Land', value: 'agricultural_land' },
      ],
    },

    {
      key: 'corner_plot',
      label: 'Corner Plot',
      type: 'select',
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
      options: [
        { label: 'All', value: '' },
        { label: 'Residential', value: 'residential' },
        { label: 'Industrial', value: 'industrial' },
        { label: 'Agricultural', value: 'agricultural' },
      ],
    },
  ],
};