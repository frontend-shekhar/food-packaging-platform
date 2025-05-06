"use client";

import React from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ButtonComponent } from "@/components/common/ButtonComponent";

export const buyerFinancialInfoSchema = yup.object().shape({
  listedOnStockExchange: yup
    .string()
    .oneOf(["yes", "no", "no-response"])
    .default("yes"),
  capital: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? 0 : value))
    .min(0, "Capital cannot be negative")
    .integer("Capital must be an integer")
    .optional(),
  totalAssets: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? 0 : value))
    .min(0, "Total Assets cannot be negative")
    .integer("Capital must be an integer")
    .optional(),
  turnOverCurrent: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? 0 : value))
    .min(0, "Turnover cannot be negative")
    .optional(),
  turnOverLast: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? 0 : value))
    .min(0, "Turnover cannot be negative")
    .optional(),
  auditors: yup
    .string()
    .trim("Please enter valid auditors")
    .strict()
    .optional(),
});

function FinancialInformationForm({
  schema,
}: {
  schema: typeof buyerFinancialInfoSchema;
}) {
  const form = useFormContext<yup.InferType<typeof schema>>();

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold ">Financial information </h2>
        </div>

        <div className="grid grid-cols-1 pt-7">
          <FormField
            control={form.control}
            name="listedOnStockExchange"
            render={({ field }) => (
              <div className="flex flex-col gap-5 bg-[#F0F1F7] rounded-[8px] p-4">
                <label className="text-black text-[16px] font-medium leading-normal">
                  Are you listed on a Stock Exchange?
                </label>
                <div className="flex justify-start items-center gap-[43px]">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={field.disabled}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="option-yes" />
                      <Label htmlFor="option-yes" className="cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="option-no" />
                      <Label htmlFor="option-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no-response"
                        id="option-no-response"
                      />
                      <Label
                        htmlFor="option-no-response"
                        className="cursor-pointer"
                      >
                        No Response
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          />
        </div>

        {form.watch("listedOnStockExchange") === "yes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            <FormField
              control={form.control}
              name="capital"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.capital ? "border-red04" : ""
                    }`}
                    placeholder="Capital"
                  />
                  {form.formState.errors.capital && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.capital.message}
                    </p>
                  )}
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="totalAssets"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.totalAssets ? "border-red04" : ""
                    }`}
                    placeholder="Total Assets"
                  />
                  {form.formState.errors.totalAssets && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.totalAssets.message}
                    </p>
                  )}
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="turnOverCurrent"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.turnOverCurrent
                        ? "border-red04"
                        : ""
                    }`}
                    placeholder="Turnover (current year)"
                  />
                  {form.formState.errors.turnOverCurrent && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.turnOverCurrent.message}
                    </p>
                  )}
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="turnOverLast"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.turnOverLast ? "border-red04" : ""
                    }`}
                    placeholder="Turnover (last year)"
                  />
                  {form.formState.errors.turnOverLast && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.turnOverLast.message}
                    </p>
                  )}
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="auditors"
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    className={`h-[52px] bg-[#FBFBFB] ${
                      form.formState.errors.auditors ? "border-red04" : ""
                    }`}
                    placeholder="Auditors"
                  />
                  {form.formState.errors.auditors && (
                    <p className="text-red04/90 text-xs font-medium">
                      {form.formState.errors.auditors.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {!form.formState.disabled && (
          <div className="flex justify-end mt-5 lg:mt-10">
            <ButtonComponent
              type="submit"
              variant="primary"
              className="capitalize px-8 max-w-[104px] w-full"
            >
              Submit
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinancialInformationForm;
