"use client";

import { useState, useMemo } from "react";
import throttle from "lodash/throttle";
import Image from "next/image";
import SearchBar from "../ui/SearchBar";
import { useMapContext } from "@/app/context/MapContext";

import { fetchRestaurants } from "@/app/utils/fetchRestaurants";

export default function Header() {
  const [userInput, setUserInput] = useState("");
  const { effectiveCenter, setPlacesResults } = useMapContext();

  const throttledUpdate = useMemo(() => {
    return throttle(
      (value: string) => {
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
      1500,
      { leading: false, trailing: true }
    );
  }, [effectiveCenter?.lat, effectiveCenter?.lng, setPlacesResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    throttledUpdate(value);
  };

  return (
    <div className="flex flex-col h-16 mx-auto md:flex-row justify-center items-center px-8 m-4 md:m-0">
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
      <div className="relative w-[353px] h-8 md:ml-auto mt-4 md:mt-0">
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
