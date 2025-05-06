"use client";

import React from "react";
import * as yup from "yup";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { ROUTES } from "@/utils/route.utils";
import { Form, FormField } from "../../ui/form";
import { InputComponent } from "../../common/InputComponent";
import { ButtonComponent } from "../../common/ButtonComponent";
import { UseLoginUser } from "@/services/query-components/auth.query-components.services";
import { REGEX, ROLES } from "@/constants/common.constants";
import { saveLocalStorage } from "@/lib/useLocalStorage";
import Loader from "@/components/common/Loader";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(REGEX.EMAIL, "Please enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(8, "Password must be at least 8 characters")
    .max(20),
});

function LoginForm() {
  const router = useRouter();
  const form = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getTargetRoute = async (data: any) => {
    const isSeller = data.userRoles.includes(ROLES.SELLER);
    const isBuyer = data.userRoles.includes(ROLES.BUYER);
    const isAdmin = data.userRoles.includes(ROLES.SUPER_ADMIN);

    if (isSeller && isBuyer) {
      return ROUTES.HOME;
    } else if (isSeller) {
      if (!data.sellerBasicDetailsCompleted) {
        return ROUTES.SELLER_ONBOARDING;
      } else {
        return ROUTES.HOME;
      }
    } else if (isBuyer) {
      if (!data.buyerBasicDetailsCompleted) {
        return ROUTES.BUYER_ONBOARDING;
      } else {
        return ROUTES.HOME;
      }
    } else if (isAdmin) {
      return ROUTES.ADMIN_DASHBOARD;
    } else {
      return ROUTES.HOME;
    }
  };

  const successCallback = async (data: any) => {
    const expirationTime = await new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    await setCookie("ACCESS_TOKEN", data.loginToken, {
      secure: true, // Important for HTTPS
      expires: expirationTime,
      path: "/", // Crucial for cookie accessibility
      sameSite: "lax", // Recommended for security
    });

    const { loginToken, ...rest } = data;
    await saveLocalStorage("user", { ...rest, currentUser: data.userRoles[0] });

    const targetRoute = await getTargetRoute(data); // Create this helper function
    window.location.href = targetRoute;
  };

  const failureCallback = (statusCode: string) => {
    if (statusCode === "403") {
      router.replace(
        ROUTES.OTP({ email: form.getValues("email"), from: "login" }),
      );
    }
  };

  const { mutate: loginUserMutate, isPending } = UseLoginUser(
    successCallback,
    failureCallback,
  );

  function onSubmit(values: yup.InferType<typeof loginSchema>) {
    loginUserMutate({
      email: values.email,
      password: values.password,
    });
  }

  function redirectTo(route: string) {
    router.replace(route);
  }

  if (isPending) return <Loader />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:gap-7 gap-4 auth-page-forms"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputComponent
                  placeholder="Email*"
                  type="text"
                  shadow={true}
                  className={`border-0 bg-white ${
                    form.formState.errors.email
                      ? "border border-solid border-red04"
                      : ""
                  }`}
                  error={!!form.formState.errors.email}
                  errorMessage={
                    form.formState.errors.email
                      ? form.formState.errors.email.message
                      : ""
                  }
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputComponent
                  {...field}
                  placeholder="Password*"
                  type="password"
                  shadow={true}
                  className={`border-0 bg-white ${
                    form.formState.errors.password
                      ? "border border-solid border-red04"
                      : ""
                  }`}
                  onKeyDown={(e: any) => {
                    if (e.key === " ") e.preventDefault(); // block spacebar
                  }}
                  onPaste={(e) => e.preventDefault()}
                  onChange={(e: any) => {
                    field.onChange(e.target.value.replace(/\s/g, "")); // remove spaces on input
                  }}
                  error={!!form.formState.errors.password}
                  errorMessage={
                    form.formState.errors.password
                      ? form.formState.errors.password.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[#122D4F] text-[16px] font-semibold leading-normal underline decoration-solid decoration-skip-ink-none"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="flex md:gap-[25px] gap-3 md:pt-3 pt-0">
          <ButtonComponent
            variant="primary"
            element="button"
            type="button"
            onClick={() => router.replace(ROUTES.REGISTER)}
            className="w-1/2 text-center text-base leading-normal py-3"
          >
            Signup
          </ButtonComponent>
          <ButtonComponent
            variant="secondary"
            element="button-big"
            type="submit"
            className="w-1/2"
            disabled={isPending}
          >
            Login
          </ButtonComponent>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
