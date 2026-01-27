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
  price_unit: string;
  maintenance_charges: number;
  built_up_area: number;
  area_unit: string;
  created_at: string;
  updated_at: string;
}

export interface ResidentialProperty {
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing_type: FurnishingType;
  floor_number: number;
  total_floors: number;
  parking_spaces: number;
  lift: boolean;
  property_age: number;
}

export interface CommercialProperty {
  commercial_subtype: string;
  floor_number: number;
  total_floors: number;
  washrooms: number;
  pantry: boolean;
  meeting_rooms: number;
  central_air_conditioning: boolean;
  passenger_lift: boolean;
  service_lift: boolean;
  frontage_width?: number;
}

export interface LandProperty {
  plot_area: number;
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
  residential?: ResidentialProperty;
  commercial?: CommercialProperty;
  land?: LandProperty;
  images?: PropertyImage[];
};
