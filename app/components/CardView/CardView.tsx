import React from "react";

import { useMapContext } from "@/app/context/MapContext";

import Card from "../ui/Card";

export default function CardView() {
  const { placesResults } = useMapContext();

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {placesResults.length > 0 &&
        placesResults.map((item) => (
          <Card
            key={item.place_id || item.name}
            placeId={item.place_id || item.name}
            title={item.name || ""}
            description={item.formatted_address || ""}
            rating={Number(item.rating)}
            imageUrl={
              item.photos?.[0]?.photo_reference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos?.[0].photo_reference}&key=${process.env.NEXT_PUBLIC_API_KEY}`
                : "/placeholder-image.svg"
            }
            imageAlt={item.name || "Photo"}
            classNames="w-full max-w-[432px] border-transparent border-2 shadow-[0px_8px_16px_-1px_#42526E33]"
          />
        ))}
    </div>
  );
}
