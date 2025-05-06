import HeadingComponent from "@/components/common/HeadingComponent";
import LoginForm from "@/components/forms/auth/LoginForm";

function Login() {
  return (
    <div className="flex flex-col md:gap-7 gap-5">
      <div className="flex flex-col gap-2">
        <HeadingComponent tag="h2" text="Login" />
        <p className="text-grey88/70 lg:text-base text-sm font-semibold leading-normal">
          Enter your email address to receive a one-time passcode
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
