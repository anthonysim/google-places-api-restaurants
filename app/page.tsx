"use client";

import { useEffect } from "react";

import Cards from "./components/Cards";
import MapView from "./components/MapView";
import { useMapContext } from "./context/MapContext";

export default function Home() {
  const { isShowMapButton, setIsShowMapButton, isMobile, setIsMobile } =
    useMapContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsShowMapButton(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsShowMapButton, setIsMobile]);

  // Mobile
  if (isMobile) {
    return isShowMapButton ? (
      <div className="flex h-screen w-screen justify-center overflow-y-auto bg-gray-100">
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
      <div className="flex justify-center overflow-y-auto bg-gray-100 md:w-1/4">
        <Cards />
      </div>
      <div className="md:w-3/4">
        <MapView />
      </div>
    </div>
  );
}
