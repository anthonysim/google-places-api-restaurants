export function adjustLatByZoom(lat: number, zoom: number): number {
  const baseOffset = 0.001;
  const referenceZoom = 15;
  const scale = Math.pow(2, referenceZoom - zoom);
  return lat + baseOffset * scale;
}
