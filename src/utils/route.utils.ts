export const ROUTES = {
  HOME: `/`,
  REGISTER: "/register",
  LOGIN: "/login",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  OTP: (queryParams: { email: string; from?: string }) =>
    `/otp-verification?email=${queryParams.email}&from=${queryParams.from || ""}`,
  SELLER_DASHBOARD: "/seller-dashboard",
  SELLER_ONBOARDING: "/seller-onboarding",
  EDIT_SELLER_ONBOARDING: "/edit-seller-onboarding",
  SELLER_PRODUCT_LISTING: "/seller-product-listing",
  SELLER_APPROVAL_DASHBOARD: "/seller-approval-dashboard",
  BUYER_DASHBOARD: "/buyer-dashboard",
  BUYER_ONBOARDING: "/buyer-onboarding",
  EDIT_BUYER_ONBOARDING: "/edit-buyer-onboarding",
  SELLER_ADD_PRODUCT: "/seller-add-product",
  ADMIN_DASHBOARD: "/admin-dashboard",
  BUYER_LISTING: "/buyer-listing",
  SELLER_LISTING: "/seller-listing",
  ADMIN_PRODUCT_LISTING: "/admin-product-listing",
  VIEW_BUYER_DETAILS: (id?: string) =>
    id ? `/view-buyer-details/${id}` : "view-buyer-details",
  VIEW_SELLER_DETAILS: (id?: string) =>
    id ? `/view-seller-details/${id}` : "/view-seller-details",
};
