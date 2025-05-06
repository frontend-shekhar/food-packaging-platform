import React from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import { isValidPhoneNumber } from "libphonenumber-js";
import UiPhoneInput from "@/components/common/phoneComponent";

export const otherInfoFormSchema = yup.object().shape(
  {
    additionalDesc: yup.string().when("additionalDesc", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup.string().matches(/^[^\s]/, "Please enter valid value");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    customerContactSupport: yup
      .string()
      .when("customerContactSupport", (val, schema) => {
        if (val && val[0] && val[0].length) {
          return yup.string().matches(/^[^\s]/, "Please enter valid value");
        } else {
          return yup
            .string()
            .transform((value, originalValue) => {
              if (!value) {
                return null;
              }
              return originalValue;
            })
            .nullable()
            .optional();
        }
      }),
    tradeExperiance: yup.string().when("tradeExperiance", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup.string().matches(/^[^\s]/, "Please enter valid value");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    returnPolicy: yup
      .string()
      .matches(/^[^\s]/, "Return Policy is required")
      .required("Return Policy is required"),
    impactStatements: yup.string().when("impactStatements", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup.string().matches(/^[^\s]/, "Please enter valid value");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    email: yup.string().when("email", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup.string().email("Please enter a valid email");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    mobile: yup.string().when("mobile", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup
          .string()
          .test("mobile", "Invalid phone number", function (value) {
            if (!value) return false;
            try {
              const phoneNumber = value.startsWith("+") ? value : `+${value}`;
              return isValidPhoneNumber(phoneNumber);
            } catch (error) {
              return false;
            }
          });
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
  },
  [
    ["additionalDesc", "additionalDesc"],
    ["customerContactSupport", "customerContactSupport"],
    ["tradeExperiance", "tradeExperiance"],
    ["impactStatements", "impactStatements"],
    ["email", "email"],
    ["mobile", "mobile"],
  ],
);

export default function OtherInfoForm({ isSeller }: { isSeller: boolean }) {
  const form = useFormContext<yup.InferType<typeof otherInfoFormSchema>>();

  return (
    <div className="sixth-tab">
      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <div className="flex justify-between items-center pt-3 px-5 border-b border-[#122D4F/13] pb-3 ">
          <h2 className="text-xl font-semibold ">Other</h2>
        </div>
        <div className="grid grid-cols-1  gap-6 p-5 pb-0">
          <FormField
            control={form.control}
            name="additionalDesc"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Additional Description
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.additionalDesc
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Enter Additional Description"
                />
                {form.formState.errors.additionalDesc && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.additionalDesc.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <FormField
            control={form.control}
            name="customerContactSupport"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Costumer Contact Support
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.customerContactSupport
                        ? "border-red04 text-red04"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                      className="w-4 h-4 arrow transition-transform duration-300 group-data-[state=open]:rotate-180"
                    >
                      <path
                        opacity="0.6"
                        d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                        fill="#122D4F"
                      />
                    </svg>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="MOBILE">Phone Number</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.customerContactSupport && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.customerContactSupport.message}
                  </p>
                )}
              </div>
            )}
          />
          {form.watch("customerContactSupport") === "EMAIL" && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                    Email
                  </label>
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.email ? "border-red04" : ""
                    }`}
                    placeholder="Email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}
          {form.watch("customerContactSupport") === "MOBILE" && (
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                    Phone Number
                  </label>
                  <UiPhoneInput
                    {...field}
                    value={field.value as string}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    placeholder="Phone Number"
                    shadow={true}
                    error={!!form.formState.errors.mobile}
                  />
                  {form.formState.errors.mobile && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.mobile.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="tradeExperiance"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Supplier’s Trade History or Experiance
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.tradeExperiance
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Enter Trade Experiance"
                />
                {form.formState.errors.tradeExperiance && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.tradeExperiance.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="returnPolicy"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Return Policy and Conditions
                  <span className="text-red04">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.returnPolicy
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Return Policy and Conditions"
                />
                {form.formState.errors.returnPolicy && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.returnPolicy.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="impactStatements"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Sustainability and enviournmentel impact statement
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.impactStatements
                        ? "border-red04 text-red04"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                      className="w-4 h-4 arrow transition-transform duration-300 group-data-[state=open]:rotate-180"
                    >
                      <path
                        opacity="0.6"
                        d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                        fill="#122D4F"
                      />
                    </svg>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.impactStatements && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.impactStatements.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {isSeller && (
        <div className="flex justify-end">
          <ButtonComponent
            variant="primary"
            type="submit"
            className="px-8 max-w-[104px] w-full"
          >
            Next
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}
