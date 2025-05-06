import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  resetPassword,
  sendOtp,
  verifyOtp,
  registerUser,
  becomeBuyer,
  becomeSeller,
} from "../api-functions/auth.api-functions.services";
import { authQueryKeys } from "@/constants/query-keys/auth.query-keys.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { paths } from "@/types/api-schema";
import CustomError from "@/utils/CustomErrorClass";

export const UseRegisterUser = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationFn: (
      data: paths["/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"],
    ) => registerUser(data),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error: CustomError, variables, context) {
      failureCallback(error.statusCode);
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseLoginUser = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationKey: [authQueryKeys.login],
    mutationFn: (
      loginData: paths["/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"],
    ) => loginUser(loginData),
    onSuccess(data, variables, context) {
      showSuccessToastMessage(data.message);
      successCallback(data.data);
    },
    onError(error: CustomError, variables, context) {
      showErrorToastMessage(error?.message);
      failureCallback(error.statusCode);
    },
  });
};

export const UseResetPassword = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationKey: [authQueryKeys.resetPassword],
    mutationFn: (
      resetPasswordData: paths["/v1/auth/reset-password"]["post"]["requestBody"]["content"]["application/json"],
    ) => resetPassword(resetPasswordData),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      showSuccessToastMessage(data.message as string);
    },
    onError(error: CustomError, variables, context) {
      failureCallback(error.statusCode);
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseSendOTP = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationKey: [authQueryKeys.sendOtp],
    mutationFn: (
      resetPasswordData: paths["/v1/auth/send-otp"]["put"]["parameters"]["query"]["email"],
    ) => sendOtp(resetPasswordData),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      showSuccessToastMessage(data.message as string);
    },
    onError(error: CustomError, variables, context) {
      failureCallback(error.statusCode);
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseVerifyOtp = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationFn: (
      data: paths["/v1/auth/verify-otp"]["post"]["requestBody"]["content"]["application/json"],
    ) => verifyOtp(data),
    onSuccess(data, variables, context) {
      showSuccessToastMessage("OTP verified successfully. Please login.");
      successCallback(data.data);
    },
    onError(error: CustomError, variables, context) {
      showErrorToastMessage(error?.message);
      failureCallback(error.statusCode);
    },
  });
};

export const UseBecomeBuyer = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationFn: (
      userId: paths["/v1/auth/become-buyer"]["post"]["parameters"]["query"]["userId"],
    ) => becomeBuyer(userId),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error: CustomError, variables, context) {
      failureCallback(error.statusCode);
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseBecomeSeller = (
  successCallback: (data: any) => void,
  failureCallback: (statusCode: string) => void,
) => {
  return useMutation({
    mutationFn: (
      userId: paths["/v1/auth/become-seller"]["post"]["parameters"]["query"]["userId"],
    ) => becomeSeller(userId),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error: CustomError, variables, context) {
      failureCallback(error.statusCode);
      showErrorToastMessage(error?.message);
    },
  });
};
