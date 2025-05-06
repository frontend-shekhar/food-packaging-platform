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

export const saveBuyerGeneralInfo = async (
  data: paths["/v1/buyer/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response: Response = await client.POST(
    "/v1/buyer/onboarding/general-info/save",
    {
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const saveBuyerContactInfo = async ({
  data,
  id,
}: {
  data: paths["/v1/buyer/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/buyer/onboarding/contact-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/buyer/onboarding/contact-details/save",
    {
      body: data,
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const saveBuyerCertificates = async ({
  data,
  id,
}: {
  data: paths["/v1/buyer/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/buyer/onboarding/certificate-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/buyer/onboarding/certificate-details/save",
    {
      body: data,
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const saveBuyerFinancialInfo = async ({
  data,
  id,
}: {
  data: paths["/v1/buyer/onboarding/financial-info/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/buyer/onboarding/financial-info/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/buyer/onboarding/financial-info/save",
    {
      body: data,
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const saveBuyerMembershipPlan = async (
  queryParams: paths["/v1/buyer/onboarding/membership-plan/save"]["post"]["parameters"]["query"],
) => {
  const response: Response = await client.POST(
    "/v1/buyer/onboarding/membership-plan/save",
    {
      params: { query: queryParams },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const buyerFileUpload = async ({
  data,
  type,
}: {
  data: { file: File };
  type: paths["/v1/buyer/onboarding/file/upload"]["post"]["parameters"]["query"]["type"];
}) => {
  const authToken = getCookie("ACCESS_TOKEN");
  const formData = new FormData();
  formData.append("file", data.file);

  const myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${authToken}`);

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/buyer/onboarding/file/upload?type=${type}`,
    {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    },
  );
  let response = await res.json();

  if (res.status !== 200) {
    throw new CustomError(response.message, response.code);
  }

  return response;
};

export const saveBuyerOnboardingInfo = async (
  id: paths["/v1/buyer/onboarding/save"]["post"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.POST("/v1/buyer/onboarding/save", {
    params: { query: { id } },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getBuyerOnboarding = async (
  userId: paths["/v1/buyer/onboarding/get"]["get"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.GET("/v1/buyer/onboarding/get", {
    params: { query: { userId } },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getBuyerOnboardingForAdmin = async (
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
