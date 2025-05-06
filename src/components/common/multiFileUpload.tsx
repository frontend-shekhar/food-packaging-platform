import { ChangeEvent, useState } from "react";
import { Upload, File, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonComponent } from "./ButtonComponent";
import { showErrorToastMessage } from "@/utils/toast.utils";
import { sellerOnboardingLocationhUploadList } from "@/services/api-functions/sellerOnboarding.api-function.services";
import Image from "next/image";
import iconImage from "../../../public/images/icons/ic-eye-hide.svg";
interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  onUrlsChange: (urls: string[]) => void;
  onSave: (urls: string[]) => Promise<void>;
  className?: string;
  type: "logo" | "incorporation" | "companyVerificationDocuments";
  allowedFileTypes?: string[];
  multiple?: boolean;
  initialUrls?: string[];
  initialData?: any;
  disabled?: boolean;
}

interface FileWithUrl {
  file?: File;
  url: string;
  previewUrl: string;
  isInitial?: boolean;
  name?: string;
}

export function MulFileUpload({
  onFileSelect,
  onUrlsChange,
  onSave,
  className,
  type,
  allowedFileTypes,
  multiple = false,
  initialData,
  disabled,
}: FileUploadProps) {
  const [filesWithUrls, setFilesWithUrls] = useState<FileWithUrl[]>(() => {
    if (initialData?.companyVerificationDocuments?.length > 0) {
      const initialFiles = initialData.companyVerificationDocuments.map(
        (url: string) => ({
          url,
          previewUrl: url,
          isInitial: true,
          name: url.split("/").pop() || "Document",
        }),
      );
      return initialFiles;
    } else {
      return [];
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const defaultAllowedTypes =
    type === "logo"
      ? ["image/png", "image/jpeg", "image/jpg"]
      : [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

  const finalAllowedTypes = allowedFileTypes || defaultAllowedTypes;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const invalidFiles = selectedFiles.filter(
      (file) => !finalAllowedTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      showErrorToastMessage(
        type === "logo"
          ? "Please select valid image files (png, jpeg, jpg)."
          : "Please select valid files (png, jpeg, jpg, pdf, doc, docx).",
      );
      return;
    }

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size / (1024 * 1024) >= 2.1,
    );

    if (oversizedFiles.length > 0) {
      showErrorToastMessage("Please ensure all files are 2MB or smaller.");
      return;
    }

    for (const file of selectedFiles) {
      try {
        setIsUploading(true);

        const response = await sellerOnboardingLocationhUploadList({
          file,
          type: "companyVerificationDocuments",
        });

        if (response?.data?.[0]) {
          const previewUrl = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : "";

          setFilesWithUrls((prev) => [
            ...prev,
            {
              file,
              url: response.data[0],
              previewUrl,
              isInitial: false,
              name: file.name,
            },
          ]);
          // @ts-ignore
          onUrlsChange((prev: string[]) => [...prev, response.data[0]]);
        }
      } catch (error) {
        showErrorToastMessage(
          `Failed to upload ${file.name}. Please try again.`,
        );
      }
    }

    setIsUploading(false);
    onFileSelect(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFilesWithUrls((prev) => {
      const updatedFiles = [...prev];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleSave = async () => {
    if (filesWithUrls.length === 0) {
      showErrorToastMessage(
        "Please upload at least one document before saving.",
      );
      return;
    }

    try {
      setIsSaving(true);
      const urls = filesWithUrls.map((file) => file.url);
      await onSave(urls);
      // showSuccessToastMessage("Documents saved successfully!");
    } catch (error) {
      showErrorToastMessage("Failed to save documents. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const downloadFile = (link: string, name?: string) => {
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.download = name ?? "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4 justify-start w-full flex flex-col items-end">
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "rounded-[8px] border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] p-4 flex-1 flex flex-col items-center justify-center text-gray-500 hover:border-[#2B62DD] cursor-pointer mr-4",
            className,
            isUploading && "opacity-70 pointer-events-none",
          )}
        >
          <input
            type="file"
            id={`file-upload-${type}`}
            className="hidden"
            onChange={handleFileChange}
            accept={finalAllowedTypes.join(",")}
            multiple={multiple}
            disabled={disabled}
          />
          <label
            htmlFor={`file-upload-${type}`}
            className="cursor-pointer flex flex-col items-center w-full"
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600 mt-2">
                  {multiple
                    ? "Upload Documents +"
                    : `Upload ${type === "logo" ? "Logo" : "Document"} +`}
                </p>
                <p className="text-gray-400 text-[12px] mt-1">
                  {type === "logo"
                    ? "PNG, JPG, JPEG, WEBP, or SVG (max. 2MB)"
                    : "PNG, JPG, JPEG, WEBP, SVG, PDF, DOC, or DOCX (max. 2MB)"}
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      {filesWithUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {filesWithUrls.map((fileWithUrl, index) => (
            <div
              key={index}
              className="relative p-4 border rounded-lg bg-white flex flex-col items-center cursor-pointer transition-all hover:border-[#2B62DD] group"
              onClick={() => downloadFile(fileWithUrl.url, fileWithUrl.name)}
            >
              <File className="w-8 h-8 text-red-500" />
              <p className="text-sm text-gray-600 mt-2 truncate w-full text-center">
                {fileWithUrl.name || fileWithUrl.file?.name || "Document"}
              </p>
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-[9]"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <ButtonComponent className="hidden group-hover:flex absolute top-0 left-0 flex-col justify-center items-center bg-white w-full h-full rounded-lg">
                {" "}
                <Image src={iconImage} alt="icon" width={32} height={32} />
                <label className="text-sm">Click to view</label>
              </ButtonComponent>
            </div>
          ))}
          <ButtonComponent className="hidden group-hover:flex absolute top-0 left-0 flex-col justify-center items-center bg-white w-full h-full rounded-lg">
            {" "}
            <Image src={iconImage} alt="icon" width={32} height={32} />
            <label className="text-sm">Click to view</label>
          </ButtonComponent>
        </div>
      )}
      <ButtonComponent
        variant="primary"
        type="button"
        onClick={handleSave}
        disabled={isUploading || isSaving || disabled}
        className="capitalize px-8 max-w-[104px] w-full"
      >
        {isSaving ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving...
          </div>
        ) : (
          <div className="flex items-center ">Save</div>
        )}
      </ButtonComponent>
    </div>
  );
}
