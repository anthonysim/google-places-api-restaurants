"use client";

import { useState, useEffect } from "react";

import CardView from "./components/CardView";
import MapView from "./components/MapView";
import { useMapContext } from "./context/MapContext";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { isShowMapButton } = useMapContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile
  if (isMobile) {
    return isShowMapButton ? (
      <div className="h-screen w-screen bg-gray-100 overflow-y-auto flex justify-center">
        <CardView />
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
        <CardView />
      </div>
      <div className="md:w-3/4">
        <MapView />
      </div>
    </div>
  );
}
