"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";
import { MarkerList } from "./MarkerList";
import { Pagination } from "./Pagination";
import { AddNewMarker } from "./AddNewMarker";
import { CountMarkers } from "./CountMarkers";

const LazyMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <Spinner
      style={{ height: "400px", width: "600px" }}
      label="Loading..."
      size="lg"
    />
  ),
});

export function MarkersLayout() {
  return (
    <div className="flex gap-5">
      <div className="flex w-[500px] flex-col gap-4">
        <CountMarkers />
        <AddNewMarker />
        <Pagination />
        <MarkerList />
      </div>
      <LazyMap />
    </div>
  );
}
