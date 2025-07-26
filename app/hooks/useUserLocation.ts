import { useEffect, useState } from "react";

export function useUserLocation(defaultLocation = { lat: 22.54992, lng: 0 }) {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation(defaultLocation)
      );
    } else {
      setLocation(defaultLocation);
    }
  }, [defaultLocation]);

  return location;
}
