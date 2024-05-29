import type { MarkerItem } from "@/types";
import type { LatLngExpression } from "leaflet";

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

if (API_DOMAIN === undefined) {
  throw Error("missing env variable for API_DOMAIN");
}

export const API_URL = `${API_DOMAIN}/api`;

export interface MarkerCreateRequestData
  extends Pick<MarkerItem, "description" | "lat" | "lng"> {}
export interface MarkersGetRequestData extends Record<string, string> {}
export type MarkerRemoveRequestData = MarkerItem["id"];
export interface MarkerPatchRequestData
  extends Partial<Pick<MarkerItem, "description" | "lat" | "lng">> {
  id: MarkerItem["id"];
}

export const DEFAULT_CENTERED_POINT: LatLngExpression = [49.0, 24.0];
