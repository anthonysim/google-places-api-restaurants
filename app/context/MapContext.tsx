import { createContext, useContext, useState, ReactNode } from "react";

import type { MapContextType } from "./MapContext.types";

export const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [effectiveCenter, setEffectiveCenter] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isShowMapButton, setIsShowMapButton] = useState<boolean>(false);
  const [placesResults, setPlacesResults] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <MapContext.Provider
      value={{
        effectiveCenter,
        setEffectiveCenter,
        isShowMapButton,
        setIsShowMapButton,
        placesResults,
        setPlacesResults,
        selectedPlaceId,
        setSelectedPlaceId,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context)
    throw new Error("useMapContext must be used within a MapProvider");
  return context;
}
