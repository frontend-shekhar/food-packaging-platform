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

export const getAdminProductList = async (
  query: paths["/v1/admin/inquiries/product/list"]["get"]["parameters"]["query"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/product/list",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const activeOrInactiveProduct = async (
  query: paths["/v1/admin/inquiries/product/action"]["put"]["parameters"]["query"],
) => {
  const response: Response = await client.PUT(
    "/v1/admin/inquiries/product/action",
    {
      params: { query },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getAdminProductInfo = async (
  id: paths["/v1/admin/inquiries/product/get"]["get"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/product/get",
    {
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const exportAdminProductList = async (
  query: paths["/v1/admin/inquiries/product/list"]["get"]["parameters"]["query"],
) => {
  const authToken = getCookie("ACCESS_TOKEN");
  const myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${authToken}`);

  const startDate = query?.startDate ? query?.startDate : "";
  const endDate = query?.endDate ? query?.endDate : "";

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/inquiries/product/list?offSet=${query?.offSet}&size=${query?.size}&searchKey=${query?.searchKey}&endDate=${endDate}&startDate=${startDate}&status=${query?.status}&export=${query?.export}&active=${query?.active}`,
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
