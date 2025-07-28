import React, { useEffect, useRef } from "react";

import { useMapContext } from "@/app/context/MapContext";
import { getImageUrl } from "@/app/utils/getImageUrl";

import Card from "../ui/Card";

export default function Cards() {
  const { placesResults, selectedPlaceId } = useMapContext();

  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selectedPlaceId && cardRefs.current[selectedPlaceId]) {
      cardRefs.current[selectedPlaceId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPlaceId]);

  const cardStyles =
    "max-w-[350px] sm:max-w-[380px] 2xl:max-w-[432px] border-2 shadow-[0px_8px_16px_-1px_#42526E33]";

  return (
    <div className="flex max-h-screen flex-col items-center space-y-4 overflow-y-auto p-4">
      {placesResults?.map((place) => {
        const placeId = place.place_id || place.name;

        return (
          <div
            key={placeId}
            ref={(el) => {
              cardRefs.current[placeId] = el;
            }}
          >
            <Card
              classNames={`${cardStyles} ${
                selectedPlaceId === placeId ? "border" : "border-transparent"
              }`}
              placeId={placeId}
              title={place.name || ""}
              description={place.formatted_address || ""}
              rating={Number(place.rating)}
              imageUrl={getImageUrl(place.photos?.[0]?.photo_reference)}
              imageAlt={place.name || "Photo"}
            />
          </div>
        );
      })}
    </div>
  );
}
