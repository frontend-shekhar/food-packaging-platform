"use client";

import * as yup from "yup";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { FileUpload } from "@/components/common/file-upload-2";
import { UseBuyerFileUpload } from "@/services/query-components/buyer.query-components.services";
import { ButtonComponent } from "@/components/common/ButtonComponent";

export const buyerDocumentsSchema = yup.object().shape({
  certificates: yup.string().required("Certificate is required"),
  licenses: yup.string().required("License is required"),
  awards: yup.string().optional(),
  laborCertificates: yup.string().optional(),
  letterOfCorporation: yup
    .string()
    .required("Letter of Incorporation is required"),
  otherDocuments: yup.string().optional(),
});

function DocumentsForm({ schema }: { schema: typeof buyerDocumentsSchema }) {
  const form = useFormContext<yup.InferType<typeof schema>>();

  const successCallbackForFile = (data: any) => {};
  const failureCallbackForFile = () => {};
  const { mutate: fileUploadMutate } = UseBuyerFileUpload(
    successCallbackForFile,
    failureCallbackForFile,
  );

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg  shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold ">
            Documents and certification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 pt-7">
          <FormField
            control={form.control}
            name="certificates"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Certificates*
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="certificates"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "certificates",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("certificates", data.data);
                          },
                        },
                      );
                    } else {
                      form.setValue("certificates", "");
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.certificates ? "border-red04" : ""
                  }`}
                />
                {form.formState.errors.certificates && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.certificates.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="licenses"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Licenses*
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="licenses"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "licenses",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("licenses", data.data);
                          },
                        },
                      );
                    } else {
                      form.setValue("licenses", "");
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.licenses ? "border-red04" : ""
                  }`}
                />
                {form.formState.errors.licenses && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.licenses.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="awards"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Awards
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="awards"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "awards",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("awards", data.data);
                          },
                        },
                      );
                    } else {
                      form.setValue("awards", "");
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.awards ? "border-red04" : ""
                  }`}
                />
                {form.formState.errors.awards && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.awards.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="laborCertificates"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Labor certificates
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="laborCertificates"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "laborCertificates",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("laborCertificates", data.data);
                          },
                        },
                      );
                    } else {
                      form.setValue("laborCertificates", "");
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.laborCertificates
                      ? "border-red04"
                      : ""
                  }`}
                />
                {form.formState.errors.laborCertificates && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.laborCertificates.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="letterOfCorporation"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Letter of Incorporation*
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="letterOfCorporation"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "letterOfCorporation",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("letterOfCorporation", data.data);
                          },
                        },
                      );
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.letterOfCorporation
                      ? "border-red04"
                      : ""
                  }`}
                />
                {form.formState.errors.letterOfCorporation && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.letterOfCorporation.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="otherDocuments"
            render={({ field }) => (
              <div className="space-y-2 h-full">
                <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
                  Other documents
                </label>
                <FileUpload
                  type="all"
                  value={field.value}
                  id="otherDocuments"
                  disabled={field.disabled}
                  onFileSelect={(file) => {
                    field.onChange(file);
                    if (file) {
                      fileUploadMutate(
                        {
                          data: { file },
                          type: "otherDocuments",
                        },
                        {
                          onSuccess(data, variables, context) {
                            form.setValue("otherDocuments", data.data);
                          },
                        },
                      );
                    } else {
                      form.setValue("otherDocuments", "");
                    }
                  }}
                  className={`min-h-[125px] bg-white ${
                    form.formState.errors.otherDocuments ? "border-red04" : ""
                  }`}
                />
                {form.formState.errors.otherDocuments && (
                  <p className="text-red04/90 text-xs font-medium">
                    {form.formState.errors.otherDocuments.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {!form.formState.disabled && (
          <div className="flex justify-end mt-5 lg:mt-6">
            <ButtonComponent
              type="submit"
              variant="primary"
              className="capitalize px-8 max-w-[104px] w-full"
              disabled={form.formState.isSubmitting}
            >
              Next
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentsForm;
