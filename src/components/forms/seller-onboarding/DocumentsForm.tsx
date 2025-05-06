"use client";

import * as yup from "yup";
import { format } from "date-fns";
import { CalendarIcon, File } from "lucide-react";
import { useForm, useFormContext, UseFormReturn } from "react-hook-form";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, Form } from "@/components/ui/form";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UseSaveSellerCertificatehDetailsOne,
  UseSaveSellerCertificatehDetailsSecond,
  UseSaveSellerProductDetails,
  UseSaveSellerReachDetails,
  UseSellerFileUpload,
} from "@/services/query-components/seller-onborading.query-components.services";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";
import { yupResolver } from "@hookform/resolvers/yup";

// Main Page
export default function DocumentsForm({
  completedSections,
  handleSectionComplete,
  onFormCompletion,
  initialData,
  readOnly,
  ProductInformationForm,
  // ReachInformationForm,
  CertificatesFormOne,
  finalDocumentsForm,
}: {
  completedSections: any;
  handleSectionComplete: (section: string, value: boolean) => void;
  onFormCompletion: any;
  initialData: any;
  readOnly: any;
  ProductInformationForm: UseFormReturn<
    ProductInformationFormData,
    any,
    undefined
  >;
  // ReachInformationForm: UseFormReturn<ReachInformationFormData, any, undefined>;
  CertificatesFormOne: UseFormReturn<CertificatesFormData, any, undefined>;
  finalDocumentsForm: UseFormReturn<finalDocumentsSchemaType, any, undefined>;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <div className="w-full p-5">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-[0_0_13px_5px_rgba(0,0,0,0.02)] mb-6 sticky top-[60px] z-10">
          <div className="flex justify-start overflow-x-auto w-full"></div>
          <div className="flex justify-start overflow-x-auto w-full">
            <a
              className={`flex items-center pt-[14px] pb-[13px] pl-5 pe-[25px] border border-b-[5px] ${
                currentStep === 0
                  ? "border-[#2B62DD]"
                  : "border-transparent text-gray-600"
              } border-t-0 border-l-0 border-r-0 min-w-[224px] lg:max-w-full max-w-[350px]`}
              href="#your-products"
              onClick={() => setCurrentStep(0)}
            >
              <div
                className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                  currentStep === 0 || completedSections["productInfo"]
                    ? "bg-[#2B62DD] text-white"
                    : "bg-transparent text-[#122D4F] border border-[#122D4F]"
                } text-center text-[10px] font-normal leading-normal`}
              >
                01
              </div>
              <div className="ml-2">
                <p
                  className={`text-[14px] font-semibold leading-[20px] ${
                    currentStep === 0 || completedSections["productInfo"]
                      ? "text-[#2B62DD]"
                      : "text-gray-600"
                  }`}
                >
                  Your products
                </p>
                {/* <p className="text-[#122D4F] text-[12px] font-normal leading-[20px]">
                  Lorem Ipsum is simply
                </p> */}
              </div>
            </a>
            <a
              className={`flex items-center pt-[14px] pb-[13px] px-[25px] border border-b-[5px] ${
                currentStep === 1
                  ? "border-[#2B62DD]"
                  : "border-transparent text-gray-600"
              } border-t-0 border-l-0 border-r-0 min-w-[224px]`}
              href="#certificates"
              onClick={() => setCurrentStep(1)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 1 || completedSections["certificates"]
                    ? "bg-[#2B62DD] text-white"
                    : "bg-transparent text-[#122D4F] border border-[#122D4F]"
                } text-center text-[10px] font-normal leading-normal`}
              >
                02
              </div>
              <div className="ml-2">
                <p
                  className={`text-[14px] font-semibold leading-[20px] ${
                    currentStep === 1 || completedSections["certificates"]
                      ? "text-[#2B62DD]"
                      : "text-gray-600"
                  }`}
                >
                  Certificates
                </p>
                {/* <p className="text-[#122D4F] text-[12px] font-normal leading-[20px]">
                  Lorem Ipsum is simply
                </p> */}
              </div>
            </a>
            <a
              className={`flex items-center pt-[14px] pb-[13px] px-[25px] border border-b-[5px] ${
                currentStep === 2
                  ? "border-[#2B62DD]"
                  : "border-transparent text-gray-600"
              } border-t-0 border-l-0 border-r-0 min-w-[224px]`}
              href="#other-certificates"
              onClick={() => setCurrentStep(2)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 2 || completedSections["otherCertificates"]
                    ? "bg-[#2B62DD] text-white"
                    : "bg-transparent text-[#122D4F] border border-[#122D4F]"
                } text-center text-[10px] font-normal leading-normal`}
              >
                03
              </div>
              <div className="ml-2">
                <p
                  className={`text-[14px] font-semibold leading-[20px] ${
                    currentStep === 2 || completedSections["otherCertificates"]
                      ? "text-[#2B62DD]"
                      : "text-gray-600"
                  }`}
                >
                  Other Certificates
                </p>
                {/* <p className="text-[#122D4F] text-[12px] font-normal leading-[20px]">
                  Lorem Ipsum is simply
                </p> */}
              </div>
            </a>
          </div>
        </div>
        {/*  */}
        <YourProductsForm
          initialData={initialData}
          ProductInformationForm={ProductInformationForm}
          readOnly={readOnly}
          isCompleted={completedSections["productInfo"]}
          handleSectionComplete={handleSectionComplete}
        />
        {/* <ReachForm
          ReachInformationForm={ReachInformationForm}
          readOnly={readOnly}
          isCompleted={completedSections["reach"]}
          handleSectionComplete={handleSectionComplete}
        /> */}
        <CertificatesForm
          CertificatesFormOne={CertificatesFormOne}
          readOnly={readOnly}
          isCompleted={completedSections["certificates"]}
          handleSectionComplete={handleSectionComplete}
        />
        <OtherCertificatesForm
          readOnly={readOnly}
          isCompleted={completedSections["otherCertificates"]}
          finalDocumentsForm={finalDocumentsForm}
          handleSectionComplete={handleSectionComplete}
        />
        <div className="flex justify-end px-5 py-4 mt-6">
          <ButtonComponent
            type="submit"
            className={`capitalize h-auto text-sm font-semibold leading-normal py-[9.5px] px-8 bg-[#1B2B65] hover:bg-[#2B62DD] text-white rounded-[8px]`}
          >
            Next
          </ButtonComponent>
        </div>
      </div>
    </>
  );
}

// Your Products
export const productInformationSchema = yup.object().shape({
  productCategory: yup
    .string()
    .trim()
    .max(100, "Product category cannot exceed 100 characters")
    .required("Product category is required"),
  productSell: yup
    .string()
    .trim()
    .max(200, "Products you sell cannot exceed 200 characters")
    .required("Product you sell is required"),
});

export type ProductInformationFormData = yup.InferType<
  typeof productInformationSchema
>;

function YourProductsForm({
  initialData,
  readOnly,
  ProductInformationForm,
  isCompleted,
  handleSectionComplete,
}: {
  initialData: any;
  readOnly: any;
  ProductInformationForm: UseFormReturn<
    ProductInformationFormData,
    any,
    undefined
  >;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const successCallback = () => {
    handleSectionComplete("productInfo", true);
  };
  const failureCallback = () => {};
  const { mutate: saveSellerProductDetailsMutate } =
    UseSaveSellerProductDetails(successCallback, failureCallback);
  const {
    formState: { errors },
  } = ProductInformationForm;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const onSubmit = (data: ProductInformationFormData) => {
    saveSellerProductDetailsMutate({
      data: data,
      id: id || "",
    });
  };

  return (
    <Form {...ProductInformationForm}>
      <div id="your-products">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
          <div className="flex justify-between items-center pb-[6px]">
            <h2 className="text-xl font-semibold">Your Products</h2>
            <div
              className={`ml-2 text-sm font-semibold ${
                isCompleted ? "text-green-600" : "text-gray-700"
              }`}
            >
              {isCompleted ? "Completed" : "Incomplete"}
            </div>
          </div>
          <p className="text-gray-800 text-sm">
            Product categories your company sells. These will be displayed on
            your public company profile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <FormField
              control={ProductInformationForm.control}
              name="productCategory"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-gray-900 text-sm font-semibold">
                    Product Category<span className="text-red04">*</span>
                  </label>
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      errors.productCategory ? "border-red04" : ""
                    }`}
                    placeholder="Category*"
                    disabled={readOnly}
                  />
                  {errors.productCategory && (
                    <p className="text-red-500 text-xs font-semibold">
                      {errors.productCategory.message}
                    </p>
                  )}
                </div>
              )}
            />
            <FormField
              control={ProductInformationForm.control}
              name="productSell"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-gray-900 text-sm font-semibold">
                    Products You Sell<span className="text-red04">*</span>
                  </label>
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      errors.productSell ? "border-red04" : ""
                    }`}
                    placeholder="Products*"
                    disabled={readOnly}
                  />
                  {errors.productSell && (
                    <p className="text-red-500 text-xs font-semibold">
                      {errors.productSell.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          {!readOnly && (
            <div className="flex justify-end mt-5 lg:mt-10">
              <ButtonComponent
                type="button"
                onClick={ProductInformationForm.handleSubmit(onSubmit)}
                variant="primary"
                className="capitalize px-8 max-w-[104px] w-full"
              >
                Save
              </ButtonComponent>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}

// Reach Information
export const reachInformationSchema = yup.object().shape({
  reachRegistred: yup
    .string()
    .required("REACH registration status is required")
    .oneOf(["yes", "no", "no_response"], "Invalid registration status"),
  substaince: yup.string().when("reachRegistred", {
    is: "yes",
    then: (schema) =>
      schema
        .required("substaince is required when REACH registered")
        .min(2, "substaince must be at least 2 characters")
        .max(100, "substaince cannot exceed 100 characters"),
    otherwise: (schema) => schema.optional(),
  }),
  registrationNumber: yup.string().when("reachRegistred", {
    is: "yes",
    then: (schema) =>
      schema
        .required("Registration number is required when REACH registered")
        .matches(/^[A-Z0-9-]+$/, "Invalid registration number format")
        .min(10, "Registration number must be at least 10 characters")
        .max(50, "Registration number cannot exceed 50 characters"),
    otherwise: (schema) => schema.optional(),
  }),
});

export type ReachInformationFormData = yup.InferType<
  typeof reachInformationSchema
>;

function ReachForm({
  readOnly,
  ReachInformationForm,
  isCompleted,
  handleSectionComplete,
}: {
  readOnly: boolean;
  ReachInformationForm: UseFormReturn<ReachInformationFormData, any, undefined>;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const successCallback = (data: any) => {
    handleSectionComplete("reach", true);
  };
  const failureCallback = () => {};
  const { mutate: saveSellerReachDetailsMutate } = UseSaveSellerReachDetails(
    successCallback,
    failureCallback,
  );

  const {
    formState: { errors },
    watch,
  } = ReachInformationForm;

  const onSubmit = async (data: ReachInformationFormData) => {
    if (id) {
      saveSellerReachDetailsMutate({
        data: data,
        id: id,
      });
    }
  };

  return (
    <Form {...ReachInformationForm}>
      <div id="reach">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
          <div className="flex justify-between items-center pb-[6px]">
            <h2 className="text-xl font-semibold">Reach</h2>
            <div
              className={`text-sm font-semibold ${
                isCompleted ? "text-green-600" : "text-gray-700"
              }`}
            >
              {isCompleted ? "Completed" : "Incomplete"}
            </div>
          </div>
          <p className="text-[#1e1e1ee6] text-sm">
            Only Mineramix verified REACH registrations will be displayed on
            your public company profile.
          </p>

          {/* REACH Registration Field */}
          <FormField
            control={ReachInformationForm.control}
            name="reachRegistred"
            render={({ field }) => (
              <div className="flex flex-col gap-5 bg-[#F0F1F7] mt-5 p-4 rounded-lg">
                <label className="text-black text-base font-medium">
                  Is your company REACH Registered?
                </label>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={readOnly}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="reach-yes" />
                    <Label htmlFor="reach-yes" className="cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="reach-no" />
                    <Label htmlFor="reach-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no_response"
                      id="reach-no-response"
                    />
                    <Label
                      htmlFor="reach-no-response"
                      className="cursor-pointer"
                    >
                      No Response
                    </Label>
                  </div>
                </RadioGroup>
                {errors.reachRegistred && (
                  <p className="text-red-500 text-xs">
                    {errors.reachRegistred.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Conditional Fields for "Yes" selection */}
          {watch("reachRegistred") === "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
              <FormField
                control={ReachInformationForm.control}
                name="substaince"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={readOnly}
                    >
                      <SelectTrigger className="h-[52px] bg-[#fbfbfb] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block">
                        <SelectValue placeholder="substaince" />
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
                        <SelectItem value="copper">Copper</SelectItem>
                        <SelectItem value="iron">Iron</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.substaince && (
                      <p className="text-red-500 text-xs">
                        {errors.substaince.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Registration Number Input */}
              <FormField
                control={ReachInformationForm.control}
                name="registrationNumber"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#fbfbfb]${
                        errors.registrationNumber ? "border-red-500" : ""
                      }`}
                      placeholder="Registration Number*"
                      disabled={readOnly}
                    />
                    {errors.registrationNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.registrationNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <p className=" col-span-2">
                The registration number is required for verification and will
                not be disclosed to the public.
              </p>
            </div>
          )}
          <div className="flex justify-end mt-5 lg:mt-10">
            <ButtonComponent
              type="button"
              onClick={ReachInformationForm.handleSubmit(onSubmit)}
              variant="primary"
              className="capitalize px-8 max-w-[104px] w-full"
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Form>
  );
}

// Certificates Form
export const certificatesSchema = yup.object().shape({
  havingCompanyDocument: yup
    .string()
    .required("Certificate status is required")
    .oneOf(["yes", "no", "no_response"], "Invalid certificate status"),
  type: yup.string().when("havingCompanyDocument", {
    is: "yes",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.notRequired(), // Ensure it's not required for "no" and "no_response"
  }),
  number: yup.string().when("havingCompanyDocument", {
    is: "yes",
    then: (schema) =>
      schema
        .required("Certificate number is required")
        .matches(/^[A-Z0-9-]+$/, "Invalid certificate number format")
        .min(3, "Certificate number must be at least 3 characters")
        .max(50, "Certificate number cannot exceed 50 characters"),
    otherwise: (schema) => schema.notRequired(), // Allow form submission
  }),
  issuedBy: yup.string().when("havingCompanyDocument", {
    is: "yes",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.notRequired(),
  }),
  year: yup.string().when("havingCompanyDocument", {
    is: "yes",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.notRequired(),
  }),
  validTill: yup.number().when("havingCompanyDocument", {
    is: "yes",
    then: (schema) => schema.required("Validity date is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export type CertificatesFormData = yup.InferType<typeof certificatesSchema>;

function CertificatesForm({
  readOnly,
  CertificatesFormOne,
  isCompleted,
  handleSectionComplete,
}: {
  readOnly: boolean;
  CertificatesFormOne: UseFormReturn<CertificatesFormData, any, undefined>;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const form = useFormContext<CertificatesFormData>();
  const id = searchParams.get("id");

  const successCallback = (data: any) => {
    handleSectionComplete("certificates", true);
  };
  const failureCallback = () => {};
  const { mutate: saveSellerCertificatehDetailsOneMutate } =
    UseSaveSellerCertificatehDetailsOne(successCallback, failureCallback);

  const {
    formState: { errors },
    watch,
  } = CertificatesFormOne;

  const onSubmit = async (data: CertificatesFormData) => {
    if (id) {
      const payload: CertificatesFormData = {
        havingCompanyDocument: data.havingCompanyDocument,
      };

      if (data.havingCompanyDocument === "yes") {
        payload["number"] = data.number;
        payload["validTill"] = data.validTill;
        payload["issuedBy"] = data.issuedBy;
        payload["type"] = data.type;
        payload["year"] = data.year;
      }

      saveSellerCertificatehDetailsOneMutate({
        data: payload,
        id: id,
      });
    }
  };

  return (
    <Form {...CertificatesFormOne}>
      <div id="certificates">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
          <div className="flex justify-between items-center pb-[6px]">
            <h2 className="text-xl font-semibold">Certificates</h2>
            <div
              className={`ml-2 text-[14px] font-semibold ${
                isCompleted ? "text-green-600" : "text-[#312C63]"
              }`}
            >
              {isCompleted ? "Completed" : "Incomplete"}
            </div>
          </div>
          <FormField
            name="havingCompanyDocument"
            render={({ field }) => (
              <div className="flex flex-col gap-5 bg-[#F0F1F7] mt-5 p-4 rounded-lg">
                <label className="text-black text-[16px] font-medium">
                  Does your company have Certificates?
                  <span className="text-red04">*</span>
                </label>
                <RadioGroup
                  onValueChange={readOnly ? undefined : field.onChange}
                  defaultValue={field.value}
                  disabled={readOnly}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="yes"
                      id="certificates-yes"
                      disabled={readOnly}
                    />
                    <Label
                      htmlFor="certificates-yes"
                      className="cursor-pointer"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no"
                      id="certificates-no"
                      disabled={readOnly}
                    />
                    <Label htmlFor="certificates-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no_response"
                      id="certificates-no-response"
                      disabled={readOnly}
                    />
                    <Label
                      htmlFor="certificates-no-response"
                      className="cursor-pointer"
                    >
                      No Response
                    </Label>
                  </div>
                </RadioGroup>
                {errors.havingCompanyDocument && (
                  <p className="text-red-500 text-xs">
                    {errors.havingCompanyDocument.message}
                  </p>
                )}
              </div>
            )}
          />

          {watch("havingCompanyDocument") == "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
              <FormField
                name="type"
                render={({ field }) => (
                  <Select
                    onValueChange={readOnly ? undefined : field.onChange}
                    defaultValue={field.value}
                    disabled={readOnly}
                  >
                    <SelectTrigger className="h-[52px] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block">
                      <SelectValue placeholder="Type" />
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
                      <SelectItem value="iso9001">ISO 9001</SelectItem>
                      <SelectItem value="iso14001">ISO 14001</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <FormField
                name="number"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Certificate Number*"
                      disabled={readOnly}
                      className={`h-[52px] ${
                        CertificatesFormOne.formState.errors.number
                          ? "border-red-500"
                          : "bg-[#FBFBFB]"
                      }`}
                    />
                    {CertificatesFormOne.formState.errors.number && (
                      <p className="text-red-500 text-xs">
                        {CertificatesFormOne.formState.errors.number.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                name="issuedBy"
                render={({ field }) => (
                  <Select
                    onValueChange={readOnly ? undefined : field.onChange}
                    defaultValue={field.value}
                    disabled={readOnly}
                  >
                    <SelectTrigger className="h-[52px] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block">
                      <SelectValue placeholder="Issued By" />
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
                      <SelectItem value="accreditation-body">
                        Accreditation Body
                      </SelectItem>
                      <SelectItem value="government-agency">
                        Government Agency
                      </SelectItem>
                      <SelectItem value="industry-org">
                        Industry Organization
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormField
                control={CertificatesFormOne.control}
                name="year"
                render={({ field }) => (
                  <Select
                    onValueChange={readOnly ? undefined : field.onChange}
                    defaultValue={field.value}
                    disabled={readOnly}
                  >
                    <SelectTrigger className="h-[52px] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block">
                      <SelectValue placeholder="Year Issued" />
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
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />

              <FormField
                control={CertificatesFormOne.control}
                name="validTill"
                render={({ field }) => (
                  <div className="space-y-2 ">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={readOnly}
                          variant={"outline"}
                          className={cn(
                            " lg:h-[52px] h-12 rounded-lg border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] text-[#122D4F] px-3 py-2 text-sm font-medium leading-normal placeholder:!opacity-100 md:placeholder:!text-base placeholder:!text-[16px] placeholder:!font-medium w-full hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-blueDark4F/80 font-medium">
                              Valid Until*
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value!)}
                          onSelect={(date) => {
                            field.onChange(date!.getTime());
                          }}
                          disabled={(date) =>
                            readOnly ||
                            date < new Date() ||
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.validTill && (
                      <p className="text-red-500 text-xs">
                        {errors.validTill.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          )}

          <div className="flex justify-end mt-5 lg:mt-10">
            <Button
              disabled={!id || form.formState.isSubmitting}
              type="button"
              onClick={CertificatesFormOne.handleSubmit(onSubmit)}
              variant="primary"
              className="capitalize px-8 text-sm leading-normal py-[9.5px] h-auto max-w-[104px] w-full"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

// Other Certificates
export const certificateDocumentSchema = yup.object().shape({
  type: yup.string().required("Document type is required"),
  name: yup.string().required("Document name is required"),
  documentUrl: yup.string().required("Document URL is required"),
});

export type certificateDocumentSchemaType = yup.InferType<
  typeof certificateDocumentSchema
>;

export const finalDocumentsSchema = yup
  .object({
    documentDetails: yup
      .array(certificateDocumentSchema)
      .min(1, "At least one certificate is required")
      .required("Document details are required"),
  })
  .required();

export type finalDocumentsSchemaType = yup.InferType<
  typeof finalDocumentsSchema
>;

function OtherCertificatesForm({
  readOnly,
  isCompleted,
  finalDocumentsForm,
  handleSectionComplete,
}: {
  readOnly: boolean;
  isCompleted: boolean;
  finalDocumentsForm: UseFormReturn<finalDocumentsSchemaType, any, undefined>;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tempForm = useForm<certificateDocumentSchemaType>();
  const [uploadedDocuments, setUploadedDocuments] = useState<any>(
    getLocalStorage("documentDetails") || [],
  );
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [editingDocumentIndex, setEditingDocumentIndex] = useState<
    number | null
  >(null);

  const {
    formState: { errors },
    reset,
    setValue,
  } = tempForm;

  const handleDocumentSubmit = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";

    fileInput.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        fileUploadMutate(
          { data: { file: file }, type: "companyVerificationDocuments" },
          {
            onSuccess(data, variables, context) {
              tempForm.setValue("documentUrl", data.data);
              const { name, type, documentUrl } = tempForm.getValues();

              if (editingDocumentIndex !== null) {
                const updatedDocuments = [...uploadedDocuments];
                updatedDocuments[editingDocumentIndex] = {
                  name,
                  type,
                  documentUrl,
                };
                setUploadedDocuments(updatedDocuments);
                setEditingDocumentIndex(null);
              } else {
                setUploadedDocuments((prev: any) => [
                  { name, type, documentUrl },
                  ...prev,
                ]);
              }
              reset();
              setIsAddingDocument(false);
            },
          },
        );
      }
    };

    fileInput.click();
  };

  const handleEditDocument = (index: number) => {
    const doc = uploadedDocuments[index];
    setValue("type", doc.type);
    setValue("name", doc.name);
    setEditingDocumentIndex(index);
    setIsAddingDocument(true);
  };

  const handleRemoveDocument = (index: number) => {
    const newDocuments = uploadedDocuments.filter(
      (item: any, i: number) => i !== index,
    );
    setUploadedDocuments(newDocuments);
  };

  const successCallbackForFile = (data: any) => {
    finalDocumentsForm.clearErrors();
  };
  const failureCallbackForFile = () => {};
  const { mutate: fileUploadMutate } = UseSellerFileUpload(
    successCallbackForFile,
    failureCallbackForFile,
  );

  const successCallback = () => {
    handleSectionComplete("otherCertificates", true);
  };
  const failureCallback = () => {};
  const { mutate: saveCertificatehDetailsSecondMutate } =
    UseSaveSellerCertificatehDetailsSecond(successCallback, failureCallback);

  function onSubmit(values: finalDocumentsSchemaType) {
    const { documentDetails } = values as finalDocumentsSchemaType;
    if (id) {
      saveCertificatehDetailsSecondMutate({
        data: documentDetails!,
        id: id,
      });
    }
  }

  useEffect(() => {
    finalDocumentsForm.setValue("documentDetails", uploadedDocuments);
    saveLocalStorage("documentDetails", uploadedDocuments);
  }, [finalDocumentsForm, uploadedDocuments]);

  return (
    <Form {...finalDocumentsForm}>
      <div id="other-certificates">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-xl font-semibold">
              Other Certificates<span className="text-red04">*</span>
            </h2>
            <div
              className={`ml-2 text-sm font-semibold ${
                isCompleted ? "text-green-600" : "text-gray-600"
              }`}
            >
              {isCompleted ? "Completed" : "Incomplete"}
            </div>
          </div>
          <p className="text-[#1e1e1ee6] text-sm">
            View/Manage the documents of your company
          </p>
          {isAddingDocument && !readOnly ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <FormField
                control={tempForm.control}
                name="type"
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={readOnly}
                    >
                      <SelectTrigger className="[&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block">
                        <SelectValue placeholder="Type*" />
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
                        <SelectItem
                          value="general-terms"
                          className="hover:bg-blueDark4F/5 transition-all duration-300"
                        >
                          General Terms & Conditions
                        </SelectItem>
                        <SelectItem
                          value="registration-certificate"
                          className="hover:bg-blueDark4F/5 transition-all duration-300"
                        >
                          Registration Certificate
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="hover:bg-blueDark4F/5 transition-all duration-300"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-red-500 text-xs">
                        {errors.root?.type}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={tempForm.control}
                name="name"
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Name*"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.root?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {!readOnly && (
                <div className="items-center gap-3 flex ">
                  {editingDocumentIndex !== null ? (
                    <div className="items-center gap-3 flex w-full">
                      <a
                        className="py-2 h-[52px] min-w-[52px] border border-[#E0E2E7] text-[#1e1e1e]/90 w-full shadow-none  text-sm font-medium leading-[25px] min-h-[52px] hover:border-[#2B62DD] flex justify-center items-center flex-col rounded-lg"
                        href={
                          uploadedDocuments[editingDocumentIndex].documentUrl
                        }
                        target="_blank"
                      >
                        <File className=" text-red-500" />
                        {/* <span className="text-[#1e1e1e]/90">
                        {uploadedDocuments[editingDocumentIndex].name}
                      </span> */}
                      </a>

                      <Button
                        type="button"
                        onClick={handleDocumentSubmit}
                        className="py-2 h-[unset]  border border-dashed border-[#E0E2E7] text-[#1e1e1e]/90 w-full shadow-none  text-sm font-medium leading-[25px] min-h-[52px] hover:border-[#2B62DD] "
                      >
                        Update Document
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleDocumentSubmit}
                      className="py-2 h-[unset]  border border-dashed border-[#E0E2E7] text-[#1e1e1e]/90 w-full shadow-none  text-sm font-medium leading-[25px] min-h-[52px] hover:border-[#2B62DD] "
                    >
                      Attach Document
                    </Button>
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    onClick={() => {
                      reset();
                      setIsAddingDocument(false);
                      setEditingDocumentIndex(null);
                    }}
                    className="cursor-pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                      fill="#FF5C5C"
                    />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            !readOnly && (
              <div className="mt-[28px] text-[#000]  text-base font-medium leading-normal">
                <label
                  onClick={() => setIsAddingDocument(true)}
                  className="cursor-pointer"
                >
                  + Add Document
                </label>
              </div>
            )
          )}

          {uploadedDocuments.length > 0 && (
            <div className="mt-[28px]">
              <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
              <div className="no-scrollbar overflow-x-auto w-full">
                <table className="table-auto border-collapse w-full rounded-lg bg-[#F0F1F7]">
                  <thead className="whitespace-nowrap">
                    <tr>
                      <th className="text-left p-4 pb-0 text-[#000] text-base font-extrabold leading-normal">
                        Document Type
                      </th>
                      <th className="text-left p-4 pb-0 text-[#000] text-base font-extrabold leading-normal">
                        Document File
                      </th>
                      {/* <th className="text-left p-4 pb-0 text-[#000] text-base font-extrabold leading-normal">
                      Actions
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedDocuments.map((doc: any, index: any) => (
                      <tr key={index}>
                        <td className="p-4">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00000080] text-base font-medium leading-normal"
                          >
                            {doc.type}
                          </a>
                        </td>
                        <td className="p-4" key={index}>
                          <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00000080] text-base font-medium leading-normal"
                          >
                            {doc.name}
                          </a>
                        </td>
                        <td className="p-4" key={index}>
                          {!readOnly && (
                            <div className="space-x-2 flex justify-start items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                onClick={() => handleEditDocument(index)}
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M1.8668 14.4048C1.47061 14.0314 1.28013 13.4676 1.3487 12.8581L1.63061 10.3895C1.68394 9.92477 1.96584 9.30762 2.29346 8.97238L8.5487 2.35143C10.1106 0.698099 11.7411 0.652385 13.3944 2.21429C15.0477 3.77619 15.0935 5.40667 13.5316 7.06L7.27632 13.681C6.95632 14.0238 6.36203 14.3438 5.89727 14.42L3.44394 14.8391C3.31441 14.8467 3.20013 14.8619 3.07822 14.8619C2.61346 14.8619 2.17918 14.7019 1.8668 14.4048ZM9.37918 3.12096L3.12394 9.74953C2.97156 9.90953 2.79632 10.2905 2.76584 10.5114L2.48394 12.98C2.45346 13.2314 2.51442 13.4371 2.65156 13.5667C2.7887 13.6962 2.99442 13.7419 3.24584 13.7038L5.69918 13.2848C5.92013 13.2467 6.28584 13.0486 6.43822 12.8886L12.6935 6.26762C13.6382 5.26191 13.9811 4.33238 12.602 3.03715C11.9925 2.45048 11.4668 2.20667 10.9944 2.20667C10.4077 2.20667 9.89727 2.57238 9.37918 3.12096Z"
                                  fill="#87919F"
                                />
                                <path
                                  d="M12.0154 8.33279C9.63826 8.0966 7.72588 6.29089 7.36017 3.92898C7.31445 3.6166 7.52779 3.32708 7.84017 3.27374C8.15255 3.22803 8.44207 3.44136 8.49541 3.75374C8.78493 5.59755 10.2783 7.0147 12.1373 7.19755C12.4497 7.22803 12.6783 7.50993 12.6478 7.82231C12.6097 8.11184 12.3583 8.33279 12.0687 8.33279C12.0535 8.33279 12.0306 8.33279 12.0154 8.33279Z"
                                  fill="#87919F"
                                />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                onClick={() => handleRemoveDocument(index)}
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                  fill="#FF5C5C"
                                />
                              </svg>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!readOnly && uploadedDocuments.length > 0 && (
            <div className="flex justify-end items-end w-full mt-5 lg:mt-10">
              <ButtonComponent
                variant="primary"
                type="button"
                className="px-8 max-w-[104px] w-full"
                onClick={finalDocumentsForm.handleSubmit(onSubmit)}
                disabled={!id || finalDocumentsForm.formState.isSubmitting}
              >
                Save
              </ButtonComponent>
            </div>
          )}

          {finalDocumentsForm.formState.errors.documentDetails && (
            <p className="text-red04/90 text-xs font-medium mt-3">
              {finalDocumentsForm.formState.errors.documentDetails.message}
            </p>
          )}
        </div>
      </div>
    </Form>
  );
}
