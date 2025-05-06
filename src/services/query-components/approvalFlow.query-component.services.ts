import { useMutation } from "@tanstack/react-query";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { paths } from "@/types/api-schema";

import { string } from "yup";
import client from "@/lib/fetch";
import { useRouter } from "next/navigation";
import {
  buyerOnboardingPutApprovalAction,
  sellerOnboardingGetApproval,
  sellerOnboardingPutApprovalAction,
} from "../api-functions/approvalFlow.api-function.services";
import { getCookies } from "cookies-next";

const LOCAL_STORAGE_KEY = "companyId";
const ACCESS_TOKEN = getCookies();

export const UsesellerOnboardingGetApproval = () => {
  const storedCompanyId = localStorage.getItem(LOCAL_STORAGE_KEY);

  return useMutation({
    mutationFn: (
      id: paths["/v1/admin/inquiries/seller/onboarding/get"]["get"]["parameters"]["query"]["id"],
    ) => sellerOnboardingGetApproval(id),

    onSuccess: (data: any) => {
      console.log("API Response Data:", data);
      showSuccessToastMessage(data?.message);
    },

    onError: (error: any) => {
      showErrorToastMessage(error?.message);
    },
  });
};

interface SellerListParams {
  size: number;
  offSet: number;
  searchKey: string;
  status: string;
  export: boolean;
}

//  =======================================   seller ===================================================

export const UsesellerOnboardingGetlistl = async (selectedItems: any) => {
  const res = await client.GET("/v1/admin/inquiries/seller/onboarding/list", {
    params: {
      query: {
        export: selectedItems?.export,
        searchKey: selectedItems?.searchKey,
        offSet: selectedItems?.offSet,
        size: selectedItems?.size,
        status: selectedItems?.status,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });
  // if(res.error) throw res?.error
  return res.data;
};

export const UsesellerOnboardingGetApprovalAction = () => {
  return useMutation({
    mutationFn: (
      action: paths["/v1/admin/inquiries/seller/onboarding/action"]["put"]["parameters"]["query"],
    ) => sellerOnboardingPutApprovalAction(action),

    onSuccess: (data: any) => {
      console.log("API Response Data:", data);
      showSuccessToastMessage(data?.message);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const getSellerOnboardingInquiriesInformation = async (
  finalUserId: string,
) => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return null; // Return null or some default value when on server
  }

  try {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;

    const res = await client.GET("/v1/admin/inquiries/seller/onboarding/get", {
      params: {
        query: {
          id: finalUserId || "",
        },
      },
    });

    if (res.error) throw res;
    return res.data;
  } catch (error) {
    // showErrorToastMessage(error?.message);
    throw error;
  }
};

//  =======================================   Buyer ===================================================

export const UseBuyerOnboardingGetlistl = async (selectedItems: any) => {
  const res = await client.GET("/v1/admin/inquiries/buyer/onboarding/list", {
    params: {
      query: {
        export: selectedItems?.export,
        searchKey: selectedItems?.searchKey,
        offSet: selectedItems?.offSet,
        size: selectedItems?.size,
        status: selectedItems?.status,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });
  // if(res.error) throw res?.error
  return res.data;
};

export const UseBuyerOnboardingGetApprovalAction = () => {
  return useMutation({
    mutationFn: (
      action: paths["/v1/admin/inquiries/buyer/onboarding/action"]["put"]["parameters"]["query"],
    ) => buyerOnboardingPutApprovalAction(action),

    onSuccess: (data: any) => {
      // console.log("API Response Data:", data);
      showSuccessToastMessage(data?.message);
    },

    onError: (error) => {
      showErrorToastMessage(error?.message);
    },
  });
};

export const getBuyerOnboardingInquiriesInformation = async (
  finalUserId: string,
) => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return null; // Return null or some default value when on server
  }

  try {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;

    const res = await client.GET("/v1/admin/inquiries/buyer/onboarding/get", {
      params: {
        query: {
          id: finalUserId || "",
        },
      },
    });

    if (res.error) throw res;
    return res.data;
  } catch (error: any) {
    showErrorToastMessage(error?.message);
    throw error;
  }
};
