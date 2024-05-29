import { create, StoreApi } from "zustand";
import {
  createMarker,
  findMarkers,
  removeMarker,
  updateMarker,
} from "./asyncActions";
import {
  DEFAULT_CENTERED_POINT,
  type MarkerCreateRequestData,
  type MarkerPatchRequestData,
  type MarkerRemoveRequestData,
  type MarkersGetRequestData,
} from "./constants";
import type { NewMarker, MarkerItem } from "../types";
import type { LatLngExpression } from "leaflet";

interface MarkersState {
  markers: MarkerItem[];
  loading: boolean;
  error: string | null;
  total: number;
  centredPoint: LatLngExpression;
  newMarker: NewMarker | null;
  addMarker: (data: MarkerCreateRequestData) => Promise<void>;
  getMarkers: (data: MarkersGetRequestData) => Promise<void>;
  deleteMarker: (data: MarkerRemoveRequestData) => Promise<void>;
  patchMarker: (data: MarkerPatchRequestData) => Promise<void>;
  setLatLngForNewMarker: (
    point: Pick<MarkerItem, "lat" | "lng"> | null,
  ) => void;
  updateDescriptionForNewMarker: (
    description: MarkerItem["description"],
  ) => void;
  setCentredPoint: (point: LatLngExpression) => void;
}

async function safeFetch(
  set: StoreApi<MarkersState>["setState"],
  fetchMethod: () => Promise<void>,
) {
  set({ loading: true });
  try {
    await fetchMethod();
  } catch (e) {
    let error: string;
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
    }
    set({ error });
  } finally {
    set({ loading: false });
  }
}

function filterUniqueMarkers(
  oldMarkers: MarkerItem[],
  newMarkers: MarkerItem[],
) {
  const oldIds = oldMarkers.map((m) => m.id);
  return newMarkers.filter((m) => !oldIds.includes(m.id));
}

export const useMarkersStore = create<MarkersState>((set) => ({
  markers: [],
  centredPoint: DEFAULT_CENTERED_POINT,
  newMarker: null,
  total: 0,
  loading: false,
  error: null,

  addMarker: async (data: MarkerCreateRequestData) => {
    await safeFetch(set, async () => {
      const marker = await createMarker(data);
      set((state) => ({
        markers: [
          ...state.markers,
          ...filterUniqueMarkers(state.markers, [marker]),
        ],
        total: state.total + 1,
      }));
    });
  },

  getMarkers: async (data: MarkersGetRequestData) => {
    await safeFetch(set, async () => {
      const res = await findMarkers(data);
      set({
        markers: [...res.data],
        total: Number(res.count),
      });
    });
  },

  deleteMarker: async (data: MarkerRemoveRequestData) => {
    await safeFetch(set, async () => {
      await removeMarker(data);
      set((state) => ({
        markers: state.markers.filter((marker) => marker.id !== data),
        total: state.total - 1,
      }));
    });
  },

  patchMarker: async (data: MarkerPatchRequestData) => {
    await safeFetch(set, async () => {
      const updatedMarker = await updateMarker(data);
      set((state) => ({
        markers: state.markers.map((marker) => {
          if (marker.id === data.id) {
            return {
              ...marker,
              ...updatedMarker,
            };
          }
          return marker;
        }),
      }));
    });
  },

  setLatLngForNewMarker: (point: Pick<MarkerItem, "lat" | "lng"> | null) => {
    set((state) => {
      if (point === null) {
        return { newMarker: null };
      }
      const preMapNewMarker =
        state.newMarker === null ? { description: "" } : state.newMarker;
      return {
        newMarker: {
          ...preMapNewMarker,
          ...point,
        },
      };
    });
  },

  updateDescriptionForNewMarker: (description: MarkerItem["description"]) => {
    set((state) => {
      if (state.newMarker === null) {
        return state;
      }
      return {
        newMarker: {
          ...state.newMarker,
          description,
        },
      };
    });
  },

  setCentredPoint: (point: LatLngExpression) => {
    set({
      centredPoint: point,
    });
  },
}));
