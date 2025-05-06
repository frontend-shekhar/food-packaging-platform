type PlaceResult = {
  description: string;
  place_id: string;
};

type GooglePlacesResponse = {
  predictions: PlaceResult[];
  status: string;
};

export const fetchCache = "force-no-store";

const extractPredictionsData = (data: GooglePlacesResponse): PlaceResult[] => {
  return data.predictions.map(({ description, place_id }) => ({
    description,
    place_id,
  }));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL}/autocomplete/json?input=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );
  const data = await res.json();
  let filteredData = extractPredictionsData(data);

  return Response.json({ predictions: filteredData, status: data.status });
}
