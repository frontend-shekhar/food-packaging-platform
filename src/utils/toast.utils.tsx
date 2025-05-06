// import { toast } from "react-toastify";
import { toast } from "sonner";

export const showSuccessToastMessage = (message: string) => {
  return toast.success(message, { duration: 10000 });
};

export const showErrorToastMessage = (message: string | "") => {
  return toast.error(message || "Something went wrong. Please try again.", {
    duration: 10000,
  });
};
export const showInfoToastMessage = (message: string) => {
  return toast.info(message, { duration: 10000 });
};

export const showWarnToastMessage = (message: string) => {
  return toast.warning(message, { duration: 10000 });
};
