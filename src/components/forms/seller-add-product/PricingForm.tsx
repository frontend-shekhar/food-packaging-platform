import React from "react";
import * as yup from "yup";
import { CalendarIcon, Check } from "lucide-react";
import { Country } from "country-state-city";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
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
import usePopoverWidth from "@/components/common/usePopoverWidth";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export const pricingFormSchema = yup.object({
  minOrderQuantity: yup
    .number()
    .min(1, "Please enter valid value")
    .integer("Please enter valid value")
    .typeError("Please enter valid value")
    .required("Minimum Order Quantity is required"),
  pricingStructure: yup.string().required("Pricing Structure is required"),
  cifPrice: yup
    .number()
    .min(1, "Please enter valid value")
    .typeError("Please enter valid value")
    .required("CIF Price is required"),
  fobPrice: yup
    .number()
    .min(1, "Please enter valid value")
    .typeError("Please enter valid value")
    .required("FOB Price is required"),
  currency: yup.string().required("Currency is required"),
  priceValidity: yup.number().required("Price Validity is required"),
  smallOrder: yup.string().required("Small Orders is required"),
  sampleAvailibility: yup.string().required("Sample Availibility is required"),
  paymentType: yup.string().required("Payment Type is required"),
});

export default function PricingForm({ isSeller }: { isSeller: boolean }) {
  const form = useFormContext<yup.InferType<typeof pricingFormSchema>>();
  const { popoverRef, popoverWidth } = usePopoverWidth();
  const currencyList: string[] = [];

  const countryList = Country.getAllCountries();
  countryList.forEach((country) => {
    if (!currencyList.includes(country.currency)) {
      currencyList.push(country.currency);
    }
  });

  return (
    <div className="fifth-tab">
      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <div className="flex justify-between items-center pt-3 px-5 border-b border-[#122D4F/13] pb-3 ">
          <h2 className="text-xl font-semibold ">Pricing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <FormField
            control={form.control}
            name="minOrderQuantity"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Minimum Order Quantity
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  type="number"
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.minOrderQuantity
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Enter Minimum Order Quantity"
                />
                {form.formState.errors.minOrderQuantity && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.minOrderQuantity.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="pricingStructure"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Pricing Structure
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.pricingStructure
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
                    <SelectItem value="flat-rate">Flat Rate Pricing</SelectItem>
                    <SelectItem value="tiered">Tiered Pricing</SelectItem>
                    <SelectItem value="bulk">Bulk Pricing</SelectItem>
                    <SelectItem value="per-unit">Per Unit Pricing</SelectItem>
                    <SelectItem value="subscription">
                      Subscription Pricing
                    </SelectItem>
                    <SelectItem value="freemium">Freemium Pricing</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.pricingStructure && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.pricingStructure.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="cifPrice"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  CIF Price
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  type="number"
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.cifPrice
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Enter CIF Price"
                />
                {form.formState.errors.cifPrice && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.cifPrice.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="fobPrice"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  FOB Price
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  {...field}
                  type="number"
                  className={`h-[52px] bg-[#FBFBFB] ${
                    form.formState.errors.fobPrice
                      ? "border-red04 text-red04"
                      : ""
                  }`}
                  placeholder="Enter FOB Price"
                />
                {form.formState.errors.fobPrice && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.fobPrice.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <div className="space-y-2" ref={popoverRef}>
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Currency
                  <span className="text-red-500">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={field.disabled}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                        !field.value && "text-muted-foreground ",
                        form.formState.errors.currency
                          ? "border-red04 text-red04"
                          : "",
                      )}
                    >
                      {field.value ? (
                        field.value
                      ) : (
                        <span className="text-[#122D4F99]">Select</span>
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
                        <CommandEmpty>No Currency found.</CommandEmpty>
                        <CommandGroup>
                          {currencyList.map((curr) => (
                            <CommandItem
                              value={curr}
                              key={curr}
                              onSelect={field.onChange}
                            >
                              {curr}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  curr === field.value
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
                {form.formState.errors.currency && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.currency.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="priceValidity"
            render={({ field }) => (
              <div className="space-y-2 ">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Price validity<span className="text-red-500">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={field.disabled}
                      variant={"outline"}
                      className={cn(
                        " lg:h-[52px] h-12 md:text-base rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] text-[#122D4F] px-3 py-2 text-sm font-medium leading-normal placeholder:!opacity-100 md:placeholder:!text-base placeholder:!text-[16px] placeholder:!font-medium w-full hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F",
                        !field.value && "text-muted-foreground",
                        form.formState.errors.priceValidity
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
                      selected={new Date(field.value)}
                      onSelect={(date) => {
                        field.onChange(date!.getTime());
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.priceValidity && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.priceValidity.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="smallOrder"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Small Orders
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.smallOrder
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
                {form.formState.errors.smallOrder && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.smallOrder.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="sampleAvailibility"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Sample Availability
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.sampleAvailibility
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
                {form.formState.errors.sampleAvailibility && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.sampleAvailibility.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Payment Type
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.paymentType
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
                    <SelectItem value="credit-cards">Credit Cards</SelectItem>
                    <SelectItem value="debit-cards">Debit Cards</SelectItem>
                    <SelectItem value="net-banking">Net Banking</SelectItem>
                    <SelectItem value="upi">
                      UPI (Unified Payments Interface)
                    </SelectItem>
                    <SelectItem value="digital-wallets">
                      Digital Wallets
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.paymentType && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.paymentType.message}
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
