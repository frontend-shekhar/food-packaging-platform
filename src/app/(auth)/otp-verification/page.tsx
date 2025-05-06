import Loader from "@/components/common/Loader";
import OtpVerificationForm from "@/components/forms/auth/OtpVerificationForm";
import { Suspense } from "react";

function OtpVerification() {
  return (
    <Suspense fallback={<Loader />}>
      <OtpVerificationForm />
    </Suspense>
  );
}

export default OtpVerification;
