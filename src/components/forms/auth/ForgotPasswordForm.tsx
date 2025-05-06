"use client";

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { ROUTES } from "@/utils/route.utils";
import { Form, FormField } from "../../ui/form";
import { REGEX } from "@/constants/common.constants";
import { InputComponent } from "../../common/InputComponent";
import { ButtonComponent } from "../../common/ButtonComponent";
import { UseSendOTP } from "@/services/query-components/auth.query-components.services";

const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(REGEX.EMAIL, "Please enter valid email"),
});

function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<yup.InferType<typeof ForgotPasswordSchema>>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const successCallback = () => {
    router.push(
      ROUTES.OTP({ email: form.getValues("email"), from: "forgot-password" }),
    );
  };
  const failureCallback = () => {};
  const { mutate: sendOtpMutate, isPending } = UseSendOTP(
    successCallback,
    failureCallback,
  );

  function onSubmit(values: yup.InferType<typeof ForgotPasswordSchema>) {
    sendOtpMutate(values.email);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col md:gap-7 gap-4 auth-page-forms"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
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
            </div>
          </div>
        </div>
        <div className="flex md:gap-[25px] gap-3 md:pt-3 pt-0">
          <ButtonComponent
            variant="primary"
            element="link"
            type="button"
            href={ROUTES.LOGIN}
            className="w-1/2 text-center text-base leading-normal py-3"
          >
            Back to Login
          </ButtonComponent>
          <ButtonComponent
            variant="secondary"
            element="button-big"
            type="submit"
            className="w-1/2"
            disabled={isPending}
          >
            Send OTP
          </ButtonComponent>
        </div>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
