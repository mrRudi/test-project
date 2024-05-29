import {
  API_URL,
  type MarkersGetRequestData,
  type MarkerCreateRequestData,
  type MarkerRemoveRequestData,
  type MarkerPatchRequestData,
} from "./constants";

export async function createMarker(data: MarkerCreateRequestData) {
  const response = await fetch(`${API_URL}/markers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw response;
  const responseData = await response.json();
  return responseData.data;
}

export async function findMarkers(data: MarkersGetRequestData) {
  let params = new URLSearchParams(data).toString();
  const response = await fetch(`${API_URL}/markers?${params}`);
  if (!response.ok) throw response;
  const responseData = await response.json();
  return responseData;
}

export async function removeMarker(data: MarkerRemoveRequestData) {
  const response = await fetch(`${API_URL}/marker/${data}`, {
    method: "DELETE",
  });
  if (!response.ok) throw response;
  const responseData = await response.json();
  return responseData.data;
}

export async function updateMarker({ id, ...data }: MarkerPatchRequestData) {
  const response = await fetch(`${API_URL}/marker/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw response;
  const responseData = await response.json();
  return responseData.data;
}
