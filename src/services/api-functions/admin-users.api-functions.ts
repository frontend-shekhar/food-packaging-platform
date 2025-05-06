import client from "@/lib/fetch";
import { paths } from "@/types/api-schema";
import CustomError from "@/utils/CustomErrorClass";
import { getCookie } from "cookies-next";

interface Response {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

export const getAdminBuyerList = async (
  query: paths["/v1/admin/inquiries/buyer/onboarding/list"]["get"]["parameters"]["query"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/buyer/onboarding/list",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const exportAdminBuyerList = async (
  query: paths["/v1/admin/inquiries/buyer/onboarding/list"]["get"]["parameters"]["query"],
) => {
  const authToken = getCookie("ACCESS_TOKEN");
  const myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${authToken}`);

  const startDate = query?.startDate ? query?.startDate : "";
  const endDate = query?.endDate ? query?.endDate : "";
  const markAsRedFlag = query?.markAsRedFlag ? query?.markAsRedFlag : "";

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/inquiries/buyer/onboarding/list??offSet=${query?.offSet}&size=${query?.size}&searchKey=${query?.searchKey}&endDate=${endDate}&startDate=${startDate}&status=${query?.status}&markAsRedFlag=${markAsRedFlag}&export=${query?.export}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    },
  );
  let response = await res.text();

  if (res.status !== 200) {
    throw new CustomError("Something went wrong", res.status.toString());
  }

  return response;
};

export const exportAdminSellerList = async (
  query: paths["/v1/admin/inquiries/seller/onboarding/list"]["get"]["parameters"]["query"],
) => {
  const authToken = getCookie("ACCESS_TOKEN");
  const myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${authToken}`);

  const startDate = query?.startDate ? query?.startDate : "";
  const endDate = query?.endDate ? query?.endDate : "";
  const markAsRedFlag = query?.markAsRedFlag ? query?.markAsRedFlag : "";

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/inquiries/seller/onboarding/list?offSet=${query?.offSet}&size=${query?.size}&searchKey=${query?.searchKey}&endDate=${endDate}&startDate=${startDate}&status=${query?.status}&markAsRedFlag=${markAsRedFlag}&export=${query?.export}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    },
  );
  let response = await res.text();

  if (res.status !== 200) {
    throw new CustomError("Something went wrong", res.status.toString());
  }

  return response;
};

export const getAdminBuyerInfo = async (
  id: paths["/v1/admin/inquiries/buyer/onboarding/get"]["get"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/buyer/onboarding/get",
    {
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const putAdminBuyerActions = async (query: {
  id: paths["/v1/admin/inquiries/buyer/onboarding/action"]["put"]["parameters"]["query"]["id"];
  type: "markAsRedFlag" | "unMarkAsRedFlag";
}) => {
  const response: Response = await client.PUT(
    "/v1/admin/inquiries/buyer/onboarding/action",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getAdminSellerList = async (
  query: paths["/v1/admin/inquiries/seller/onboarding/list"]["get"]["parameters"]["query"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/seller/onboarding/list",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const putAdminSellerActions = async (query: {
  id: paths["/v1/admin/inquiries/seller/onboarding/action"]["put"]["parameters"]["query"]["id"];
  type: "markAsRedFlag" | "unMarkAsRedFlag" | "APPROVED" | "REJECTED";
}) => {
  const response: Response = await client.PUT(
    "/v1/admin/inquiries/seller/onboarding/action",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};
