import { type MarkerPatchRequestData, useMarkersStore } from "../store";
import { MarkerLineElement } from "./MarkerLineElement";

export function MarkerList() {
  const { markers, deleteMarker, patchMarker, setCentredPoint } =
    useMarkersStore((state) => state);

  return (
    <ul className="flex flex-col space-y-2">
      {markers.map((marker) => {
        return (
          <li key={marker.id}>
            <MarkerLineElement
              id={marker.id}
              description={marker.description}
              deleteHandler={async () => {
                await deleteMarker(marker.id);
              }}
              updateHandler={async (
                data: Omit<MarkerPatchRequestData, "id">,
              ) => {
                await patchMarker({
                  id: marker.id,
                  ...data,
                });
              }}
              centreHandler={() => {
                setCentredPoint([marker.lat, marker.lng]);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
