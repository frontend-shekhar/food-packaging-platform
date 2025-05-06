import { paths } from "@/types/api-schema";
import { useMutation } from "@tanstack/react-query";
import { buyerQueryKeys } from "@/constants/query-keys/buyer.query-keys.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import {
  buyerFileUpload,
  getBuyerOnboarding,
  getBuyerOnboardingForAdmin,
  saveBuyerCertificates,
  saveBuyerContactInfo,
  saveBuyerFinancialInfo,
  saveBuyerGeneralInfo,
  saveBuyerMembershipPlan,
  saveBuyerOnboardingInfo,
} from "../api-functions/buyer.api-functions.services";

export const UseSaveBuyerGeneralInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerGeneralInfo],
    mutationFn: (
      data: paths["/v1/buyer/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
    ) => saveBuyerGeneralInfo(data),
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

export const UseSaveBuyerContactInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerContactInfo],
    mutationFn: (values: {
      data: paths["/v1/buyer/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/buyer/onboarding/contact-details/save"]["post"]["parameters"]["query"]["id"];
    }) => saveBuyerContactInfo(values),
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

export const UseSaveBuyerCertificates = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerCertificates],
    mutationFn: (values: {
      data: paths["/v1/buyer/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/buyer/onboarding/certificate-details/save"]["post"]["parameters"]["query"]["id"];
    }) => saveBuyerCertificates(values),
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

export const UseSaveBuyerFinancialInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerContactInfo],
    mutationFn: (values: {
      data: paths["/v1/buyer/onboarding/financial-info/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/buyer/onboarding/financial-info/save"]["post"]["parameters"]["query"]["id"];
    }) => saveBuyerFinancialInfo(values),
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

export const UseSaveBuyerMembershipPlan = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerMembershipPlan],
    mutationFn: (
      queryParams: paths["/v1/buyer/onboarding/membership-plan/save"]["post"]["parameters"]["query"],
    ) => saveBuyerMembershipPlan(queryParams),
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

export const UseBuyerFileUpload = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.buyerFileUpload],
    mutationFn: (values: {
      data: { file: File };
      type: paths["/v1/buyer/onboarding/file/upload"]["post"]["parameters"]["query"]["type"];
    }) => buyerFileUpload(values),
    onSuccess(data: any, variables, context) {
      successCallback(data);
      showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetBuyerOnboardingForAdmin = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.getBuyerOnboarding],
    mutationFn: (
      id: paths["/v1/admin/inquiries/buyer/onboarding/get"]["get"]["parameters"]["query"]["id"],
    ) => getBuyerOnboardingForAdmin(id),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      // showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetBuyerOnboarding = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.getBuyerOnboarding],
    mutationFn: (
      userId: paths["/v1/buyer/onboarding/get"]["get"]["parameters"]["query"]["userId"],
    ) => getBuyerOnboarding(userId),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      // showErrorToastMessage(error?.message);
    },
  });
};

export const UseSaveBuyerOnboardingInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [buyerQueryKeys.saveBuyerOnboardingInfo],
    mutationFn: (
      id: paths["/v1/buyer/onboarding/save"]["post"]["parameters"]["query"]["id"],
    ) => saveBuyerOnboardingInfo(id),
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
