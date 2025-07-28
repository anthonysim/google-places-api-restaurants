"use client";

import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

import { useMapContext } from "@/app/context/MapContext";
import { useRemoveInfoWindowPointer } from "@/app/hooks/useRemoveInfoWindowPointer";
import { adjustLatByZoom } from "@/app/utils/adjustLayByZoom";
import { getImageUrl } from "@/app/utils/getImageUrl";

import { Markers } from "./Markers";
import Card from "../ui/Card";

export default function MapView() {
  useRemoveInfoWindowPointer();

  const {
    selectedPlaceId,
    setSelectedPlaceId,
    setEffectiveCenter,
    placesResults,
  } = useMapContext();

  const [zoomLevel, setZoomLevel] = useState<number>(15);

  const handleIdle = (event: { map: google.maps.Map }) => {
    const map = event.map;
    const mapCenter = map.getCenter();
    const zoom = map.getZoom();

    if (!mapCenter || zoom === undefined) return;

    const latLng = {
      lat: mapCenter.lat(),
      lng: mapCenter.lng(),
    };

    setEffectiveCenter(latLng);
    setZoomLevel(zoom);
  };

  const selectedPlace = placesResults?.find(
    (place) => place.place_id === selectedPlaceId,
  );

  return (
    <div className="relative z-0 h-full w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY!}>
        <Map
          defaultCenter={{
            lat: 47.674,
            lng: -122.1215,
          }}
          defaultZoom={12}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!}
          onIdle={handleIdle}
          gestureHandling="auto"
          scrollwheel={true}
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
          onClick={() => setSelectedPlaceId(null)}
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
                  className="border-transparent"
                  position={{
                    lat: adjustLatByZoom(lat, zoomLevel),
                    lng: lng,
                  }}
                  onCloseClick={() => setSelectedPlaceId(null)}
                >
                  <div className="border-transparent">
                    <Card
                      title={selectedPlace.name || "Unknown"}
                      placeId={selectedPlace.place_id || selectedPlace.name}
                      description={
                        selectedPlace.formatted_address ||
                        "No address available"
                      }
                      rating={Number(selectedPlace.rating)}
                      imageUrl={getImageUrl(
                        selectedPlace.photos?.[0]?.photo_reference,
                      )}
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
