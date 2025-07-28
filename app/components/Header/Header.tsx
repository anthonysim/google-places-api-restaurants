"use client";

import throttle from "lodash/throttle";
import Image from "next/image";
import { useState, useMemo } from "react";

import { useMapContext } from "@/app/context/MapContext";
import { fetchRestaurants } from "@/app/utils/fetchRestaurants";

import SearchBar from "../ui/SearchBar";

export default function Header() {
  const [userInput, setUserInput] = useState("");
  const { effectiveCenter, setPlacesResults } = useMapContext();

  const throttledUpdate = useMemo(() => {
    return throttle(
      (value: string) => {
        if (value === "") return;
        if (effectiveCenter?.lat && effectiveCenter?.lng) {
          const request = {
            query: value,
            lat: effectiveCenter.lat,
            lng: effectiveCenter.lng,
          };

          (async () => {
            const res = await fetchRestaurants(request);
            setPlacesResults(res);
          })();
        }
      },
      1250,
      { leading: false, trailing: true },
    );
  }, [effectiveCenter?.lat, effectiveCenter?.lng, setPlacesResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    console.log(value);
    throttledUpdate(value);
  };

  return (
    <div className="sticky top-0 z-50 m-4 mx-auto flex h-16 flex-col items-center justify-center bg-white px-8 shadow md:m-0 md:flex-row">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <Image
          src="/logo.svg"
          alt="AllTrails at Lunch"
          title="AllTrails at Lunch"
          width={234}
          height={24}
          priority
        />
      </div>

      {/* Search input on the right */}
      <div className="relative mt-4 h-8 w-[353px] md:mt-0 md:ml-auto">
        <SearchBar
          iconTitle="/search.svg"
          iconAlt="search icon"
          placeholder="Search restaurant"
          name="search-restaurant"
          classNames="pl-9"
          value={userInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
