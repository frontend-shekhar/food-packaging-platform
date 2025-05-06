import { paths } from "@/types/api-schema";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { sellerProductQueryKeys } from "@/constants/query-keys/seller.query-keys.constants";
import { getSellerProductList } from "../api-functions/seller-product.api-functions.services";
import CustomError from "@/utils/CustomErrorClass";
import {
  activeOrInactiveProduct,
  exportAdminProductList,
  getAdminProductInfo,
  getAdminProductList,
} from "../api-functions/admin-products.api-functions";
import { queryClient } from "@/lib/reactQueryProvider";
import { adminProductQueryKeys } from "@/constants/query-keys/admin.query-keys.constans";

export const UseGetAdminProductList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminProductQueryKeys.getAdminProductList],
    mutationFn: (
      query: paths["/v1/seller/product/list"]["get"]["parameters"]["query"],
    ) => getAdminProductList(query),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseExportAdminProductList = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminProductQueryKeys.getAdminProductList],
    mutationFn: (
      query: paths["/v1/admin/inquiries/product/list"]["get"]["parameters"]["query"],
    ) => exportAdminProductList(query),
    onSuccess(data, variables, context) {
      successCallback(data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseActiveOrInactiveProduct = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminProductQueryKeys.activeInactiveQery],
    mutationFn: (values: {
      id: paths["/v1/admin/inquiries/product/action"]["put"]["parameters"]["query"]["id"];
      type: paths["/v1/admin/inquiries/product/action"]["put"]["parameters"]["query"]["type"];
    }) => activeOrInactiveProduct(values),
    onSuccess(data, variables, context) {
      successCallback(variables.id);
      showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};

export const UseGetAdminProductInfo = (
  successCallback: (data: any) => void,
  failureCallback: () => void,
) => {
  return useMutation({
    mutationKey: [adminProductQueryKeys.getProductInfo],
    mutationFn: (
      id: paths["/v1/admin/inquiries/product/get"]["get"]["parameters"]["query"]["id"],
    ) => getAdminProductInfo(id),
    onSuccess(data, variables, context) {
      successCallback(data.data);
      // showSuccessToastMessage(data.message);
    },
    onError(error, variables, context) {
      failureCallback();
      showErrorToastMessage(error?.message);
    },
  });
};
