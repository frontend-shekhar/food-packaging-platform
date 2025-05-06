"use client";

import * as yup from "yup";
import { format } from "date-fns";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Country, State, City } from "country-state-city";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField } from "@/components/ui/form";
import { FileUpload } from "@/components/common/file-upload-2";
import {
  UseBuyerFileUpload,
  UseSaveBuyerGeneralInfo,
} from "@/services/query-components/buyer.query-components.services";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import UiPhoneInput from "@/components/common/phoneComponent";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import usePopoverWidth from "@/components/common/usePopoverWidth";
import { ROUTES } from "@/utils/route.utils";
import {
  UseGetGoogleLocation,
  UseGetGooglePlace,
} from "@/services/query-components/maps.query-components.services";
import { debounce } from "lodash";
import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";
import { ROLES } from "@/constants/common.constants";

function BuyerGeneralInformationForm({
  isEditing,
  generalForm,
  generalEditForm,
  schema,
}: {
  isEditing: boolean;
  generalForm: UseFormReturn<
    yup.InferType<typeof buyerGeneralInfoSchema>,
    any,
    undefined
  >;
  generalEditForm: UseFormReturn<
    yup.InferType<typeof buyerGeneralInfoEditSchema>,
    any,
    undefined
  >;
  schema: typeof buyerContactDetailsSchema;
}) {
  return (
    <div className="w-full">
      <GeneralInformation
        isEditing={isEditing}
        generalForm={generalForm}
        generalEditForm={generalEditForm}
      />
      {isEditing && (
        <Suspense>
          <ContactDetails schema={schema} />
        </Suspense>
      )}
    </div>
  );
}

export const buyerGeneralInfoSchema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional(),
  mobile: yup.string().required(),
  companyName: yup.string().required("Company name is required"),
  registerNumber: yup.string().required("Registration number is required"),
  companyLogo: yup.string().optional(),
  dateOfIncorporation: yup.number().optional(),
  taxId: yup.string().optional(),
  dunsId: yup.string().optional(),
  gstNumber: yup.string().optional(),
  natureOfbussiness: yup.string().optional(),
  registeredAddress: yup.string().optional(),
  addressLine2: yup.string().optional(),
  country: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
});

export const buyerGeneralInfoEditSchema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional(),
  mobile: yup.string().required(),
  companyName: yup.string().required("Company name is required"),
  registerNumber: yup.string().required("Registration number is required"),
  companyLogo: yup.string().optional(),
  dateOfIncorporation: yup
    .number()
    .required("Date of Incorporation is required"),
  taxId: yup.string().required("Tax Id is required"),
  dunsId: yup.string().optional(),
  gstNumber: yup.string().required("VAT / GST number required"),
  natureOfbussiness: yup.string().required("Nature of business is required"),
  registeredAddress: yup.string().required("Registered Address is required"),
  addressLine2: yup.string().optional(),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City required"),
  state: yup.string().required("State is required"),
  zipCode: yup
    .string()
    .required("ZipCode is required")
    .min(4, "Please enter valid Zipcode")
    .max(10, "Please enter valid Zipcode")
    .matches(/^\d+$/, "Please enter valid Zipcode")
    .trim("Please enter valid Zipcode")
    .strict(),
});

function GeneralInformation({
  isEditing,
  generalForm,
  generalEditForm,
}: {
  isEditing: boolean;
  generalForm: UseFormReturn<
    yup.InferType<typeof buyerGeneralInfoSchema>,
    any,
    undefined
  >;
  generalEditForm: UseFormReturn<
    yup.InferType<typeof buyerGeneralInfoEditSchema>,
    any,
    undefined
  >;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const { popoverRef, popoverWidth } = usePopoverWidth();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionResults, setPredictionResults] = useState<
    {
      description: string;
      place_id: string;
    }[]
  >([]);

  const successCallbackForFile = (data: any) => {};
  const failureCallbackForFile = () => {};
  const { mutate: fileUploadMutate } = UseBuyerFileUpload(
    successCallbackForFile,
    failureCallbackForFile,
  );
  // Add this ref to the component
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Add this useEffect hook to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const successCallback = (data: any) => {
    if (!isEditing) {
      const user: any = getLocalStorage("user");
      saveLocalStorage("user", {
        ...user,
        buyerBasicDetailsCompleted: true,
        currentUser: ROLES.BUYER,
      });
      router.replace(ROUTES.BUYER_DASHBOARD);
      return;
    } else {
      router.push(`${pathname}?id=${data.id}`);
    }
  };
  const failureCallback = () => {};
  const { mutate: saveBuyerGeneralInfoMutate } = UseSaveBuyerGeneralInfo(
    successCallback,
    failureCallback,
  );
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>({
    startDate: false,
    endDate: false,
  });
  const [isChildOpen, setIsChildOpen] = useState(false);
  const successCallbackForLocation = (data: any) => {
    setShowSuggestions(true);
    setPredictionResults(data);
  };
  const failureCallbackForLocation = () => {};
  const { mutate: getLocationMutate } = UseGetGoogleLocation(
    successCallbackForLocation,
    failureCallbackForLocation,
  );

  const countryList = Country.getAllCountries();
  const countryIsoCode = countryList.find(
    (country) => country.name === generalEditForm.watch("country"),
  )?.isoCode;
  const stateList = State.getStatesOfCountry(countryIsoCode);
  const stateCode = stateList.find(
    (state) => state.name === generalEditForm.watch("state"),
  )?.isoCode;
  const cityList = City.getCitiesOfState(
    countryIsoCode as string,
    stateCode as string,
  );

  const successCallbackForPlace = (data: any) => {
    setShowSuggestions(false);

    generalEditForm.setValue("registeredAddress", data.name);
    generalEditForm.clearErrors("registeredAddress");
    generalEditForm.setValue("addressLine2", data.street_address);
    generalEditForm.clearErrors("addressLine2");
    generalEditForm.setValue("zipCode", data.zip_code);
    generalEditForm.clearErrors("zipCode");

    if (countryList.findIndex((city) => city.name === data.country) !== -1) {
      generalEditForm.setValue("country", data.country);
      generalEditForm.clearErrors("country");

      if (
        State.getAllStates().findIndex((state) => state.name === data.state) !==
        -1
      ) {
        generalEditForm.setValue("state", data.state);
        generalEditForm.clearErrors("state");

        if (
          City.getAllCities().findIndex((city) => city.name === data.city) !==
          -1
        ) {
          generalEditForm.setValue("city", data.city);
          generalEditForm.clearErrors("city");
        } else {
          generalEditForm.setValue("city", "");
        }
      } else {
        generalEditForm.setValue("state", "");
        generalEditForm.setValue("city", "");
      }
    } else {
      generalEditForm.setValue("country", "");
      generalEditForm.setValue("state", "");
      generalEditForm.setValue("city", "");
    }
  };
  const failureCallbackForPlace = () => {};
  const { mutate: getPlaceMutate } = UseGetGooglePlace(
    successCallbackForPlace,
    failureCallbackForPlace,
  );

  async function onSubmit(
    values: yup.InferType<typeof buyerGeneralInfoSchema>,
  ) {
    saveBuyerGeneralInfoMutate(values);
  }

  const handleSuggestionClick = useCallback(
    (placeId?: string) => {
      if (placeId) {
        getPlaceMutate({ placeId });
      } else {
        setShowSuggestions(false);
      }
    },
    [getPlaceMutate],
  );

  // Debounced Search Logic
  const debouncedResults = useMemo(() => {
    return debounce((value: string) => {
      getLocationMutate({ place: value });
    }, 500);
  }, [getLocationMutate]);

  return (
    <>
      {isEditing ? (
        <Form {...generalEditForm}>
          <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold ">General Information</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-7">
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Registration number (CNPJ or similar)
                </label>
                <FormField
                  control={generalEditForm.control}
                  name="registerNumber"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          generalEditForm.formState.errors.registerNumber
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="Registration Number*"
                      />
                      {generalEditForm.formState.errors.registerNumber && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            generalEditForm.formState.errors.registerNumber
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="lg:col-start-1 lg:row-start-2 col-auto">
                <FormField
                  control={generalEditForm.control}
                  name="dateOfIncorporation"
                  render={({ field }) => (
                    <div className="space-y-2 ">
                      <Popover
                        open={popoverOpen.startDate}
                        onOpenChange={(open) => {
                          setPopoverOpen((prev) => ({
                            ...prev,
                            startDate: open,
                          }));
                          setIsChildOpen(open); // Update child open state
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " lg:h-[52px] h-12 rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] text-[#122D4F] px-3 py-2 font-medium leading-normal placeholder:!opacity-100 placeholder:!font-medium w-full hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F text-sm",
                              !field.value && "text-muted-foreground",
                              generalEditForm.formState.errors
                                .dateOfIncorporation && "border-red04",
                            )}
                            disabled={field.disabled}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-sm leading-normal text-blueDark4F/80">
                                Date of Incorporation*
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              field.onChange(date!.getTime());
                              setPopoverOpen((prev) => ({
                                ...prev,
                                startDate: false,
                              }));
                              setIsChildOpen(false); // Close child state on selection
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return (
                                date >= today || date < new Date("1900-01-01")
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {generalEditForm.formState.errors.dateOfIncorporation && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            generalEditForm.formState.errors.dateOfIncorporation
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="row-span-2 col-start-2 row-start-1">
                <div className="space-y-2">
                  <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                    Company Logo
                  </label>
                  <FormField
                    control={generalEditForm.control}
                    name="companyLogo"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FileUpload
                          type="image"
                          id="companyLogo"
                          value={field.value}
                          disabled={field.disabled}
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
                                    generalEditForm.setValue(
                                      "companyLogo",
                                      data.data,
                                    );
                                  },
                                },
                              );
                            } else {
                              generalEditForm.setValue("companyLogo", "");
                            }
                          }}
                          className={`min-h-[138px] bg-white  ${
                            generalEditForm.formState.errors.companyLogo
                              ? "border-red04"
                              : ""
                          }`}
                        />
                        {generalEditForm.formState.errors.companyLogo && (
                          <p className="text-red04/90 text-xs font-medium">
                            {
                              generalEditForm.formState.errors.companyLogo
                                .message
                            }
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
              <FormField
                control={generalEditForm.control}
                name="companyName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.companyName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Company Name*"
                    />
                    {generalEditForm.formState.errors.companyName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="firstName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.firstName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="First Name"
                      disabled
                    />
                    {generalEditForm.formState.errors.firstName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="lastName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.lastName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Last Name"
                      disabled
                    />
                    {generalEditForm.formState.errors.lastName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.email
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Email*"
                      disabled
                    />
                    {generalEditForm.formState.errors.email && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="mobile"
                render={({ field }) => (
                  <div className="space-y-2 col-span-2 lg:col-span-1">
                    <UiPhoneInput
                      {...field}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="Phone Number*"
                      shadow={true}
                      error={!!generalEditForm.formState.errors.mobile}
                      disabled
                    />
                    {generalEditForm.formState.errors.mobile && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.mobile.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="taxId"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.taxId
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="TAX ID*"
                    />
                    {generalEditForm.formState.errors.taxId && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.taxId.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="dunsId"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.dunsId
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="DUNS ID"
                    />
                    {generalEditForm.formState.errors.dunsId && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.dunsId.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="gstNumber"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.gstNumber
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="VAT / GST Number*"
                    />
                    {generalEditForm.formState.errors.gstNumber && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalEditForm.formState.errors.gstNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalEditForm.control}
                name="natureOfbussiness"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.natureOfbussiness
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Nature of business*"
                    />
                    {generalEditForm.formState.errors.natureOfbussiness && (
                      <p className="text-red04/90 text-xs font-medium">
                        {
                          generalEditForm.formState.errors.natureOfbussiness
                            .message
                        }
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 w-full pt-5">
              <FormField
                control={generalEditForm.control}
                name="registeredAddress"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                      Registered Address
                      <span className="text-red-600">*</span>
                    </label>
                    <Input
                      {...field}
                      onInput={(e) =>
                        debouncedResults((e.target as HTMLInputElement).value)
                      }
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalEditForm.formState.errors.registeredAddress
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Registered Address"
                    />
                    {generalEditForm.formState.errors.registeredAddress && (
                      <p className="text-red04/90 text-xs font-medium">
                        {
                          generalEditForm.formState.errors.registeredAddress
                            .message
                        }
                      </p>
                    )}
                  </div>
                )}
              />
              {showSuggestions && predictionResults.length > 0 && (
                <ul
                  ref={dropdownRef}
                  className="custom-list shadow-lg border border-[#efefef] p-3 flex-col justify-start rounded-lg"
                >
                  {/* <li
                    className="custom-list-item cursor-pointer hover:bg-[#fbfbfb]  text-[14px]"
                    onClick={() => handleSuggestionClick()}
                  >
                    {generalEditForm.watch("registeredAddress")}
                  </li> */}
                  {predictionResults.map(({ place_id, description }) => {
                    return (
                      <li
                        key={place_id}
                        className="custom-list-item cursor-pointer hover:bg-[#fbfbfb] flex justify-start items-center gap-2 border-b py-2 text-[14px]"
                        onClick={() => handleSuggestionClick(place_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="min-w-[14px] min-h-[14px]"
                        >
                          <g clip-path="url(#clip0_334_616)">
                            <path
                              opacity="0.5"
                              d="M6.99984 3.5C6.53835 3.5 6.08722 3.63685 5.70351 3.89324C5.31979 4.14963 5.02072 4.51404 4.84412 4.94041C4.66751 5.36677 4.62131 5.83592 4.71134 6.28854C4.80137 6.74117 5.0236 7.15693 5.34992 7.48325C5.67625 7.80957 6.09201 8.0318 6.54463 8.12183C6.99725 8.21186 7.46641 8.16566 7.89277 7.98905C8.31913 7.81245 8.68354 7.51338 8.93993 7.12966C9.19632 6.74595 9.33317 6.29482 9.33317 5.83333C9.33317 5.21449 9.08734 4.621 8.64975 4.18342C8.21217 3.74583 7.61868 3.5 6.99984 3.5ZM6.99984 7C6.76909 7 6.54353 6.93158 6.35167 6.80338C6.15982 6.67519 6.01028 6.49298 5.92198 6.2798C5.83368 6.06662 5.81057 5.83204 5.85559 5.60573C5.90061 5.37942 6.01172 5.17154 6.17488 5.00838C6.33804 4.84521 6.54592 4.7341 6.77223 4.68908C6.99854 4.64407 7.23312 4.66717 7.4463 4.75547C7.65948 4.84378 7.84169 4.99331 7.96989 5.18517C8.09808 5.37703 8.16651 5.60259 8.16651 5.83333C8.16651 6.14275 8.04359 6.4395 7.8248 6.65829C7.606 6.87708 7.30926 7 6.99984 7Z"
                              fill="#080808"
                            />
                            <path
                              opacity="0.5"
                              d="M7.00018 13.9999C6.50898 14.0025 6.02433 13.8873 5.5868 13.664C5.14928 13.4407 4.77161 13.1158 4.48543 12.7166C2.26235 9.65003 1.13477 7.3447 1.13477 5.8642C1.13477 4.30859 1.75273 2.8167 2.85271 1.71672C3.95269 0.616741 5.44458 -0.0012207 7.00018 -0.0012207C8.55579 -0.0012207 10.0477 0.616741 11.1477 1.71672C12.2476 2.8167 12.8656 4.30859 12.8656 5.8642C12.8656 7.3447 11.738 9.65003 9.51493 12.7166C9.22875 13.1158 8.85109 13.4407 8.41356 13.664C7.97604 13.8873 7.49138 14.0025 7.00018 13.9999ZM7.00018 1.2722C5.78243 1.27359 4.61494 1.75795 3.75386 2.61904C2.89277 3.48012 2.40841 4.64761 2.40702 5.86536C2.40702 7.03786 3.51127 9.20611 5.5156 11.9705C5.68575 12.2049 5.90898 12.3957 6.16702 12.5272C6.42505 12.6587 6.71056 12.7273 7.00018 12.7273C7.28981 12.7273 7.57532 12.6587 7.83335 12.5272C8.09138 12.3957 8.31461 12.2049 8.48477 11.9705C10.4891 9.20611 11.5934 7.03786 11.5934 5.86536C11.592 4.64761 11.1076 3.48012 10.2465 2.61904C9.38542 1.75795 8.21794 1.27359 7.00018 1.2722Z"
                              fill="#080808"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_334_616">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {description}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="pt-5 space-y-2">
              <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                Address Line 2
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormField
                  control={generalEditForm.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          generalEditForm.formState.errors.addressLine2
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="Address Line 2"
                      />
                      {generalEditForm.formState.errors.addressLine2 && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            generalEditForm.formState.errors.addressLine2
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={generalEditForm.control}
                  name="country"
                  render={({ field }) => (
                    <div className="space-y-2" ref={popoverRef}>
                      <Popover
                        open={isPopoverOpen}
                        onOpenChange={setIsPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                              !field.value && "text-muted-foreground",
                              generalEditForm.formState.errors.country &&
                                "border-red04",
                            )}
                            disabled={field.disabled}
                          >
                            {field.value ? (
                              countryList.find(
                                (country) => country.name === field.value,
                              )?.name
                            ) : (
                              <span className="text-[#122D4F99]">
                                Select Country*
                              </span>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="7"
                              viewBox="0 0 13 7"
                              fill="none"
                              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                            >
                              <path
                                opacity="0.6"
                                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                                fill="#122D4F"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{ width: `${popoverWidth}px` }}
                        >
                          <Command>
                            <CommandInput placeholder="Search Country..." />
                            <CommandList>
                              <CommandEmpty>No Country found.</CommandEmpty>
                              <CommandGroup>
                                {countryList.map((country) => (
                                  <CommandItem
                                    value={country.name}
                                    key={country.isoCode}
                                    onSelect={(e) => {
                                      setIsPopoverOpen(false);
                                      generalEditForm.setValue("state", "");
                                      generalEditForm.setValue("city", "");
                                      return field.onChange(e);
                                    }}
                                  >
                                    {country.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        country.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {generalEditForm.formState.errors.country && (
                        <p className="text-red04/90 text-xs font-medium">
                          {generalEditForm.formState.errors.country.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={generalEditForm.control}
                  name="state"
                  render={({ field }) => (
                    <div className="space-y-2" ref={popoverRef}>
                      <Popover
                        open={isPopoverOpen2}
                        onOpenChange={setIsPopoverOpen2}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                              !field.value && "text-muted-foreground",
                              generalEditForm.formState.errors.state &&
                                "border-red04",
                            )}
                            disabled={field.disabled}
                          >
                            {field.value ? (
                              stateList.find(
                                (state) => state.name === field.value,
                              )?.name
                            ) : (
                              <span className="text-[#122D4F99]">
                                Select State*
                              </span>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="7"
                              viewBox="0 0 13 7"
                              fill="none"
                              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                            >
                              <path
                                opacity="0.6"
                                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                                fill="#122D4F"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{ width: `${popoverWidth}px` }}
                        >
                          <Command>
                            <CommandInput placeholder="search state" />
                            <CommandList>
                              <CommandEmpty>No State found.</CommandEmpty>
                              <CommandGroup>
                                {stateList.map((state) => (
                                  <CommandItem
                                    value={state.name}
                                    key={state.isoCode}
                                    onSelect={(e) => {
                                      setIsPopoverOpen2(false);
                                      generalEditForm.setValue("city", "");
                                      return field.onChange(e);
                                    }}
                                  >
                                    {state.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        state.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {generalEditForm.formState.errors.state && (
                        <p className="text-red04/90 text-xs font-medium">
                          {generalEditForm.formState.errors.state.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={generalEditForm.control}
                  name="city"
                  render={({ field }) => (
                    <div className="space-y-2" ref={popoverRef}>
                      <Popover
                        open={isPopoverOpen3}
                        onOpenChange={setIsPopoverOpen3}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                              !field.value && "text-muted-foreground",
                              generalEditForm.formState.errors.city &&
                                "border-red04",
                            )}
                            disabled={field.disabled}
                          >
                            {field.value ? (
                              cityList.find((city) => city.name === field.value)
                                ?.name
                            ) : (
                              <span className="text-[#122D4F99]">
                                Select City*
                              </span>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="7"
                              viewBox="0 0 13 7"
                              fill="none"
                              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                            >
                              <path
                                opacity="0.6"
                                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                                fill="#122D4F"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 w-full"
                          style={{ width: `${popoverWidth}px` }}
                        >
                          <div className="w-full">
                            {" "}
                            {/* Ensuring the dropdown content width is the same as the input */}
                            <Command>
                              <CommandInput placeholder="Search City..." />
                              <CommandList>
                                <CommandEmpty>No City found.</CommandEmpty>
                                <CommandGroup>
                                  {cityList.map((city) => (
                                    <CommandItem
                                      value={city.name}
                                      key={city.name}
                                      onSelect={(e) => {
                                        setIsPopoverOpen3(false);

                                        return field.onChange(e);
                                      }}
                                      // onSelect={field.onChange}
                                    >
                                      {city.name}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          city.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </div>
                        </PopoverContent>
                      </Popover>
                      {generalEditForm.formState.errors.city && (
                        <p className="text-red04/90 text-xs font-medium">
                          {generalEditForm.formState.errors.city.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <FormField
                  control={generalEditForm.control}
                  name="zipCode"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        className={`h-[52px] bg-[#FBFBFB] ${
                          generalEditForm.formState.errors.zipCode
                            ? "border-red04"
                            : ""
                        }`}
                        placeholder="Zip Code*"
                      />
                      {generalEditForm.formState.errors.zipCode && (
                        <p className="text-red04/90 text-xs font-medium">
                          {generalEditForm.formState.errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {!generalEditForm.formState.disabled && (
              <div className="flex justify-end mt-5 lg:mt-10">
                <ButtonComponent
                  type="button"
                  variant="primary"
                  className="capitalize px-8 max-w-[104px] w-full"
                  onClick={generalEditForm.handleSubmit(onSubmit)}
                  disabled={generalEditForm.formState.isSubmitting}
                >
                  Next
                </ButtonComponent>
              </div>
            )}
          </div>
        </Form>
      ) : (
        <Form {...generalForm}>
          <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold ">General Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
              <FormField
                control={generalForm.control}
                name="registerNumber"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalForm.formState.errors.registerNumber
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Registration Number*"
                    />
                    {generalForm.formState.errors.registerNumber && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.registerNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={generalForm.control}
                name="companyName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalForm.formState.errors.companyName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Company Name*"
                    />
                    {generalForm.formState.errors.companyName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={generalForm.control}
                name="firstName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalForm.formState.errors.firstName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="First Name"
                      disabled
                    />
                    {generalForm.formState.errors.firstName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalForm.control}
                name="lastName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalForm.formState.errors.lastName
                          ? "border-red04"
                          : ""
                      }`}
                      placeholder="Last Name"
                      disabled
                    />
                    {generalForm.formState.errors.lastName && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalForm.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        generalForm.formState.errors.email ? "border-red04" : ""
                      }`}
                      placeholder="Email*"
                      disabled
                    />
                    {generalForm.formState.errors.email && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={generalForm.control}
                name="mobile"
                render={({ field }) => (
                  <div className="space-y-2 col-span-2 lg:col-span-1">
                    <UiPhoneInput
                      {...field}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="Phone Number*"
                      shadow={true}
                      error={!!generalForm.formState.errors.mobile}
                      disabled
                    />
                    {generalForm.formState.errors.mobile && (
                      <p className="text-red04/90 text-xs font-medium">
                        {generalForm.formState.errors.mobile.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end mt-5 lg:mt-10">
              <ButtonComponent
                type="button"
                variant="primary"
                className="capitalize px-8 max-w-[104px] w-full"
                onClick={generalForm.handleSubmit(onSubmit)}
                disabled={generalForm.formState.isSubmitting}
              >
                Save
              </ButtonComponent>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

export const buyerContactDetailsSchema = yup.object().shape(
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
    website: yup
      .string()
      .matches(
        /^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/,
        "Kindly provide a valid URL beginning with either 'http://' or 'https://'",
      )
      .required("Website is required"),
  },
  [["faxNumber", "faxNumber"]],
);

function ContactDetails({
  schema,
}: {
  schema: typeof buyerContactDetailsSchema;
}) {
  const searchParams = useSearchParams();
  const form = useFormContext<yup.InferType<typeof schema>>();
  const id = searchParams.get("id");

  return (
    <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold ">Contact details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
        <FormField
          control={form.control}
          name="faxNumber"
          render={({ field }) => (
            <div className="space-y-2 col-span-2 lg:col-span-1">
              <Input
                {...field}
                className={`h-[52px] bg-[#FBFBFB] ${
                  form.formState.errors.faxNumber ? "border-red04" : ""
                }`}
                placeholder="Fax Number"
              />
              {form.formState.errors.faxNumber && (
                <p className="text-red04/90 text-xs font-medium">
                  {form.formState.errors.faxNumber.message}
                </p>
              )}
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <div className="space-y-2 col-span-2">
              <Input
                {...field}
                className={`h-[52px] bg-[#FBFBFB] ${
                  form.formState.errors.website ? "border-red04" : ""
                }`}
                placeholder="Website*"
              />
              {form.formState.errors.website && (
                <p className="text-red04/90 text-xs font-medium">
                  {form.formState.errors.website.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      {!form.formState.disabled && (
        <div className="flex justify-end mt-5 lg:mt-10">
          <ButtonComponent
            type="submit"
            variant="primary"
            className="capitalize px-8 max-w-[104px] w-full"
            disabled={!id || form.formState.isSubmitting}
          >
            Next
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}

export default BuyerGeneralInformationForm;
