import { useMutation } from "@tanstack/react-query";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { paths } from "@/types/api-schema";
import {
  OnboardingFileUpload,
  sellerOnboardingCertificatehCompanyVerificationDocumentList,
  sellerOnboardingCertificatehDetailsOne,
  sellerOnboardingCertificatehDetailsSecond,
  sellerOnboardingContactDetails,
  sellerOnboardingGeneralInfo,
  sellerOnboardingGetInformation,
  sellerOnboardingLastSave,
  sellerOnboardingLocationhDetailsDelete,
  sellerOnboardingLocationhDetailsSave,
  sellerOnboardingProductDetails,
  sellerOnboardingReachDetails,
} from "../api-functions/sellerOnboarding.api-function.services";
import { string } from "yup";
import client from "@/lib/fetch";
import { useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "companyId";

export const UseSellerOnboardingGeneralInfo = (
  onStepChange?: (step: number) => void,
) => {
  return useMutation({
    mutationFn: (
      sellerOnboardingGeneralInfoData: paths["/v1/seller/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
    ) => sellerOnboardingGeneralInfo(sellerOnboardingGeneralInfoData),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      if (response?.data?.id) {
        onStepChange?.(1);

        localStorage.setItem(LOCAL_STORAGE_KEY, response.data.id);
      } else {
        console.error(response.message);
      }
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseSellerOnboardingContactDetails = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UseSellerOnboardingContactDetailsData: paths["/v1/seller/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingContactDetails(
        UseSellerOnboardingContactDetailsData,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingProductDetails = () => {
  // Retrieve companyId from localStorage
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UseSellerOnboardingContactDetailsData: paths["/v1/seller/onboarding/product-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingProductDetails(
        UseSellerOnboardingContactDetailsData,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingReachDetails = () => {
  // Retrieve companyId from localStorage
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UsesellerOnboardingReachDetailsData: paths["/v1/seller/onboarding/reach-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingReachDetails(
        UsesellerOnboardingReachDetailsData,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingCertificateDetailsOne = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UsesellerOnboardingCertificateDetailsOneData: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingCertificatehDetailsOne(
        UsesellerOnboardingCertificateDetailsOneData,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingCertificateDetailsSecond = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UsesellerOnboardingCertificateDetailsSecondData: paths["/v1/seller/onboarding/document-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingCertificatehDetailsSecond(
        UsesellerOnboardingCertificateDetailsSecondData,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingLocationDetailsSave = (
  LocationType: string,
) => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      UsesellerOnboardingLocationDetailsSaveData: paths["/v1/seller/onboarding/location-details/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingLocationhDetailsSave(
        UsesellerOnboardingLocationDetailsSaveData,
        storedCompanyId || "",
        LocationType ?? "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingLocationDetailsDelete = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      id: paths["/v1/seller/onboarding/location-details/delete"]["delete"]["parameters"]["query"]["id"],
    ) => sellerOnboardingLocationhDetailsDelete(id),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingCompanyVerificationDocumentList = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      data: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["requestBody"]["content"]["application/json"],
    ) =>
      sellerOnboardingCertificatehCompanyVerificationDocumentList(
        data,
        storedCompanyId || "",
      ),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
      // Remove companyId from localStorage after successful mutation
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const UsesellerOnboardingGetInformation = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      id: paths["/v1/seller/onboarding/get"]["get"]["parameters"]["query"]["userId"],
    ) => sellerOnboardingGetInformation(id),

    onSuccess: (data) => {
      console.log("API Response Data:", data);
      // successCallback(data.data);
      // showSuccessToastMessage("Location deleted successfully.");
    },

    onError: (error) => {
      // failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

// export const getInformation = async () => {
//   const user = localStorage.getItem("user");

//   console.log("data", user);
//   const res = await client.GET("/v1/seller/onboarding/get", {
//     params: {
//       query: {
//         userId: user?.id || "",
//       },
//     },
//   });
//   if (res.error) throw res;
//   console.log("res");
//   return res.data;
// };

// export const getInformation = async () => {
//   try {
//     const userString = localStorage.getItem("user");
//     if (!userString) {
//       throw new Error("No user data found in localStorage");
//     }

//     const userData = JSON.parse(userString);
//     if (!userData.id) {
//       throw new Error("User ID not found");
//     }

//     const res = await client.GET("/v1/seller/onboarding/get", {
//       params: {
//         query: {
//           userId: userData.id,
//         },
//       },
//     });

//     if (res.error) throw res;
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching information:", error);
//     throw error;
//   }
// };

export const getInformation = async (finalUserId: string) => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return null; // Return null or some default value when on server
  }

  try {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;

    const res = await client.GET("/v1/seller/onboarding/get", {
      params: {
        query: {
          userId: finalUserId || "",
        },
      },
    });

    if (res.error) throw res;
    return res.data;
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

export const UsesellerOnboardingFinalSave = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);
  const router = useRouter();
  return useMutation({
    mutationFn: (
      data: paths["/v1/seller/onboarding/save"]["post"]["parameters"]["query"]["id"],
    ) => sellerOnboardingLastSave(storedCompanyId || ""),

    onSuccess: (response) => {
      showSuccessToastMessage(response.message);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};
