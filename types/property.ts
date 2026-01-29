export type PropertyCategory = 'residential' | 'commercial' | 'land';
export type ListingType = 'rent' | 'sale';
export type FurnishingType =
  | 'unfurnished'
  | 'semi-furnished'
  | 'fully-furnished';

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
  views_count?: number;
  enquiries_count?: number;
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
  parking_spaces: number;
  lift: boolean;
  property_age: number;
  carpet_area: number;
  amenity?: string;
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
  image_url: string;
  sort_order: number;
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