"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import { useMarkersStore } from "@/store";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";

const MapEventsHandler = ({
  handleMapClick,
}: {
  handleMapClick: (e: LeafletMouseEvent) => void;
}) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

function SetViewOnClick({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default function Map() {
  const { centredPoint, markers, setLatLngForNewMarker, newMarker } =
    useMarkersStore();

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setLatLngForNewMarker({
      lat,
      lng,
    });
  };

  return (
    <MapContainer
      preferCanvas={true}
      center={centredPoint}
      zoom={11}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SetViewOnClick coords={centredPoint} />
      <MapEventsHandler handleMapClick={handleMapClick} />
      {newMarker ? (
        <Marker position={[newMarker.lat, newMarker.lng]}>
          <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
            {newMarker.description}
          </Tooltip>
        </Marker>
      ) : null}
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
            {marker.description}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
