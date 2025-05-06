import client from "@/lib/fetch";
import { paths } from "@/types/api-schema";
import CustomError from "@/utils/CustomErrorClass";

interface Response {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

export const loginUser = async (
  data: paths["/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response: Response = await client.POST("/v1/auth/login", {
    body: data,
  });

  if (response.error) {
    throw new CustomError(response.error.message, response.error.code);
  }

  return response.data;
};

export const registerUser = async (
  data: paths["/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response = await client.POST("/v1/auth/register", {
    body: data,
  });

  if (response.error) {
    throw new Error(response?.error?.message);
  }

  return response.data;
};

export const verifyOtp = async (
  data: paths["/v1/auth/verify-otp"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response = await client.POST("/v1/auth/verify-otp", {
    body: data,
  });

  if (response.error) {
    throw new Error(response?.error?.message);
  }

  return response.data;
};

export const resendOtp = async (
  resendOtpData: paths["/v1/auth/send-otp"]["put"]["parameters"]["query"]["email"],
) => {
  const response = await client.PUT("/v1/auth/send-otp", {
    params: {
      query: {
        email: resendOtpData,
      },
    },
  });

  if (response.error) {
    throw new Error(response?.error?.message);
  }
  const { data } = response.data;

  return data;
};

export const resetPassword = async (
  data: paths["/v1/auth/reset-password"]["post"]["requestBody"]["content"]["application/json"],
) => {
  const response = await client.POST("/v1/auth/reset-password", {
    body: data,
  });

  if (response.error) {
    throw new CustomError(
      response.error.message as string,
      response.error.code,
    );
  }

  return response.data;
};

export const sendOtp = async (
  data: paths["/v1/auth/send-otp"]["put"]["parameters"]["query"]["email"],
) => {
  const response = await client.PUT("/v1/auth/send-otp", {
    params: { query: { email: data } },
  });

  if (response.error) {
    throw new CustomError(
      response.error.message as string,
      response.error.code,
    );
  }

  return response.data;
};

export const becomeBuyer = async (
  userId: paths["/v1/auth/become-buyer"]["post"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.POST("/v1/auth/become-buyer", {
    params: { query: { userId } },
  });

  if (response.error) {
    throw new CustomError(
      response.error.message as string,
      response.error.code,
    );
  }

  return response.data;
};

export const becomeSeller = async (
  userId: paths["/v1/auth/become-seller"]["post"]["parameters"]["query"]["userId"],
) => {
  const response: Response = await client.POST("/v1/auth/become-seller", {
    params: { query: { userId } },
  });

  if (response.error) {
    throw new CustomError(
      response.error.message as string,
      response.error.code,
    );
  }

  return response.data;
};
