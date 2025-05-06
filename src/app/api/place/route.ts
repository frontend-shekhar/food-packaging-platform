export const fetchCache = "force-no-store";

type AddressData = {
  name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};

function extractAddress(place: any): AddressData {
  const addressData: { [key: string]: string } = {};

  place.address_components.forEach((component: any) => {
    const types = component.types;

    if (types.includes("street_number")) {
      addressData["street_number"] = component.long_name;
    }
    if (types.includes("route")) {
      addressData["street_name"] = component.long_name;
    }
    if (types.includes("sublocality_level_1")) {
      addressData["sublocality_level_1"] = component.long_name;
    }
    if (types.includes("sublocality_level_2")) {
      addressData["sublocality_level_2"] = component.long_name;
    }
    if (types.includes("sublocality_level_3")) {
      addressData["sublocality_level_3"] = component.long_name;
    }
    if (types.includes("locality")) {
      addressData["city"] = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      addressData["state"] = component.long_name;
    }
    if (types.includes("postal_code")) {
      addressData["zip_code"] = component.long_name;
    }
    if (types.includes("country")) {
      addressData["country"] = component.long_name;
    }
  });

  return {
    name: place.name || "",
    street_address:
      `${addressData["street_number"] || ""} ${addressData["street_name"] || ""} ${addressData["sublocality_level_3"] || ""} ${addressData["sublocality_level_2"] || ""} ${addressData["sublocality_level_1"] || ""}`.trim(),
    city: addressData["city"] || "",
    state: addressData["state"] || "",
    zip_code: addressData["zip_code"] || "",
    country: addressData["country"] || "",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL}/details/json?place_id=${id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );
  const data = await res.json();
  const filteredData = extractAddress(data.result);

  return Response.json({ data: filteredData, status: data.status });
}
