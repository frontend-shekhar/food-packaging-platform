import { useMutation } from "@tanstack/react-query";
import { showErrorToastMessage } from "@/utils/toast.utils";
import { mapsQueryKeys } from "@/constants/query-keys/maps.query-keys.constants";
import {
  getGoogleLocation,
  getGooglePlace,
} from "../api-functions/maps.api-functions.services";

export const UseGetGoogleLocation = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [mapsQueryKeys.getLocation],
    mutationFn: (values: { place: string }) => getGoogleLocation(values),
    onSuccess(data, variables, context) {
      successCallback(data.predictions);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      //   showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetGooglePlace = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [mapsQueryKeys.getPlace],
    mutationFn: (values: { placeId: string }) => getGooglePlace(values),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      //   showErrorToastMessage(error?.message);
    },
  });
};
