interface fetchDataBody {
  query: string;
  lat: number | undefined;
  lng: number | undefined;
}

export const fetchRestaurants = async (body: fetchDataBody) => {
  try {
    const res = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};
