import Image from "next/image";
import { Upload, File, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import iconImage from "../../../public/images/icons/ic-eye-hide.svg";
import { cn } from "@/lib/utils";
import { showErrorToastMessage } from "@/utils/toast.utils";
import { ButtonComponent } from "@/components/common/ButtonComponent";

interface FileUploadProps {
  onUrlsChange: (urls: string[]) => void;
  className?: string;
  type: "images" | "all";
  initialData: string[];
  fileType: string;
  disabled?: boolean;
  fileUploadApi: ({
    data: { file },
    type,
  }: {
    data: { file: File };
    type: string;
  }) => Promise<any>;
}

interface FileWithUrl {
  file?: File;
  url: string;
  previewUrl: string;
  isInitial?: boolean;
  name?: string;
}

const acceptFileType = {
  images: ["image/png", "image/jpeg", "image/jpg"],
  all: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export default function MultiFileUploadProduct({
  onUrlsChange,
  className,
  type,
  initialData,
  fileType,
  disabled,
  fileUploadApi,
}: FileUploadProps) {
  const [filesWithUrls, setFilesWithUrls] = useState<FileWithUrl[]>(() => {
    if (initialData && initialData.length > 0) {
      const initialFiles = initialData.map((url: string) => ({
        url,
        previewUrl: url,
        isInitial: true,
        name: url.split("/").pop() || "Document",
      }));
      return initialFiles;
    } else {
      return [];
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const allowedTypes = acceptFileType[type];

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      showErrorToastMessage(
        type === "images"
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

        const response = await fileUploadApi({
          data: { file },
          type: fileType,
        });

        if (response?.data) {
          const previewUrl = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : "";

          setFilesWithUrls((prev) => [
            ...prev,
            {
              file,
              url: response.data,
              previewUrl,
              isInitial: false,
              name: file.name,
            },
          ]);
        }
      } catch (error) {
        showErrorToastMessage(
          `Failed to upload ${file.name}. Please try again.`,
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeFile = (index: number) => {
    setFilesWithUrls((prev) => {
      const updatedFiles = [...prev];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
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

  useEffect(() => {
    onUrlsChange([...filesWithUrls.map((item) => item.url)]);
  }, [filesWithUrls, onUrlsChange]);

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
            accept={allowedTypes.join(",")}
            multiple={true}
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
                  {`Upload ${type === "images" ? "Images" : "Document"} +`}
                </p>
                <p className="text-gray-400 text-[12px] mt-1">
                  {type === "images"
                    ? "PNG, JPG or JPEG (max. 2MB)"
                    : "PNG, JPG, JPEG, PDF, DOC, or DOCX (max. 2MB)"}
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
              className="rounded-lg border border-dashed border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] p-4 flex flex-col items-center justify-center text-gray-500 hover:border-[#2B62DD] cursor-pointer  transition-all relative group"
              onClick={() => downloadFile(fileWithUrl.url, fileWithUrl.name)}
            >
              {type === "images" ? (
                <Image
                  src={fileWithUrl.url || fileWithUrl.previewUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg mb-2"
                  width={100}
                  height={100}
                />
              ) : (
                <File className="w-8 h-8 text-red-500" />
              )}
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
    </div>
  );
}
