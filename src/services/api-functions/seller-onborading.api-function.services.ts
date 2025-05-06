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

export const getSellerOnboarding = async (
  userId: paths["/v1/seller/onboarding/get"]["get"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.GET("/v1/seller/onboarding/get", {
    params: { query: { userId } },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getSellerStatus = async (
  userId: paths["/v1/seller/onboarding/get/status"]["get"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.GET(
    "/v1/seller/onboarding/get/status",
    {
      params: { query: { userId } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const getSellerOnboardingForAdmin = async (
  id: paths["/v1/admin/inquiries/seller/onboarding/get"]["get"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.GET(
    "/v1/admin/inquiries/seller/onboarding/get",
    {
      params: { query: { id } },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingGeneralInfo = async (
  data: paths["/v1/seller/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/general-info/save",
    {
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingContactDetails = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/contact-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/contact-details/save",
    {
      params: {
        query: {
          id: id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerFileUpload = async ({
  data,
  type,
}: {
  data: { file: File };
  type: paths["/v1/seller/onboarding/file/upload"]["post"]["parameters"]["query"]["type"];
}) => {
  const authToken = getCookie("ACCESS_TOKEN");
  const formData = new FormData();
  formData.append("file", data.file);

  const myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${authToken}`);

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/seller/onboarding/file/upload?type=${type}`,
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

export const sellerOnboardingProductDetails = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/product-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/product-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/product-details/save",
    {
      params: {
        query: {
          id: id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingReachDetails = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/reach-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/reach-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/reach-details/save",
    {
      params: {
        query: {
          id: id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingCertificatehDetailsOne = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/certificate-details/save",
    {
      params: {
        query: {
          id: id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingCertificatehDetailsSecond = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/document-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/document-details/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/document-details/save",
    {
      params: {
        query: {
          id: id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingLocationhDetailsSave = async ({
  data,
  id,
  LocationType,
}: {
  data: paths["/v1/seller/onboarding/location-details/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/location-details/save"]["post"]["parameters"]["query"]["id"];
  LocationType: paths["/v1/seller/onboarding/location-details/save"]["post"]["parameters"]["query"]["type"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/location-details/save",
    {
      params: {
        query: {
          id: id,
          type: LocationType,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingLocationhDetailsDelete = async ({
  id,
}: {
  id: paths["/v1/seller/onboarding/location-details/delete"]["delete"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.DELETE(
    "/v1/seller/onboarding/location-details/delete",
    {
      params: {
        query: {
          id: id,
        },
      },
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingLastSave = async ({
  id,
}: {
  id: paths["/v1/seller/onboarding/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST("/v1/seller/onboarding/save", {
    params: {
      query: {
        id: id,
      },
    },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingCompanyVerificationDocSave = async ({
  data,
  id,
}: {
  data: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["requestBody"]["content"]["application/json"];
  id: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["parameters"]["query"]["id"];
}) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/company-verification-document/save",
    {
      params: {
        query: {
          id,
        },
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};
