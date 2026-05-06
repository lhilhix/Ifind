export interface Place {
  id: string;
  name: string;
  category: 'food' | 'cafe' | 'culture' | 'nature' | 'viewpoint';
  rating: number;
  distance: string;
  image: string;
  tags: string[];
  description: string;
  location: { lat: number; lng: number };
  highlights?: string[];
  gallery?: string[];
}
