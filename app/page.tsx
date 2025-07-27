"use client";

import { useState, useEffect } from "react";

import Cards from "./components/Cards";
import MapView from "./components/MapView";
import { useMapContext } from "./context/MapContext";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { isShowMapButton, setIsShowMapButton } = useMapContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsShowMapButton(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsShowMapButton]);

  // Mobile
  if (isMobile) {
    return isShowMapButton ? (
      <div className="h-screen w-screen bg-gray-100 overflow-y-auto flex justify-center">
        <Cards />
      </div>
    ) : (
      <div className="h-screen w-screen">
        <MapView />
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex h-screen overflow-hidden">
      <div className=" md:w-1/4 bg-gray-100 overflow-y-auto flex justify-center">
        <Cards />
      </div>
      <div className="md:w-3/4">
        <MapView />
      </div>
    </div>
  );
}
