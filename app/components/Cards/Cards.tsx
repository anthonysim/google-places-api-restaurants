import React from "react";

import { useMapContext } from "@/app/context/MapContext";

import Card from "../ui/Card";

export default function Cards() {
  const { placesResults } = useMapContext();

  if (!placesResults.length) return null;

  const getImageUrl = (photoReference?: string) => {
    return photoReference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      : "/placeholder-image.svg";
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {placesResults.map((place) => (
        <Card
          key={place.place_id || place.name}
          placeId={place.place_id || place.name}
          title={place.name || ""}
          description={place.formatted_address || ""}
          rating={Number(place.rating)}
          imageUrl={getImageUrl(place.photos?.[0]?.photo_reference)}
          imageAlt={place.name || "Photo"}
          classNames="w-full max-w-[432px] border-transparent border-2 shadow-[0px_8px_16px_-1px_#42526E33]"
        />
      ))}
    </div>
  );
}
