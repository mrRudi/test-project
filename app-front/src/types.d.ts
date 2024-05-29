export interface MarkerItem {
  id: number;
  description: string;
  lat: number;
  lng: number;
  createdAt?: string;
  updatedAt?: string;
}

export type NewMarker = Pick<MarkerItem, "description" | "lat" | "lng">;
