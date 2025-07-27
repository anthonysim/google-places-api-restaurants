export interface IPhoto {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

export interface IPlaceResult {
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
  photos?: IPhoto[];
}

export interface IMarkersProps {
  places: IPlaceResult[];
  onClick: (placeId: string | null) => void;
}
