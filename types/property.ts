export type PropertyCategory = 'residential' | 'commercial' | 'land';
export type ListingType = 'rent' | 'sale';

export interface Property {
  id: string;
  property_code: string;
  category: PropertyCategory;
  listing_type: ListingType;
  status: string;
  is_featured: boolean;
  title: string;
  description: string;
  possession_date?: string;
  city: string;
  area?: string;
  price: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResidentialProperty {
  property_subtype: string;
  bedrooms: number; maintenance_charges: number;
  built_up_area: number;
  bathrooms: number;
  balconies: number;
  furnishing_type: string;
  floor: string;
  carpet_area: number;
  parking_spaces: number;
  property_age: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amenities?: string[] | any;
}

export interface CommercialProperty {
  commercial_subtype: string;
  floor: string;
  washrooms: number; maintenance_charges: number;
  built_up_area: number;
  pantry: boolean;
  meeting_rooms: number;
  central_air_conditioning: boolean;
  passenger_lift: boolean;
  service_lift: boolean;
  frontage_width?: number;
}

export interface LandProperty {
  land_subtype: string;
  plot_area: number;
  price_per_unit: number;
  plot_dimensions?: string;
  road_width?: number;
  corner_plot: boolean;
  land_zoning?: string;
  approved_use?: string;
  boundary_wall: boolean;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  public_id: string;
  sort_order: number;
  created_at: string;
}

export type FullPropertyDetails = Property & {
  residential_details?: ResidentialProperty;
  commercial_details?: CommercialProperty;
  land_details?: LandProperty;
  images?: PropertyImage[];
};

// Interface for the root response object
export interface PropertyResponse {
  properties: FullPropertyDetails[];
}