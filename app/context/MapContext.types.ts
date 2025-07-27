import { IPlaceResult } from "../types/types";

export type MapContextType = {
  effectiveCenter: google.maps.LatLngLiteral | null;
  setEffectiveCenter: (center: google.maps.LatLngLiteral) => void;

  isShowMapButton: boolean;
  setIsShowMapButton: (show: boolean) => void;

  placesResults: IPlaceResult[];
  setPlacesResults: (places: IPlaceResult[]) => void;
};
