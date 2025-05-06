"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { ROUTES } from "@/utils/route.utils";
import { Form, FormField } from "../../ui/form";
import { InputComponent } from "../../common/InputComponent";
import { ButtonComponent } from "../../common/ButtonComponent";
import { UseResetPassword } from "@/services/query-components/auth.query-components.services";
import { getLocalStorage } from "@/lib/useLocalStorage";

const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[0-9!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one number or special character",
    )
    .matches(/^\S*$/, "Password must not contain spaces"),
  retypePassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function ResetPasswordForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const form = useForm<yup.InferType<typeof ResetPasswordSchema>>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      retypePassword: "",
    },
  });

  const successCallback = (data: any) => {
    router.replace(ROUTES.LOGIN);
  };
  const failureCallback = () => {};

  const { mutate: resetPasswordMutate, isPending } = UseResetPassword(
    successCallback,
    failureCallback,
  );

  function onSubmit(values: yup.InferType<typeof ResetPasswordSchema>) {
    resetPasswordMutate({ ...values, email: user.email });
  }

  useEffect(() => {
    let localUserData = getLocalStorage("user");
    setUser(localUserData);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:gap-7 gap-4 auth-page-forms"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <FormField
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
                    error={!!form.formState.errors.password}
                    errorMessage={form.formState.errors.password?.message}
                  />
                )}
              />
              <label className="text-[#8593A5] text-[14px] font-normal leading-normal w-[85%]">
                Password must contain a minimum of 8 character, 1 uppercase, 1
                lower case, 1 number and 1 special character
              </label>
            </div>
            <FormField
              name="retypePassword"
              render={({ field }) => (
                <InputComponent
                  {...field}
                  placeholder="Confirm Password*"
                  type="password"
                  shadow={true}
                  className={`border-0 bg-white ${
                    form.formState.errors.retypePassword
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
                  error={!!form.formState.errors.retypePassword}
                  errorMessage={form.formState.errors.retypePassword?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="flex md:pt-3 pt-0">
          <ButtonComponent
            variant="primary"
            element="button-big"
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Change Password
          </ButtonComponent>
        </div>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
