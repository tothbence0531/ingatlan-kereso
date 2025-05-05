export interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  location: string;
  description: string;
  roomCount: number;
  images: string[];
  created_at: string; // TODO: implement created_at
}
