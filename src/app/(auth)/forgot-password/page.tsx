import HeadingComponent from "@/components/common/HeadingComponent";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <div className="flex flex-col md:gap-7 gap-5">
      <div className="flex flex-col gap-2">
        <HeadingComponent tag="h2" text="Forgot Password" />
        <p className="text-grey88/70 lg:text-base text-sm font-semibold leading-normal">
          Please enter your email
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPassword;
