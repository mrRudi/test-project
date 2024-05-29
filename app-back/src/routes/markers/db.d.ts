import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface PublicMarkers {
  date_created: Timestamp | null;
  date_updated: Timestamp | null;
  description: string | null;
  id: Generated<number>;
  lat: number | null;
  lng: number | null;
  user_created: string | null;
  user_updated: string | null;
}

export interface DB {
  "public.markers": PublicMarkers;
}
