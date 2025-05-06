"use client";

import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { format } from "date-fns";
import { Country } from "country-state-city";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, Check, ChevronsDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/common/file-upload-2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import usePopoverWidth from "@/components/common/usePopoverWidth";
import { UseProductFileUpload } from "@/services/query-components/seller-product.query-components.services";
import MultiFileUploadProduct from "@/components/common/multiFileUploadProduct";

export const certificateFormSchema = yup.object({
  certificates: yup
    .array(yup.string().required())
    .min(1, "At least one certificate is required")
    .required("Certificates are required"),
  analysisDate: yup.number().optional(),
  certificateCountry: yup.string().optional(),
});

export default function CertificationForm({ isSeller }: { isSeller: boolean }) {
  const form = useFormContext<yup.InferType<typeof certificateFormSchema>>();
  const { popoverRef, popoverWidth } = usePopoverWidth();
  const countryList = Country.getAllCountries();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const successCallback = (data: any) => {
    form.clearErrors("certificates");
  };
  const failureCallback = () => {};
  const { mutateAsync: productFileUploadMutate } = UseProductFileUpload(
    successCallback,
    failureCallback,
  );

  const handleUrlChange = useCallback(
    (urls: string[]) => form.setValue("certificates", [...urls]),
    [form],
  );

  return (
    <div className="second-tab">
      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <h2 className="text-[#122D4F] text-[20px] font-medium leading-[28.8px] py-4 px-5 border-b border-[#122D4F/13]">
          Certification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <FormField
            control={form.control}
            name="certificates"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Upload Certificate<span className="text-red-500">*</span>
                </label>
                <MultiFileUploadProduct
                  type="all"
                  className="py-[42px] border-dashed bg-white"
                  initialData={field.value}
                  fileUploadApi={productFileUploadMutate}
                  fileType="certificates"
                  onUrlsChange={handleUrlChange}
                  disabled={field.disabled}
                />
                {form.formState.errors.certificates && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.certificates.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <h2 className="text-[#122D4F] text-[20px] font-medium leading-[28.8px] py-4 px-5 border-b border-[#122D4F/13]">
          Date of Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 p-5">
          <FormField
            control={form.control}
            name="analysisDate"
            render={({ field }) => (
              <div className="space-y-2 ">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={field.disabled}
                      variant={"outline"}
                      className={cn(
                        " lg:h-[52px] h-12 md:text-base rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] text-[#122D4F] px-3 py-2 text-sm font-medium leading-normal placeholder:!opacity-100 md:placeholder:!text-base placeholder:!text-[16px] placeholder:!font-medium w-full hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F",
                        !field.value && "text-muted-foreground",
                        form.formState.errors.analysisDate
                          ? "border-red04 text-red04"
                          : "",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date!.getTime());
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.analysisDate && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.analysisDate.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="certificateCountry"
            render={({ field }) => (
              <div className="space-y-2" ref={popoverRef}>
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Select Country
                </label>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={field.disabled}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        countryList.find(
                          (country) => country.name === field.value,
                        )?.name
                      ) : (
                        <span className="text-[#122D4F99]">Select Country</span>
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
                {form.formState.errors.certificateCountry && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.certificateCountry.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      {isSeller && (
        <div className="flex justify-end">
          <ButtonComponent type="submit" variant="primary" className="px-8">
            Next
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}
