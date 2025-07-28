export const getImageUrl = (photoReference?: string) => {
  return photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    : "/placeholder-image.svg";
};
