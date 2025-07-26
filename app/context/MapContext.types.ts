interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating: number;
  geometry?: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  photos?: Photo[];
}

export type MapContextType = {
  effectiveCenter: google.maps.LatLngLiteral | null;
  setEffectiveCenter: (center: google.maps.LatLngLiteral) => void;

  isShowMapButton: boolean;
  setIsShowMapButton: (show: boolean) => void;

  placesResults: PlaceResult[];
  setPlacesResults: (places: PlaceResult[]) => void;
};
