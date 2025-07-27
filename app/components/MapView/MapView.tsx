"use client";

import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

import { useMapContext } from "@/app/context/MapContext";
import { useRemoveInfoWindowPointer } from "@/app/hooks/useRemoveInfoWindowPointer";

import { Markers } from "./Markers";
import Card from "../ui/Card";

export default function MapView() {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 47.674,
    lng: -122.1215,
  });

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  useRemoveInfoWindowPointer();

  const { setEffectiveCenter, placesResults } = useMapContext();

  const handleIdle = (event: { map: google.maps.Map }) => {
    const mapCenter = event.map.getCenter();
    if (!mapCenter) return;

    const latLng = {
      lat: mapCenter.lat(),
      lng: mapCenter.lng(),
    };

    setCenter(latLng);
    setEffectiveCenter(latLng);
  };

  const selectedPlace = placesResults.find(
    (place) => place.place_id === selectedPlaceId
  );

  return (
    <div className="w-full h-full relative z-0">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY!}>
        <Map
          defaultCenter={center}
          zoom={12}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!}
          onIdle={handleIdle}
          gestureHandling="greedy"
          scrollwheel={true}
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Markers for places */}
          {<Markers places={placesResults} onClick={setSelectedPlaceId} />}

          {/* InfoWindow with your custom Card */}
          {selectedPlace &&
            selectedPlace.geometry?.location &&
            (() => {
              const rawLat = selectedPlace.geometry.location.lat;
              const rawLng = selectedPlace.geometry.location.lng;
              const lat = typeof rawLat === "function" ? rawLat() : rawLat;
              const lng = typeof rawLng === "function" ? rawLng() : rawLng;

              return (
                <InfoWindow
                  position={{
                    lat: lat + 0.01,
                    lng: lng,
                  }}
                  onCloseClick={() => setSelectedPlaceId(null)}
                >
                  <div>
                    <Card
                      title={selectedPlace.name || "Unknown"}
                      placeId={selectedPlace.place_id || selectedPlace.name}
                      description={
                        selectedPlace.formatted_address ||
                        "No address available"
                      }
                      rating={Number(selectedPlace.rating)}
                      imageUrl={
                        selectedPlace.photos?.[0]?.photo_reference
                          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedPlace.photos?.[0].photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`
                          : "/placeholder-image.svg"
                      }
                    />
                  </div>
                </InfoWindow>
              );
            })()}
        </Map>
      </APIProvider>
    </div>
  );
}
