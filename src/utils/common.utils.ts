import { ROUTES } from "@/utils/route.utils";

const routeTitles: Record<string, string> = {
  [ROUTES.HOME]: "Home",
  [ROUTES.REGISTER]: "Register",
  [ROUTES.LOGIN]: "Login",
  [ROUTES.RESET_PASSWORD]: "Reset Password",
  [ROUTES.FORGOT_PASSWORD]: "Forgot Password",
  [ROUTES.SELLER_DASHBOARD]: "Seller Dashboard",
  [ROUTES.SELLER_ONBOARDING]: "Seller Onboarding",
  [ROUTES.EDIT_SELLER_ONBOARDING]: "Edit Seller Onboarding",
  [ROUTES.SELLER_PRODUCT_LISTING]: "Seller Product Listing",
  [ROUTES.SELLER_APPROVAL_DASHBOARD]: "Seller Approval Dashboard",
  [ROUTES.BUYER_DASHBOARD]: "Buyer Dashboard",
  [ROUTES.BUYER_ONBOARDING]: "Buyer Onboarding",
  [ROUTES.EDIT_BUYER_ONBOARDING]: "Edit Buyer Onboarding",
  [ROUTES.SELLER_ADD_PRODUCT]: "Add Seller Product",
  [ROUTES.ADMIN_DASHBOARD]: "Admin Dashboard",
  [ROUTES.BUYER_LISTING]: "Buyer Listing",
  [ROUTES.SELLER_LISTING]: "Seller Listing",
  [ROUTES.ADMIN_PRODUCT_LISTING]: "Admin Product Listing",
};

export const getPageTitle = (path: string): string => {
  if (path.startsWith("/view-buyer-details/")) return "View Buyer Details";
  if (path.startsWith("/view-seller-details/")) return "View Seller Details";
  if (path.startsWith("/otp-verification")) return "OTP Verification";

  return routeTitles[path] || "Unknown Page";
};
