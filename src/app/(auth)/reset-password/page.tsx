import HeadingComponent from "@/components/common/HeadingComponent";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="flex flex-col md:gap-7 gap-5">
      <div className="flex flex-col gap-2">
        <HeadingComponent tag="h2" text="Reset Password" />
        <p className="text-grey88/70 lg:text-base text-sm font-semibold leading-normal">
          Please Change your password
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordPage;
