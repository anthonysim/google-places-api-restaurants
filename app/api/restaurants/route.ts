import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { lat, lng, query } = body;

  if (!lat || !lng || !query) {
    return NextResponse.json(
      { error: "Missing lat/lng/query" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const radius = 20;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
