"use client";

import * as yup from "yup";
import React, { useCallback, useEffect, useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";
import UiPhoneInput from "@/components/common/phoneComponent";
import { FileUpload } from "@/components/common/file-upload-2";
import { MulFileUpload } from "@/components/common/multiFileUpload";
import CheckboxComponent from "@/components/common/CheckboxComponent";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import {
  UseSaveSellerCompanyVerificationDocs,
  UseSaveSellerContactInfo,
  UseSaveSellerGeneralInfo,
  UseSellerFileUpload,
} from "@/services/query-components/seller-onborading.query-components.services";
import { ROUTES } from "@/utils/route.utils";
import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";
import { ROLES } from "@/constants/common.constants";

// Main Page
export default function GeneralInformationForm({
  isEditing,
  completedSections,
  handleSectionComplete,
  readOnly,
  companyInfoForm,
  companyInfoEditForm,
  companyVerificationForm,
  contactDetailsForm,
}: {
  isEditing: boolean;
  completedSections: any;
  handleSectionComplete: (section: string, value: boolean) => void;
  readOnly: any;
  companyInfoForm: UseFormReturn<companyInformationFormData, any, undefined>;
  companyInfoEditForm: UseFormReturn<
    companyInformationEditFormData,
    any,
    undefined
  >;
  companyVerificationForm: UseFormReturn<
    companyVerificationSchemaType,
    any,
    undefined
  >;
  contactDetailsForm: UseFormReturn<contactDetailsFromFormData, any, undefined>;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full p-5">
      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-[0_0_13px_5px_rgba(0,0,0,0.02)] mb-6 sticky top-[60px] z-10">
        <div className="flex justify-start overflow-x-auto w-full">
          <a
            className={`flex items-center pt-[14px] pb-[13px] pl-5 pe-[25px] border border-b-[5px] ${
              currentStep == 0
                ? "border-[#2B62DD]"
                : "border-transparent text-gray-600"
            } border-t-0 border-l-0 border-r-0 min-w-[224px] lg:max-w-full max-w-[350px]`}
            href="#company-info"
            onClick={() => setCurrentStep(0)}
          >
            <div
              className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                currentStep === 0 || completedSections["companyInfo"]
                  ? "bg-[#2B62DD] text-white"
                  : "bg-transparent text-[#122D4F] border border-[#122D4F]"
              } text-center text-[10px] font-normal leading-normal`}
            >
              01
            </div>
            <div className="ml-2">
              <p
                className={`text-[14px] font-semibold leading-[20px] ${
                  currentStep === 0 || completedSections["companyInfo"]
                    ? "text-[#2B62DD]"
                    : "text-gray-600"
                }`}
              >
                Company Information
              </p>
            </div>
          </a>
          {isEditing && (
            <>
              <a
                className={`flex items-center pt-[14px] pb-[13px] px-[25px] border border-b-[5px] ${
                  currentStep === 1
                    ? "border-[#2B62DD]"
                    : "border-transparent text-gray-600"
                } border-t-0 border-l-0 border-r-0 min-w-[224px]`}
                href="#certification"
                onClick={() => setCurrentStep(1)}
              >
                <div
                  className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                    currentStep === 1 || completedSections["verificationDocs"]
                      ? "bg-[#2B62DD] text-white"
                      : "bg-transparent text-[#122D4F] border border-[#122D4F]"
                  } text-center text-[10px] font-normal leading-normal`}
                >
                  02
                </div>
                <div className="ml-2">
                  <p
                    className={`text-[14px] font-semibold leading-[20px] ${
                      currentStep === 1 || completedSections["verificationDocs"]
                        ? "text-[#2B62DD]"
                        : "text-gray-600"
                    }`}
                  >
                    Company Verification Documents
                  </p>
                </div>
              </a>
              <a
                className={`flex items-center pt-[14px] pb-[13px] px-[25px] border border-b-[5px] ${
                  currentStep === 2
                    ? "border-[#2B62DD]"
                    : "border-transparent text-gray-600"
                } border-t-0 border-l-0 border-r-0 min-w-[224px]`}
                href="#contact-details"
                onClick={() => setCurrentStep(2)}
              >
                <div
                  className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                    currentStep === 2 || completedSections["contactDetails"]
                      ? "bg-[#2B62DD] text-white"
                      : "bg-transparent text-[#122D4F] border border-[#122D4F]"
                  } text-center text-[10px] font-normal leading-normal`}
                >
                  03
                </div>
                <div className="ml-2">
                  <p
                    className={`text-[14px] font-semibold leading-[20px] ${
                      currentStep === 2 || completedSections["contactDetails"]
                        ? "text-[#2B62DD]"
                        : "text-gray-600"
                    }`}
                  >
                    Contact Details
                  </p>
                </div>
              </a>
            </>
          )}
        </div>
      </div>
      <CompanyInformationFrom
        isEditing={isEditing}
        isCompleted={completedSections["companyInfo"]}
        handleSectionComplete={handleSectionComplete}
        companyInfoForm={companyInfoForm}
        companyInfoEditForm={companyInfoEditForm}
        readOnly={readOnly}
      />
      {isEditing && (
        <>
          <CompanyVerificationForm
            isCompleted={completedSections["verificationDocs"]}
            companyVerificationForm={companyVerificationForm}
            readOnly={readOnly}
            handleSectionComplete={handleSectionComplete}
          />
          <ContactDetailsForm
            isCompleted={completedSections["contactDetails"]}
            contactDetailsForm={contactDetailsForm}
            handleSectionComplete={handleSectionComplete}
            readOnly={readOnly}
          />
          <div className="flex justify-end px-5 py-4 mt-6">
            <ButtonComponent
              disabled={readOnly}
              type="submit"
              className={`capitalize h-auto text-sm font-semibold leading-normal py-[9.5px] px-8 bg-[#1B2B65] hover:bg-[#2B62DD] text-white rounded-[8px]`}
            >
              Next
            </ButtonComponent>
          </div>
        </>
      )}
    </div>
  );
}

// Company Information
export const companyInformationSchema = yup.object().shape({
  companyRegisterNumber: yup
    .string()
    .trim()
    .required("Registration number is required"),
  companyName: yup
    .string()
    .trim()
    .required("Company name is required")
    .matches(/^[a-zA-Z ]{2,}$/, "Enter valid company name"),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email().optional(),
  mobile: yup.string().required(),
  taxResidence: yup.string().optional(),
  taxId: yup.string().optional(),
  dunsId: yup.string().optional(),
  natureOfbussiness: yup.string().optional(),
  companyLogo: yup.string().optional(),
  letterOfIncorporation: yup.string().optional(),
  confirmCompany: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export type companyInformationFormData = yup.InferType<
  typeof companyInformationSchema
>;

export const companyInformationEditSchema = yup.object().shape({
  companyRegisterNumber: yup
    .string()
    .trim()
    .required("Registration number is required"),
  companyName: yup
    .string()
    .trim()
    .required("Company name is required")
    .matches(/^[a-zA-Z ]{2,}$/, "Enter valid company name"),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email().optional(),
  mobile: yup.string().required("Mobile number is required"),
  taxResidence: yup.string().trim().required("Tax Residence is required"),
  taxId: yup.string().trim().required("Tax Id is required"),
  dunsId: yup.string().optional(),
  natureOfbussiness: yup
    .string()
    .trim()
    .required("Nature of Business is required"),
  companyLogo: yup.string().optional(),
  letterOfIncorporation: yup
    .string()
    .trim()
    .required("Letter of Incorporation is required"),
  confirmCompany: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export type companyInformationEditFormData = yup.InferType<
  typeof companyInformationEditSchema
>;

function CompanyInformationFrom({
  isEditing,
  readOnly,
  companyInfoForm,
  companyInfoEditForm,
  isCompleted,
  handleSectionComplete,
}: {
  isEditing: boolean;
  readOnly: any;
  companyInfoForm: UseFormReturn<companyInformationFormData, any, undefined>;
  companyInfoEditForm: UseFormReturn<
    companyInformationEditFormData,
    any,
    undefined
  >;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const successCallback = (data: any) => {
    if (!isEditing) {
      const userDataLocal: any = getLocalStorage("user");
      saveLocalStorage("user", {
        ...userDataLocal,
        sellerBasicDetailsCompleted: true,
        currentUser: ROLES.SELLER,
      });
      router.replace(ROUTES.SELLER_DASHBOARD);
      return;
    } else {
      router.push(`${pathname}?id=${data.id}`);
    }
    handleSectionComplete("companyInfo", true);
  };
  const failureCallback = () => {};
  const { mutate: saveSellerGeneralInfoMutate } = UseSaveSellerGeneralInfo(
    successCallback,
    failureCallback,
  );

  const {
    formState: { errors },
  } = isEditing ? companyInfoEditForm : companyInfoForm;

  const successCallbackForFile = (data: any) => {};
  const failureCallbackForFile = () => {};
  const { mutate: fileUploadMutate } = UseSellerFileUpload(
    successCallbackForFile,
    failureCallbackForFile,
  );

  const onSubmit = async (data: companyInformationFormData) => {
    saveSellerGeneralInfoMutate(data);
  };

  return (
    <>
      {isEditing ? (
        <Form {...companyInfoEditForm}>
          <div id="company-info">
            <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
              <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl font-semibold ">Company Information</h2>
                <div
                  className={`ml-2 text-[14px] font-semibold leading-normal ${
                    isCompleted ? "text-green-600" : "text-[#312C63]"
                  }`}
                >
                  {isCompleted ? "Completed" : "Incomplete"}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                <FormField
                  control={companyInfoEditForm.control}
                  name="companyRegisterNumber"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.companyRegisterNumber ? "border-red04" : ""
                        }`}
                        placeholder="Company Register Number*"
                        disabled={readOnly}
                      />
                      {errors.companyRegisterNumber && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.companyRegisterNumber.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.companyName ? "border-red04" : ""
                        }`}
                        placeholder="Company Name*"
                        disabled={readOnly}
                      />
                      {errors.companyName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          companyInfoEditForm.formState.errors.firstName
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="First Name"
                        disabled
                      />
                      {companyInfoEditForm.formState.errors.firstName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            companyInfoEditForm.formState.errors.firstName
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          companyInfoEditForm.formState.errors.lastName
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="Last Name"
                        disabled
                      />
                      {companyInfoEditForm.formState.errors.lastName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            companyInfoEditForm.formState.errors.lastName
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="email"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.email ? "border-red04" : ""
                        }`}
                        placeholder="Company Email*"
                        disabled={true}
                      />
                      {errors.email && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <UiPhoneInput
                      {...field}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      shadow={true}
                      disabled={true}
                      error={!!errors.mobile}
                      errorMessage={errors.mobile?.message}
                      className={`bg-input ${readOnly ? "opacity-50 [&_+_.flag-dropdown]:opacity-50 [&_+_.flag-dropdown_.selected-flag]:opacity-50 [&_+_.flag-dropdown]:cursor-not-allowed [&_+_.flag-dropdown_.selected-flag]:cursor-not-allowed" : "opacity-100"}`}
                    />
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="taxResidence"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.taxResidence ? "border-red04" : ""
                        }`}
                        placeholder="Tax Residence*"
                        disabled={readOnly}
                      />
                      {errors.taxResidence && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.taxResidence.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="taxId"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.taxId ? "border-red04" : ""
                        }`}
                        placeholder="TAX ID*"
                        disabled={readOnly}
                      />
                      {errors.taxId && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.taxId.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoEditForm.control}
                  name="dunsId"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className="h-[52px] bg-[#FBFBFB]"
                        placeholder="DUNS ID"
                        disabled={readOnly}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 pt-5">
                <FormField
                  control={companyInfoEditForm.control}
                  name="natureOfbussiness"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.natureOfbussiness ? "border-red04" : ""
                        }`}
                        placeholder="Nature of Business*"
                        disabled={readOnly}
                      />
                      {errors.natureOfbussiness && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.natureOfbussiness.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                      Letter of Incorporation
                      <span className="text-red04">*</span>
                    </label>
                    <FormField
                      control={companyInfoEditForm.control}
                      name="letterOfIncorporation"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FileUpload
                            disabled={readOnly}
                            type="all"
                            id="letterOfIncorporation"
                            value={field.value}
                            onFileSelect={(file: File | null) => {
                              field.onChange(file);
                              if (file) {
                                fileUploadMutate(
                                  {
                                    data: { file },
                                    type: "letterOfIncorporation",
                                  },
                                  {
                                    onSuccess(data, variables, context) {
                                      companyInfoEditForm.setValue(
                                        "letterOfIncorporation",
                                        data.data,
                                      );
                                    },
                                  },
                                );
                              } else {
                                companyInfoEditForm.setValue(
                                  "letterOfIncorporation",
                                  "",
                                );
                              }
                            }}
                            className={`min-h-[138px] bg-white  ${
                              companyInfoEditForm.formState.errors
                                .letterOfIncorporation
                                ? "border-red04"
                                : ""
                            }`}
                          />
                          {companyInfoEditForm.formState.errors
                            .letterOfIncorporation && (
                            <p className="text-red04/90 text-xs font-medium">
                              {
                                companyInfoEditForm.formState.errors
                                  .letterOfIncorporation.message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                      Company Logo
                    </label>
                    <FormField
                      control={companyInfoEditForm.control}
                      name="companyLogo"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FileUpload
                            disabled={readOnly}
                            type="image"
                            id="companyLogo"
                            value={field.value}
                            onFileSelect={(file) => {
                              field.onChange(file);
                              if (file) {
                                fileUploadMutate(
                                  {
                                    data: { file },
                                    type: "companyLogo",
                                  },
                                  {
                                    onSuccess(data, variables, context) {
                                      companyInfoEditForm.setValue(
                                        "companyLogo",
                                        data.data,
                                      );
                                    },
                                  },
                                );
                              } else {
                                companyInfoEditForm.setValue("companyLogo", "");
                              }
                            }}
                            className={`min-h-[138px] bg-white  ${
                              companyInfoEditForm.formState.errors.companyLogo
                                ? "border-red04"
                                : ""
                            }`}
                          />
                          {companyInfoEditForm.formState.errors.companyLogo && (
                            <p className="text-red04/90 text-xs font-medium">
                              {
                                companyInfoEditForm.formState.errors.companyLogo
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={companyInfoEditForm.control}
                  name="confirmCompany"
                  render={({ field }) => (
                    <CheckboxComponent
                      disabled={readOnly}
                      className="text-[#122D4F]"
                      id="register"
                      labelClassName="text-[#122D4FCC]"
                      label="I confirm that my company is involved in physically buying or selling commodities*"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        companyInfoEditForm.trigger("confirmCompany");
                      }}
                      error={!!errors.confirmCompany}
                      errorMessage={errors.confirmCompany?.message}
                    ></CheckboxComponent>
                  )}
                />
              </div>
              {!readOnly && (
                <div className="flex justify-end mt-5 lg:mt-10">
                  <ButtonComponent
                    variant="primary"
                    type="button"
                    onClick={companyInfoEditForm.handleSubmit(onSubmit)}
                    disabled={companyInfoEditForm.formState.isSubmitting}
                    className="px-8 max-w-[104px] w-full"
                  >
                    Save
                  </ButtonComponent>
                </div>
              )}
            </div>
          </div>
        </Form>
      ) : (
        <Form {...companyInfoForm}>
          <div id="company-info">
            <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
              <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl font-semibold ">Company Information</h2>
                <div
                  className={`ml-2 text-[14px] font-semibold leading-normal ${
                    isCompleted ? "text-green-600" : "text-[#312C63]"
                  }`}
                >
                  {isCompleted ? "Completed" : "Incomplete"}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                <FormField
                  control={companyInfoForm.control}
                  name="companyRegisterNumber"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.companyRegisterNumber ? "border-red04" : ""
                        }`}
                        placeholder="Company Register Number*"
                        disabled={readOnly}
                      />
                      {errors.companyRegisterNumber && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.companyRegisterNumber.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.companyName ? "border-red04" : ""
                        }`}
                        placeholder="Company Name*"
                        disabled={readOnly}
                      />
                      {errors.companyName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          companyInfoForm.formState.errors.firstName
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="First Name"
                        disabled
                      />
                      {companyInfoForm.formState.errors.firstName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {companyInfoForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          companyInfoForm.formState.errors.lastName
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="Last Name"
                        disabled
                      />
                      {companyInfoForm.formState.errors.lastName && (
                        <p className="text-red04/90 text-xs font-medium">
                          {companyInfoForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoForm.control}
                  name="email"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          errors.email ? "border-red04" : ""
                        }`}
                        placeholder="Company Email*"
                        disabled={true}
                      />
                      {errors.email && (
                        <p className="text-red04/90 text-xs font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={companyInfoForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <UiPhoneInput
                      {...field}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      shadow={true}
                      disabled={true}
                      error={!!errors.mobile}
                      errorMessage={errors.mobile?.message}
                      className={`bg-input ${readOnly ? "opacity-50 [&_+_.flag-dropdown]:opacity-50 [&_+_.flag-dropdown_.selected-flag]:opacity-50 [&_+_.flag-dropdown]:cursor-not-allowed [&_+_.flag-dropdown_.selected-flag]:cursor-not-allowed" : "opacity-100"}`}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 pt-5">
                <FormField
                  control={companyInfoForm.control}
                  name="confirmCompany"
                  render={({ field }) => (
                    <CheckboxComponent
                      className="text-[#122D4F]"
                      id="register"
                      labelClassName="text-[#122D4FCC]"
                      label="I confirm that my company is involved in physically buying or selling commodities*"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        companyInfoForm.trigger("confirmCompany");
                      }}
                      error={!!errors.confirmCompany}
                      errorMessage={errors.confirmCompany?.message}
                    ></CheckboxComponent>
                  )}
                />
              </div>
              {!readOnly && (
                <div className="flex justify-end mt-5 lg:mt-10">
                  <ButtonComponent
                    variant="primary"
                    type="button"
                    onClick={companyInfoForm.handleSubmit(onSubmit)}
                    disabled={companyInfoForm.formState.isSubmitting}
                    className="px-8 max-w-[104px] w-full"
                  >
                    Save
                  </ButtonComponent>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

// Company Verification Form
export const companyVerificationFormSchema = yup.object({
  companyVerificationDocuments: yup
    .array(yup.string().required())
    .min(1, "At least one certificate is required")
    .required("Company Verification Documents is required"),
});

export type companyVerificationSchemaType = yup.InferType<
  typeof companyVerificationFormSchema
>;

function CompanyVerificationForm({
  isCompleted,
  readOnly,
  companyVerificationForm,
  handleSectionComplete,
}: {
  isCompleted: boolean;
  readOnly: any;
  companyVerificationForm: UseFormReturn<
    companyVerificationSchemaType,
    any,
    undefined
  >;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const [verificationDocuments, setVerificationDocuments] = useState<File[]>(
    [],
  );
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [isDocumentsComplete, setIsDocumentsComplete] = useState(false);
  const [isFileUploadVisible, setIsFileUploadVisible] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const successCallback = (data: any) => {
    handleSectionComplete("verificationDocs", true);
    companyVerificationForm.clearErrors();
    companyVerificationForm.setValue(
      "companyVerificationDocuments",
      documentUrls,
    );
  };
  const failureCallback = () => {};
  const { mutate: verificationDocumentListMutation } =
    UseSaveSellerCompanyVerificationDocs(successCallback, failureCallback);

  const handleSaveDocuments = async (urls: string[]) => {
    if (id) {
      verificationDocumentListMutation({
        data: urls,
        id,
      });
    }
  };

  const handleImageClick = () => {
    setIsFileUploadVisible((prev) => !prev);
  };

  const handleUrlsChange = useCallback((newUrls: string[]) => {
    setDocumentUrls(newUrls);
  }, []);

  return (
    <>
      <div id="certification">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
          <div className="flex gap-5 justify-between">
            <div className="">
              <div className="flex justify-between items-center pb-4 ">
                <h2 className="text-xl font-semibold">
                  Company Verification Documents*
                </h2>
              </div>
              <p
                className="text-[#122D4FCC] text-[14px] font-medium leading-[24px] w-[80%] cursor-pointer"
                onClick={handleImageClick}
              >
                These documents are gathered by the Mineramix KYC Team during
                your company verification and approval process. You may choose
                to display these documents on your public company profile.
              </p>
            </div>

            {!readOnly && (
              <div className="flex items-center cursor-pointer h-auto">
                <button
                  type="button"
                  // disabled={!initialData?.generalInformation?.completed}
                  className="flex flex-col h-full justify-between items-end "
                >
                  {isDocumentsComplete ? (
                    <button
                      type="button"
                      className={`flex flex-col h-full justify-between items-end cursor-pointer`}
                      onClick={handleImageClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      onClick={handleImageClick}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                  <div
                    className={`ml-2 text-[14px] font-semibold leading-normal ${
                      isCompleted ? "text-green-600" : "text-[#312C63]"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Incomplete"}
                  </div>
                </button>
              </div>
            )}
          </div>
          {isFileUploadVisible && (
            <div className="pt-5">
              <MulFileUpload
                className="py-[42px] border-dashed bg-white"
                onFileSelect={setVerificationDocuments}
                onUrlsChange={handleUrlsChange}
                onSave={handleSaveDocuments}
                type="companyVerificationDocuments"
                multiple={true}
                initialData={{
                  companyVerificationDocuments:
                    companyVerificationForm.getValues(
                      "companyVerificationDocuments",
                    ),
                }}
                disabled={readOnly}
              />
            </div>
          )}

          {companyVerificationForm.formState.errors
            .companyVerificationDocuments && (
            <p className="text-red04/90 text-xs font-medium mt-2">
              {
                companyVerificationForm.formState.errors
                  .companyVerificationDocuments.message
              }
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// Contact Details
export const contactDetailsFromSchema = yup.object().shape(
  {
    mobile: yup.string().optional(),
    faxNumber: yup.string().when("faxNumber", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup
          .string()
          .matches(/^[0-9+\-\s()]*$/, "Invalid fax number format")
          .min(8, "Invalid fax number format")
          .max(15, "Invalid fax number format");
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
    telephoneNumber: yup.string().when("telephoneNumber", (val, schema) => {
      if (val && val[0] && val[0].length) {
        return yup
          .string()
          .matches(/^[0-9+\-\s()]*$/, "Invalid telephone number format")
          .min(8, "Invalid telephone number format")
          .max(15, "Invalid telephone number format");
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
    website: yup
      .string()
      .matches(
        /^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/,
        "Kindly provide a valid URL beginning with either 'http://' or 'https://'",
      )
      .required("Website is required"),
    documents: yup.array().of(yup.mixed()),
  },
  [
    ["faxNumber", "faxNumber"],
    ["telephoneNumber", "telephoneNumber"],
  ],
);

export type contactDetailsFromFormData = yup.InferType<
  typeof contactDetailsFromSchema
>;

function ContactDetailsForm({
  isCompleted,
  readOnly,
  contactDetailsForm,
  handleSectionComplete,
}: {
  isCompleted: boolean;
  readOnly: any;
  contactDetailsForm: UseFormReturn<contactDetailsFromFormData, any, undefined>;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const successCallback = () => {
    handleSectionComplete("contactDetails", true);
  };
  const failureCallback = () => {};
  const { mutate: saveSellerContactInfoMutate } = UseSaveSellerContactInfo(
    successCallback,
    failureCallback,
  );

  const {
    formState: { errors },
  } = contactDetailsForm;

  function onSubmit(values: contactDetailsFromFormData) {
    const { mobile, website, faxNumber, telephoneNumber } = values;
    if (id) {
      saveSellerContactInfoMutate({
        data: {
          mobile,
          faxNumber,
          telephoneNumber,
          website,
        },
        id: id,
      });
    }
  }

  return (
    <Form {...contactDetailsForm}>
      <div id="contact-details">
        <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-xl font-semibold">Contact Details</h2>
            <div
              className={`ml-2 text-[14px] font-semibold leading-normal ${
                isCompleted ? "text-green-600" : "text-[#312C63]"
              }`}
            >
              {isCompleted ? "Completed" : "Incomplete"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {/* Telephone Number Field */}
            <FormField
              name="telephoneNumber"
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...field}
                      type="tel"
                      inputMode="numeric"
                      className={`h-[52px] bg-[#FBFBFB] `}
                      placeholder="Telephone Number"
                      disabled={readOnly}
                    />
                  </div>
                  {errors.telephoneNumber && (
                    <p className="text-red04/90 text-xs font-semibold">
                      {errors.telephoneNumber.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Fax Number Field */}
            <FormField
              name="faxNumber"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      errors.faxNumber ? "border-red04" : ""
                    }`}
                    placeholder="Fax Number"
                    disabled={readOnly}
                  />
                  {errors.faxNumber && (
                    <p className="text-red04/90 text-xs font-medium">
                      {errors.faxNumber.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Website Field */}
            <FormField
              name="website"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      errors.website ? "border-red04" : ""
                    }`}
                    placeholder="Website*"
                    disabled={readOnly}
                  />

                  {errors.website && (
                    <p className="text-red04/90 text-xs font-medium">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex justify-end mt-5 lg:mt-10">
            <ButtonComponent
              variant="primary"
              type="button"
              className="px-8 max-w-[104px] w-full"
              onClick={contactDetailsForm.handleSubmit(onSubmit)}
              disabled={!id || contactDetailsForm.formState.isSubmitting}
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Form>
  );
}
