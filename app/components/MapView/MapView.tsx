"use client";

import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";

import { useMapContext } from "@/app/context/MapContext";
import { useRemoveInfoWindowPointer } from "@/app/hooks/useRemoveInfoWindowPointer";
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

  const handleIdle = (event: { map: google.maps.Map }) => {
    const mapCenter = event.map.getCenter();
    if (!mapCenter) return;

    const latLng = {
      lat: mapCenter.lat(),
      lng: mapCenter.lng(),
    };

    setEffectiveCenter(latLng);
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
          zoom={12}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!}
          onIdle={handleIdle}
          gestureHandling="greedy"
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
                    lat: lat + 0.01,
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
