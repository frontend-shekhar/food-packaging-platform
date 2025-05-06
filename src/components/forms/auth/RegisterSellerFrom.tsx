"use client";

import React from "react";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidPhoneNumber } from "libphonenumber-js";

import { ROUTES } from "@/utils/route.utils";
import { Label } from "@/components/ui/label";
import Loader from "@/components/common/Loader";
import { Form, FormField } from "../../ui/form";
import UiPhoneInput from "../../common/phoneComponent";
import { InputComponent } from "../../common/InputComponent";
import { ButtonComponent } from "../../common/ButtonComponent";
import UICheckboxComponent from "../../common/CheckboxComponent";
import { crossRound, checkRound } from "../../../../public/images";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  UseRegisterUser,
  UseSendOTP,
} from "@/services/query-components/auth.query-components.services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("phone", "Invalid phone number", function (value) {
      if (!value) return false;
      try {
        const phoneNumber = value.startsWith("+") ? value : `+${value}`;
        return isValidPhoneNumber(phoneNumber);
      } catch (error) {
        return false;
      }
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/^\S*$/, "Password must not contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  type: yup.string().oneOf(["SELLER", "BUYER"]).required(),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

function RegisterSellerFrom() {
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      type: "BUYER",
    },
  });

  const {
    formState: { errors },
    watch,
  } = form;

  const password = watch("password", "");
  const passwordCriteria = [
    {
      text: "Password must be at least 8 characters long.",
      met: password.length >= 8,
    },
    {
      text: "Password must contain at least one upper case.",
      met: /[A-Z]/.test(password),
    },
    {
      text: "Password must contain at least one lower case.",
      met: /[a-z]/.test(password),
    },
    {
      text: "Password must contain at least one number.",
      met: /[0-9]/.test(password),
    },
    {
      text: "Password must contain at least one special character.",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const failureCallbackForOTP = (statusCode: string) => {};
  const successCallbackForOTP = (data: any) => {};
  const { mutate: resendOtpMutation, isPending: sendOTPPending } = UseSendOTP(
    successCallbackForOTP,
    failureCallbackForOTP,
  );

  const successCallback = (data: any) => {
    resendOtpMutation(data.email, {
      onSuccess() {
        router.replace(ROUTES.OTP({ email: data.email }));
      },
    });
  };
  const failureCallback = (statusCode: string) => {};
  const { mutate: userRegisterMutation, isPending } = UseRegisterUser(
    successCallback,
    failureCallback,
  );

  function onSubmit(values: RegisterFormData) {
    userRegisterMutation({
      firstName: values?.firstName,
      email: values?.email,
      lastName: values?.lastName,
      mobile: values?.phone,
      password: values?.password,
      retypePassword: values?.confirmPassword,
      type: values.type,
    });
  }

  if (isPending || sendOTPPending) return <Loader />;

  return (
    <Form {...form}>
      <form
        className="flex flex-col md:gap-6 gap-4 auth-page-forms"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-4 auth-form">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BUYER" id="buyer-option" />
                  <Label htmlFor="buyer-option" className="cursor-pointer">
                    Buyer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SELLER" id="seller-option" />
                  <Label htmlFor="seller-option" className="cursor-pointer">
                    Seller
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          <div></div>
          <FormField
            name="firstName"
            render={({ field }) => (
              <InputComponent
                {...field}
                placeholder="First Name*"
                type="text"
                shadow={true}
                className={`border-0 bg-white ${
                  errors.firstName ? "border border-solid border-red04" : ""
                }`}
                error={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
            )}
          />
          <FormField
            name="lastName"
            render={({ field }) => (
              <InputComponent
                {...field}
                placeholder="Last Name*"
                type="text"
                shadow={true}
                className={`border-0 bg-white ${
                  errors.lastName ? "border border-solid border-red04" : ""
                }`}
                error={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <InputComponent
                {...field}
                placeholder="Company Email*"
                type="email"
                shadow={true}
                className={`border-0 bg-white ${
                  errors.email ? "border border-solid border-red04" : ""
                }`}
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <FormField
            name="phone"
            render={({ field }) => (
              <UiPhoneInput
                {...field}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                placeholder="Enter phone number*"
                shadow={true}
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
                className="auth-mobile-field"
              />
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <InputComponent
                {...field}
                placeholder="Password*"
                type="password"
                shadow={true}
                className={`border-0 bg-white ${
                  errors.password ? "border border-solid border-red04" : ""
                }`}
                onKeyDown={(e: any) => {
                  if (e.key === " ") e.preventDefault(); // block spacebar
                }}
                onPaste={(e) => e.preventDefault()}
                onChange={(e: any) => {
                  field.onChange(e.target.value.replace(/\s/g, "")); // remove spaces on input
                }}
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <InputComponent
                {...field}
                placeholder="Confirm Password*"
                type="password"
                shadow={true}
                className={`border-0 bg-white ${
                  errors.confirmPassword
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
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="md:text-base text-sm font-bold capitalize text-greyE7 mix-blend-luminosity">
            Password Credentials
          </p>
          <ul className="flex flex-col gap-1">
            {passwordCriteria.map((criteria, index) => (
              <li key={index} className="flex items-start gap-[10px]">
                <em className="inline-flex leading-[0] min-w-[13px] md:translate-y-[10px] translate-y-[5px]">
                  <Image
                    src={criteria.met ? checkRound : crossRound}
                    alt="cross"
                    width={13}
                    height={13}
                  />
                </em>
                <p
                  className={`md:text-base md:leading-8 text-sm font-medium ${
                    criteria.met
                      ? "text-green-600"
                      : "text-[#122D4F] opacity-50"
                  }`}
                >
                  {criteria.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <FormField
          name="termsAccepted"
          render={({ field }) => (
            <>
              <div>
                <div className="flex gap-3 items-start">
                  <UICheckboxComponent
                    id="register"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      form.trigger("termsAccepted");
                    }}
                    className="register"
                  />
                  <Label
                    htmlFor="register"
                    className="text-sm lg:text-base leading-normal text-blueDark4F/60"
                  >
                    By submitting the Registration Form I hereby declare that I
                    am accepting{" "}
                    <Dialog>
                      <DialogTrigger className="text-blueCE hover:text-blueDark4F transition-all duration-300">
                        Terms and Conditions
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-5 text-base font-semibold">
                            Terms and Conditions
                          </DialogTitle>
                          <DialogDescription className="max-h-[450px] overflow-auto pe-5 flex flex-col gap-5">
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>{" "}
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>{" "}
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>{" "}
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>{" "}
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>{" "}
                            <p className="text-base ">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque. Lorem ipsum
                              dolor sit amet consectetur adipisicing elit.
                              Soluta quibusdam pariatur eligendi, fugiat
                              perferendis aut vel a numquam, eos voluptatum
                              optio ipsam illum asperiores consectetur
                              dignissimos cumque ullam dicta itaque.
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {/* <Link
                      href={"/terms-conditions"}
                      className="text-blueCE hover:text-blueDark4F transition-all duration-300"
                    >
                      Terms and Conditions
                    </Link> */}
                  </Label>
                </div>
                {!!errors.termsAccepted && errors.termsAccepted?.message && (
                  <p className="text-red04/90 text-xs font-medium ps-[32px] mt-2">
                    {errors.termsAccepted?.message}
                  </p>
                )}
              </div>
            </>
          )}
        />

        <ButtonComponent
          className="w-full mt-4 text-center py-3 text-base leading-normal"
          type="submit"
          variant="secondary"
          disabled={isPending}
        >
          Register
        </ButtonComponent>
        <div className="text-center">
          <Link
            href="/login"
            className="text-[#122D4F] text-[16px]  font-semibold leading-normal underline decoration-solid decoration-skip-ink-none"
            replace
          >
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default RegisterSellerFrom;
