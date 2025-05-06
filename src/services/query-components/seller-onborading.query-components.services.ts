import { paths } from "@/types/api-schema";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import {
  getSellerOnboarding,
  sellerFileUpload,
  sellerOnboardingContactDetails,
  sellerOnboardingGeneralInfo,
  sellerOnboardingProductDetails,
  sellerOnboardingReachDetails,
  sellerOnboardingCertificatehDetailsOne,
  sellerOnboardingCertificatehDetailsSecond,
  sellerOnboardingLocationhDetailsSave,
  sellerOnboardingLocationhDetailsDelete,
  sellerOnboardingLastSave,
  sellerOnboardingCompanyVerificationDocSave,
  getSellerOnboardingForAdmin,
  getSellerStatus,
} from "../api-functions/seller-onborading.api-function.services";
import { sellerQueryKeys } from "@/constants/query-keys/seller.query-keys.constants";

export const UseGetSellerOnboardingForAdmin = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.getSellerOnboardingForAdmin],
    mutationFn: (
      id: paths["/v1/admin/inquiries/seller/onboarding/get"]["get"]["parameters"]["query"]["id"],
    ) => getSellerOnboardingForAdmin(id),
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

export const UseGetSellerOnboarding = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.getSellerOnboarding],
    mutationFn: (
      userId: paths["/v1/seller/onboarding/get"]["get"]["parameters"]["query"]["userId"],
    ) => getSellerOnboarding(userId),
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

export const UseGetSellerStatus = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.getSellerStatus],
    mutationFn: (
      userId: paths["/v1/seller/onboarding/get/status"]["get"]["parameters"]["query"]["userId"],
    ) => getSellerStatus(userId),
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

export const UseSaveSellerGeneralInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingGeneralInfo],
    mutationFn: (
      data: paths["/v1/seller/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
    ) => sellerOnboardingGeneralInfo(data),
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

export const UseSaveSellerContactInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingContactDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/contact-details/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingContactDetails(values),
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

export const UseSellerFileUpload = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerFileUpload],
    mutationFn: (values: {
      data: { file: File };
      type: paths["/v1/seller/onboarding/file/upload"]["post"]["parameters"]["query"]["type"];
    }) => sellerFileUpload(values),
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

export const UseSaveSellerProductDetails = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingProductDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/product-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/product-details/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingProductDetails(values),
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

export const UseSaveSellerReachDetails = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingProductDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/reach-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/reach-details/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingReachDetails(values),
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

export const UseSaveSellerCertificatehDetailsOne = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingProductDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingCertificatehDetailsOne(values),
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

export const UseSaveSellerCertificatehDetailsSecond = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingProductDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/document-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/document-details/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingCertificatehDetailsSecond(values),
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

export const UseSaveSellerLocationhDetails = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingProductDetails],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/location-details/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/location-details/save"]["post"]["parameters"]["query"]["id"];
      LocationType: paths["/v1/seller/onboarding/location-details/save"]["post"]["parameters"]["query"]["type"];
    }) => sellerOnboardingLocationhDetailsSave(values),
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

export const UsesellerOnboardingLocationDetailsDelete = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationFn: (
      id: paths["/v1/seller/onboarding/location-details/delete"]["delete"]["parameters"]["query"]["id"],
    ) => sellerOnboardingLocationhDetailsDelete({ id }),

    onSuccess: (data, variables, context) => {
      successCallback(data.data);
      showSuccessToastMessage(data.message);
    },

    onError: (error, variables, context) => {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingFinalSave = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationFn: (
      id: paths["/v1/seller/onboarding/save"]["post"]["parameters"]["query"]["id"],
    ) => sellerOnboardingLastSave({ id }),
    onSuccess: (data, variables, context) => {
      successCallback(data.data);
      showSuccessToastMessage(data.message);
    },

    onError: (error, variables, context) => {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseSaveSellerCompanyVerificationDocs = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [sellerQueryKeys.sellerOnboardingCompanyVerificationDocSave],
    mutationFn: (values: {
      data: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["requestBody"]["content"]["application/json"];
      id: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["parameters"]["query"]["id"];
    }) => sellerOnboardingCompanyVerificationDocSave(values),
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
