// "use client";

// import { useState } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
// import { useMapContext } from "@/app/context/MapContext";
// import Card from "../ui/Card";

// export default function MapView() {
//   const [center, setCenter] = useState<google.maps.LatLngLiteral>({
//     lat: 47.674,
//     lng: -122.1215,
//   });

//   const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
//   const { setEffectiveCenter, placesResults } = useMapContext();

//   const handleIdle = (event: { map: google.maps.Map }) => {
//     const mapCenter = event.map.getCenter();
//     if (!mapCenter) return;

//     const latLng = {
//       lat: mapCenter.lat(),
//       lng: mapCenter.lng(),
//     };

//     setCenter(latLng);
//     setEffectiveCenter(latLng);
//   };

//   const selectedPlace = placesResults.find(
//     (place) => place.place_id === selectedPlaceId
//   );

//   return (
//     <div className="w-full h-full relative z-0">
//       <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//         <Map
//           defaultCenter={center}
//           zoom={12}
//           mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!}
//           onIdle={handleIdle}
//           gestureHandling="greedy"
//           scrollwheel={true}
//           disableDefaultUI={false}
//           style={{ width: "100%", height: "100%" }}
//         >
//           {/* Marker for current center */}
//           <AdvancedMarker position={center} />

//           {/* Markers for places */}
//           {placesResults.map((place) => {
//             const loc = place.geometry?.location;
//             if (!loc) return null;

//             const lat = typeof loc.lat === "function" ? loc.lat() : loc.lat;
//             const lng = typeof loc.lng === "function" ? loc.lng() : loc.lng;

//             return (
//               <AdvancedMarker
//                 key={place.place_id}
//                 position={{ lat, lng }}
//                 title={place.name}
//                 onClick={() => setSelectedPlaceId(place.place_id ?? null)}
//               />
//             );
//           })}

//           {/* InfoWindow with your custom Card */}
//           {selectedPlace &&
//             selectedPlace.geometry?.location &&
//             (() => {
//               const rawLat = selectedPlace.geometry.location.lat;
//               const rawLng = selectedPlace.geometry.location.lng;
//               const lat = typeof rawLat === "function" ? rawLat() : rawLat;
//               const lng = typeof rawLng === "function" ? rawLng() : rawLng;

//               return (
//                 <InfoWindow
//                   position={{
//                     lat: lat + 0.01,
//                     lng: lng,
//                   }}
//                   onCloseClick={() => setSelectedPlaceId(null)}
//                 >
//                   <div>
//                     <Card
//                       title={selectedPlace.name || "Unknown"}
//                       description={
//                         selectedPlace.formatted_address ||
//                         "No address available"
//                       }
//                       rating={Number(selectedPlace.rating)}
//                       imageUrl="/placeholder-image.svg"
//                     />
//                   </div>
//                 </InfoWindow>
//               );
//             })()}
//         </Map>
//       </APIProvider>
//     </div>
//   );
// }
