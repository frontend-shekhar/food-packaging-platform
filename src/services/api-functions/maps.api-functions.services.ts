import CustomError from "@/utils/CustomErrorClass";

export const getGoogleLocation = async ({ place }: { place: string }) => {
  let res = await fetch(`/api/autocomplete?query=${place}`);
  let response = await res.json();

  if (res.status !== 200) {
    throw new CustomError(response.message, response.code);
  }

  return response;
};

export const getGooglePlace = async ({ placeId }: { placeId: string }) => {
  let res = await fetch(`/api/place?id=${placeId}`);
  let response = await res.json();

  if (res.status !== 200) {
    throw new CustomError(response.message, response.code);
  }

  return response;
};
