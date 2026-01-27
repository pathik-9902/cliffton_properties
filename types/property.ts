// --- Custom Database Enums ---
// These correspond to the custom types seen in your schema (e.g., listing_type)

export type PropertyCategory = 'residential' | 'commercial' | 'land';
export type ListingType = 'rent' | 'sale';
export type FurnishingType = 'unfurnished' | 'semi-furnished' | 'fully-furnished';

// --- Table Interfaces ---

export interface Property {
  id: string; // uuid
  property_code?: string;
  category: PropertyCategory;
  listing_type: ListingType;
  status: string;
  is_featured: boolean;
  title: string;
  description?: string;
  possession_date?: string; // date
  city: string;
  area?: string; 
  price: number;
  price_unit: string;
  maintenance_charges?: number;
  built_up_area: number;
  area_unit: string;
  created_at: string;
  updated_at: string;
}

export interface ResidentialProperty {
  property_id: string; // FK to properties.id
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
  property_id: string; // FK to properties.id
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
  property_id: string; // FK to properties.id
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
  property_id: string; // FK to properties.id
  image_url: string;
  sort_order: number;
}

// --- Helper Type for Joined Data ---
// Useful when fetching a property with its specific subtype and images
export type FullPropertyDetails = Property & {
  residential?: ResidentialProperty;
  commercial?: CommercialProperty;
  land?: LandProperty;
  images?: PropertyImage[];
};