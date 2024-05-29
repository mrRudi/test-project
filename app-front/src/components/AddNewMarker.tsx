"use client";

import { Input } from "@nextui-org/react";
import { CheckIcon, CloseIcon, IconButton, MyLocationIcon } from "./shared";
import { useMarkersStore } from "@/store";

export function AddNewMarker({}) {
  const {
    newMarker,
    addMarker,
    setLatLngForNewMarker,
    updateDescriptionForNewMarker,
    setCentredPoint,
  } = useMarkersStore();

  return (
    <>
      {newMarker ? (
        <div className="flex justify-start gap-2">
          <IconButton
            onClick={() => setCentredPoint([newMarker.lat, newMarker.lng])}
          >
            <MyLocationIcon />
          </IconButton>
          <Input
            className="w-fit"
            label="New marker"
            placeholder="marker name"
            value={newMarker.description}
            onChange={(e) => {
              updateDescriptionForNewMarker(e.target.value);
            }}
            labelPlacement="outside-left"
          />
          <IconButton
            onClick={async () => {
              if (newMarker !== null) {
                await addMarker(newMarker);
                setLatLngForNewMarker(null);
              }
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setLatLngForNewMarker(null);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  );
}
