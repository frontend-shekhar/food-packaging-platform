import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { FileUpload } from "@/components/common/file-upload-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import usePopoverWidth from "@/components/common/usePopoverWidth";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Country } from "country-state-city";
import MultiFileUploadProduct from "@/components/common/multiFileUploadProduct";
import { UseProductFileUpload } from "@/services/query-components/seller-product.query-components.services";

export const productInfoSchema = yup.object().shape(
  {
    id: yup.string().optional(),
    productId: yup.string().required("Product Id is required"),
    category: yup.string().required("Product Category is required"),
    name: yup.string().required("Product Name is required"),
    country: yup.string().optional(),
    phosphrous: yup
      .number()
      .min(0, "Please enter valid value")
      .max(100, "Please enter valid value")
      .required("Phosphrous is required")
      .typeError("Phosphrous is required"),
    mn: yup
      .number()
      .min(0, "Please enter valid value")
      .max(100, "Please enter valid value")
      .required("Manganese is required")
      .typeError("Manganese is required"),
    granularity: yup.string().required("Granularity is required"),
    impurities: yup.string().optional(),
    moisture: yup.string().trim().required("Moisture is required"),
    moisture1: yup
      .number()
      .min(1, "Please enter valid value")
      .max(100, "Please enter valid value")
      .typeError("Percentage is required")
      .required("Percentage is required"),
    moisture2: yup
      .number()
      .min(1, "Please enter valid value")
      .max(100, "Please enter valid value")
      .typeError("Percentage is required")
      .required("Percentage is required"),
    moisture3: yup
      .number()
      .min(1, "Please enter valid value")
      .max(100, "Please enter valid value")
      .typeError("Percentage is required")
      .required("Percentage is required"),
    productImages: yup
      .array(yup.string().required())
      .min(1, "At least one product image is required")
      .required("Product Images are required"),
  },
  [["mn", "mn"]],
);

export default function ProductInfoForm({ isSeller }: { isSeller: boolean }) {
  const form = useFormContext<yup.InferType<typeof productInfoSchema>>();
  const { popoverRef, popoverWidth } = usePopoverWidth();
  const countryList = Country.getAllCountries();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const successCallback = (data: any) => {
    form.clearErrors("productImages");
  };
  const failureCallback = () => {};
  const { mutateAsync: productFileUploadMutate } = UseProductFileUpload(
    successCallback,
    failureCallback,
  );

  const handleUrlChange = useCallback(
    (urls: string[]) => form.setValue("productImages", [...urls]),
    [form],
  );

  const handleCountrySelect = (value: string) => {
    form.setValue("country", value); // Update the form value
    setIsPopoverOpen(false); // Close the Popover
  };

  return (
    <div className="first-tab">
      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <h2 className="text-xl font-semibold py-4 px-5 border-b border-[#122D4F/13]">
          Product Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 p-5">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Product ID<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.productId
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Product ID"
                  disabled
                />
                {form.formState.errors.productId && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.productId.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Product Category
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.category
                        ? "border-red04 text-red04"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Product Category" />
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
                    <SelectItem value="metallic-minerals">
                      Metallic Minerals
                    </SelectItem>
                    <SelectItem value="non-metallic-minerals">
                      Non-Metallic Minerals
                    </SelectItem>
                    <SelectItem value="rare-earth-elements">
                      Rare Earth Elements (REEs)
                    </SelectItem>
                    <SelectItem value="precious-metals">
                      Precious Metals
                    </SelectItem>
                    <SelectItem value="industrial-minerals">
                      Industrial Minerals
                    </SelectItem>
                    <SelectItem value="energy-minerals">
                      Energy Minerals
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.name ? "border-red04 text-red04" : ""
                  }`}
                  placeholder="Product Name"
                />
                {form.formState.errors.name && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <div className="space-y-2" ref={popoverRef}>
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Country
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
                              onSelect={(value) => {
                                setIsPopoverOpen(false);
                                field.onChange(value);
                                handleCountrySelect(value);
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
                {form.formState.errors.country && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.country.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="phosphrous"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  P (Phosphrous)<span className="text-red04">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.phosphrous
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Phosphrous"
                />
                {form.formState.errors.phosphrous && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.phosphrous.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="mn"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Mn<span className="text-red04">*</span>
                </label>
                <Input
                  {...field}
                  type="number"
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.mn ? "border-red04 text-red04" : ""
                  }`}
                  placeholder="Manganese"
                />
                {form.formState.errors.mn && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.mn.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="granularity"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Granularity<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.granularity
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Particle Size Distribution"
                />
                {form.formState.errors.granularity && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.granularity.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="impurities"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Impurities or Additional Elements
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.impurities
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Elements"
                />
                {form.formState.errors.impurities && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.impurities.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <h2 className="text-xl font-semibold py-4 px-5 border-b border-[#122D4F/13]">
          Moisture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 p-5">
          <FormField
            control={form.control}
            name="moisture"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Moisture<span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.moisture
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Iron"
                />
                {form.formState.errors.moisture && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.moisture.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="moisture1"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  %
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.moisture1
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Percentage"
                />
                {form.formState.errors.moisture1 && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.moisture1.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="moisture2"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  %
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.moisture2
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Percentage"
                />
                {form.formState.errors.moisture2 && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.moisture2.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="moisture3"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  %
                </label>
                <Input
                  {...field}
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.moisture3
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Percentage"
                />
                {form.formState.errors.moisture3 && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.moisture3.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <h2 className="text-xl font-semibold py-4 px-5 border-b border-[#122D4F/13]">
          Product Image<span className="text-red-500">*</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 p-5">
          <FormField
            control={form.control}
            name="productImages"
            render={({ field }) => (
              <div className="space-y-2">
                <MultiFileUploadProduct
                  type="images"
                  className="py-[42px] border-dashed bg-white"
                  initialData={field.value}
                  fileUploadApi={productFileUploadMutate}
                  fileType="productImages"
                  onUrlsChange={handleUrlChange}
                  disabled={field.disabled}
                />
                {form.formState.errors.productImages && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.productImages.message}
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
