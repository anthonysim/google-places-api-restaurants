import { AdvancedMarker } from "@vis.gl/react-google-maps";

import { IMarkersProps } from "@/app/types/types";

export function Markers({ places, onClick }: IMarkersProps) {
  return places.map((place) => {
    const loc = place.geometry?.location;
    if (!loc) return null;

    const lat = typeof loc.lat === "function" ? loc.lat() : loc.lat;
    const lng = typeof loc.lng === "function" ? loc.lng() : loc.lng;

    return (
      <AdvancedMarker
        key={place.place_id}
        position={{ lat, lng }}
        title={place.name}
        onClick={() => onClick(place?.place_id)}
      />
    );
  });
}
