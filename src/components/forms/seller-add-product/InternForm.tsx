"use client";

import React from "react";
import * as yup from "yup";
import { useFormContext } from "react-hook-form";

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
  UseProductAction,
  UseSaveProductFinalInfo,
} from "@/services/query-components/seller-product.query-components.services";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/utils/route.utils";

export const internInfoFormSchema = yup.object({
  verifiedOnline: yup.string().optional(),
  verifiedInSite: yup.string().optional(),
  verifiedOnlineAndSite: yup.string().optional(),
});

export default function InternForm({ isSeller }: { isSeller: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useFormContext<yup.InferType<typeof internInfoFormSchema>>();
  const productId = searchParams.get("id");

  const successCallback = (data: any) => {
    router.push(ROUTES.SELLER_PRODUCT_LISTING);
  };
  const failureCallback = (statusCode: string) => {};
  const { mutate: productActionMutate, isPending } = UseProductAction(
    successCallback,
    failureCallback,
  );

  const successCallbackForFinal = (data: any) => {
    productActionMutate({ id: productId!, type: "PUBLISHED" });
  };
  const failureCallbackForFinal = () => {};
  const { mutate: saveProductFinalInfoMutate } = UseSaveProductFinalInfo(
    successCallbackForFinal,
    failureCallbackForFinal,
  );

  return (
    <div className="seventh-tab">
      <div className="bg-white rounded-lg shadow-sm  mb-6">
        <div className="flex justify-between items-center pt-3 px-5 border-b border-[#122D4F/13] pb-3 ">
          <h2 className="text-xl font-semibold ">Intern</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <FormField
            control={form.control}
            name="verifiedOnline"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Verified Online
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.verifiedOnline
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
                {form.formState.errors.verifiedOnline && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.verifiedOnline.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="verifiedInSite"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Verified In site
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.verifiedInSite
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
                {form.formState.errors.verifiedInSite && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.verifiedInSite.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="verifiedOnlineAndSite"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Verified Online and In Site
                </label>
                <Select
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ${
                      form.formState.errors.verifiedOnlineAndSite
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
                {form.formState.errors.verifiedOnlineAndSite && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.verifiedOnlineAndSite.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        {isSeller ? (
          <>
            <ButtonComponent
              variant="primary"
              type="submit"
              className="bg-[#1B2B65] text-[#F7F9FC] text-[14px] font-semibold leading-normal px-8 max-w-[104px] w-full"
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              variant="primary"
              type="submit"
              className="bg-[#1B2B65] text-[#F7F9FC] text-[14px] font-semibold leading-normal px-8 max-w-[104px] w-full"
            >
              Draft
            </ButtonComponent>
            <ButtonComponent
              variant="primary"
              type="button"
              className="bg-[#1B2B65] text-[#F7F9FC] text-[14px] font-semibold leading-normal px-8 max-w-[104px] w-full"
              onClick={() => {
                if (productId) saveProductFinalInfoMutate({ id: productId });
              }}
              disabled={isPending}
            >
              Publish
            </ButtonComponent>
          </>
        ) : (
          <ButtonComponent
            variant="primary"
            type="submit"
            className="bg-[#1B2B65] text-[#F7F9FC] text-[14px] font-semibold leading-normal px-8 max-w-[104px] w-full"
          >
            Save
          </ButtonComponent>
        )}
      </div>
    </div>
  );
}
