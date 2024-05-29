import { useMarkersStore } from "@/store";

export function CountMarkers() {
  const { total } = useMarkersStore();
  return <>{total ? <p>Count of markers: {total}</p> : null}</>;
}
