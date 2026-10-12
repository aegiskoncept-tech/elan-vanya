export type ResortStatus = 'open' | 'coming-soon';

export type GalleryCategory = 'cottages' | 'dining' | 'landscape';

export interface LocationInfo {
  area: string;
  district: string;
  state: string;
  region: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  featured?: boolean;
}

export interface RatePlan {
  id: string;
  name: string;
  includes: string[];
  nightlyRate: number;
  currency: 'INR';
  sample: boolean;
}

export interface Room {
  id: string;
  resortId: string;
  name: string;
  description: string;
  images: string[];
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
  bed: string;
  sizeSqft: number | null;
  amenities: string[];
  plans: RatePlan[];
}

export interface Faq {
  q: string;
  a: string;
  verified: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  description?: string;
  verified: boolean;
}

export interface Experience {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tag?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  stayDate: string;
  sample: boolean;
}

export interface Resort {
  id: string;
  slug: string;
  status: ResortStatus;
  featured?: boolean;
  name: string;
  shortName: string;
  location: LocationInfo;
  address: string | null;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  highlights: string[];
  heroImage: string | null;
  cardImage: string | null;
  gallery: GalleryItem[];
  amenities: string[];
  experiences: string[];
  rooms: Room[];
  faqs: Faq[];
  placeholder?: boolean;
}
