import client from "@/lib/fetch";
import { paths } from "@/types/api-schema";
import CustomError from "@/utils/CustomErrorClass";
import { getCookie, getCookies } from "cookies-next";

interface Response {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

const ACCESS_TOKEN = getCookies();

// ========================= seller Approval ======================== //

export const sellerOnboardingGetApproval = async (
  id: paths["/v1/admin/inquiries/seller/onboarding/get"]["get"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/seller/onboarding/get",
    {
      params: {
        query: {
          id: id,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }
};

export const sellerOnboardingPutApprovalAction = async (
  action: paths["/v1/admin/inquiries/seller/onboarding/action"]["put"]["parameters"]["query"],
) => {
  const { id, type } = action;
  const res = await client.PUT("/v1/admin/inquiries/seller/onboarding/action", {
    params: {
      query: {
        id: id,
        type: type,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });
  if (res.error) throw res;
  return res.data;
};

// ========================= Buyer Approval ======================== //

export const buyerOnboardingPutApprovalAction = async (
  action: paths["/v1/admin/inquiries/buyer/onboarding/action"]["put"]["parameters"]["query"],
) => {
  const { id, type } = action;
  const res = await client.PUT("/v1/admin/inquiries/buyer/onboarding/action", {
    params: {
      query: {
        id: id,
        type: type,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });
  if (res.error) throw res;
  return res.data;
};
