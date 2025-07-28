import { Dispatch, SetStateAction } from "react";

import { IPlaceResult } from "../types/types";

export type MapContextType = {
  effectiveCenter: google.maps.LatLngLiteral | null;
  setEffectiveCenter: Dispatch<
    SetStateAction<google.maps.LatLngLiteral | null>
  >;

  isShowMapButton: boolean;
  setIsShowMapButton: Dispatch<SetStateAction<boolean>>;

  placesResults: IPlaceResult[];
  setPlacesResults: Dispatch<SetStateAction<IPlaceResult[]>>;

  selectedPlaceId: string | null;
  setSelectedPlaceId: Dispatch<SetStateAction<string | null>>;
};
