import { paths } from "@/types/api-schema";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { adminUsersQueryKeys } from "@/constants/query-keys/admin.query-keys.constans";
import {
  exportAdminBuyerList,
  exportAdminSellerList,
  getAdminBuyerInfo,
  getAdminBuyerList,
  getAdminSellerList,
  putAdminBuyerActions,
  putAdminSellerActions,
} from "../api-functions/admin-users.api-functions";

export const UseGetAdminBuyerList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.getAdminBuyerList],
    mutationFn: (
      query: paths["/v1/admin/inquiries/buyer/onboarding/list"]["get"]["parameters"]["query"],
    ) => getAdminBuyerList(query),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseExportAdminBuyerList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.getAdminBuyerList],
    mutationFn: (
      query: paths["/v1/admin/inquiries/buyer/onboarding/list"]["get"]["parameters"]["query"],
    ) => exportAdminBuyerList(query),
    onSuccess(data, variables, context) {
      successCallback(data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseExportAdminSellerList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.getAdminSellerList],
    mutationFn: (
      query: paths["/v1/admin/inquiries/seller/onboarding/list"]["get"]["parameters"]["query"],
    ) => exportAdminSellerList(query),
    onSuccess(data, variables, context) {
      successCallback(data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseAdminBuyerActions = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.putAdminBuyerActions],
    mutationFn: (values: {
      id: paths["/v1/admin/inquiries/buyer/onboarding/action"]["put"]["parameters"]["query"]["id"];
      type: "markAsRedFlag" | "unMarkAsRedFlag";
    }) => putAdminBuyerActions(values),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetAdminBuyerInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.getAdminBuyerInfo],
    mutationFn: (
      id: paths["/v1/admin/inquiries/buyer/onboarding/get"]["get"]["parameters"]["query"]["id"],
    ) => getAdminBuyerInfo(id),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetAdminSellerList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.getAdminSellerList],
    mutationFn: (
      query: paths["/v1/admin/inquiries/seller/onboarding/list"]["get"]["parameters"]["query"],
    ) => getAdminSellerList(query),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseAdminSellerActions = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminUsersQueryKeys.putAdminBuyerActions],
    mutationFn: (values: {
      id: paths["/v1/admin/inquiries/seller/onboarding/action"]["put"]["parameters"]["query"]["id"];
      type: "markAsRedFlag" | "unMarkAsRedFlag" | "APPROVED" | "REJECTED";
    }) => putAdminSellerActions(values),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};
