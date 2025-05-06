import client from "@/lib/fetch";
import { paths } from "@/types/api-schema";
import CustomError from "@/utils/CustomErrorClass";
import { showErrorToastMessage } from "@/utils/toast.utils";
import { getCookie, getCookies } from "cookies-next";

interface Response {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

const ACCESS_TOKEN = getCookies();

export const sellerOnboardingGeneralInfo = async (
  data: paths["/v1/seller/onboarding/general-info/save"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/general-info/save",
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingContactDetails = async (
  data: paths["/v1/seller/onboarding/contact-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/contact-details/save",
    {
      params: {
        query: {
          id: companyId,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const OnboardingFileUpload = async ({
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
export const sellerOnboardingProductDetails = async (
  data: paths["/v1/seller/onboarding/product-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/product-details/save",
    {
      params: {
        query: {
          id: companyId,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingReachDetails = async (
  data: paths["/v1/seller/onboarding/reach-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/reach-details/save",
    {
      params: {
        query: {
          id: companyId,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingCertificatehDetailsOne = async (
  data: paths["/v1/seller/onboarding/certificate-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/certificate-details/save",
    {
      params: {
        query: {
          id: companyId,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingCertificatehDetailsSecond = async (
  data: paths["/v1/seller/onboarding/document-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/document-details/save",
    {
      params: {
        query: {
          id: companyId,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingLocationhDetailsSave = async (
  data: paths["/v1/seller/onboarding/location-details/save"]["post"]["requestBody"]["content"]["application/json"],
  companyId: string,
  LocationType: string,
) => {
  const response: Response = await client.POST(
    "/v1/seller/onboarding/location-details/save",
    {
      params: {
        query: {
          id: companyId,
          type: LocationType,
        },
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
      },
      body: data,
    },
  );

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const sellerOnboardingLocationhDetailsDelete = async (
  id: paths["/v1/seller/onboarding/location-details/delete"]["delete"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.DELETE(
    "/v1/seller/onboarding/location-details/delete",
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

  return response.data;
};

// export const sellerOnboardingLocationhUploadListt = async ({
//   file,
//   type,
// }: {
//   file: paths["/v1/seller/onboarding/file/upload/list"]["post"]["requestBody"]["content"]["application/json"]["file"];
//   type: paths["/v1/seller/onboarding/file/upload/list"]["post"]["parameters"]["query"]["type"];
// }) => {
//   try {
//     const ACCESS_TOKEN = getCookies();
//     const formData = new FormData();
//     formData.append("files", file);

//     const response: Response = await client.POST(
//       `/v1/seller/onboarding/file/upload/list?type=${type}`,
//       {
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
//         },
//       }
//     );

//     if (!response || response.error) {
//       throw new CustomError(
//         response.error?.message || "File upload failed",
//         response.error?.code || response?.data || 500
//       );
//     }

//     return response.data;
//   } catch (error) {
//     console.error("File upload error:", error);
//     throw error;
//   }
// };

const errorMessages: string[] = [];

export const sellerOnboardingLocationhUploadList = async ({
  file,
  type,
}: {
  file: any;
  type: paths["/v1/seller/onboarding/file/upload/list"]["post"]["parameters"]["query"]["type"];
}) => {
  try {
    const authToken = getCookie("ACCESS_TOKEN");
    const formData = new FormData();
    formData.append("files", file);

    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${authToken}`);

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/seller/onboarding/file/upload/list?type=${type}`,
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
  } catch (error: any) {
    errorMessages.push(file.name); // Store only the filename

    // Batch and display error messages after a delay
    setTimeout(() => {
      if (errorMessages.length) {
        showErrorToastMessage(
          `❌ Upload failed for: ${errorMessages.join(", ")}`,
        );
        errorMessages.length = 0; // Clear the queue
      }
    }, 3000);

    throw error; // Rethrow the error for further handling if needed
  }
};

export const sellerOnboardingCertificatehCompanyVerificationDocumentList =
  async (
    data: paths["/v1/seller/onboarding/company-verification-document/save"]["post"]["requestBody"]["content"]["application/json"],
    companyId: string,
  ) => {
    const response: Response = await client.POST(
      "/v1/seller/onboarding/company-verification-document/save",
      {
        params: {
          query: {
            id: companyId,
          },
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
        },
        body: data,
      },
    );

    if (response.error) {
      throw new CustomError(response.error.message, response.error.code);
    }

    return response.data;
  };

export const sellerOnboardingGetInformation = async (
  id: paths["/v1/seller/onboarding/get"]["get"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.GET("/v1/seller/onboarding/get", {
    params: {
      query: {
        userId: id,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }
};

export const sellerOnboardingLastSave = async (
  id: paths["/v1/seller/onboarding/save"]["post"]["parameters"]["query"]["id"],
) => {
  const response: Response = await client.POST("/v1/seller/onboarding/save", {
    params: {
      query: {
        id: id,
      },
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN?.ACCESS_TOKEN}`,
    },
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};
