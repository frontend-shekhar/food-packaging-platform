import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { showErrorToastMessage } from "@/utils/toast.utils";
import Image from "next/image";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import iconImage from "../../../public/images/icons/ic-eye-hide.svg";
interface FileUploadProps {
  value?: string;
  onFileSelect: (file: File | null) => void;
  className?: string;
  id: string;
  type: "image" | "all";
  disabled?: boolean;
}

const acceptFileType = {
  image: ["image/png", "image/jpeg", "image/jpg"],
  all: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export function FileUpload({
  value,
  onFileSelect,
  className,
  type = "all",
  id,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<any>();
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>(value || "");

  const allowedTypes = acceptFileType[type];

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files![0];
    const fileSizeInMB = selectedFile.size / (1024 * 1024);

    if (!allowedTypes.includes(selectedFile.type)) {
      showErrorToastMessage(
        type === "image"
          ? "Please select a valid image file (png, jpeg, jpg)."
          : "Please select a valid file (png, jpeg, jpg, pdf, doc, docx).",
      );
      (inputRef.current as HTMLInputElement).value = "";
      return;
    }
    if (fileSizeInMB >= 2.1) {
      showErrorToastMessage("Please ensure the file size is 2MB or smaller.");
      (inputRef.current as HTMLInputElement).value = "";
      return;
    }
    if (selectedFile.type.startsWith("image/")) {
      setFilePreviewUrl(URL.createObjectURL(selectedFile));
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleRemoveFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    (inputRef.current as HTMLInputElement).value = "";
    setFilePreviewUrl("");
    setFile(null);
    onFileSelect(null);
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

  const fileName =
    value && typeof value === "string" ? value.split("/").pop() : "Document";

  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-lg border border-dashed border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] p-4 flex flex-col items-center justify-center text-gray-500 hover:border-[#2B62DD] cursor-pointer  transition-all relative",
          className,
          value && "group",
        )}
        onClick={() => {
          if (value) {
            downloadFile(value, fileName);
          } else {
            (inputRef.current as HTMLInputElement).click();
          }
        }}
      >
        <input
          type="file"
          id={`file-upload-${id}`}
          className="hidden"
          onChange={handleFileChange}
          accept={allowedTypes.join(",")}
          ref={inputRef}
          disabled={disabled}
        />
        <label className="cursor-pointer flex flex-col items-center text-[#122D4F] text-[14px] font-normal leading-[20px] rel">
          {!value ? (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-[#122D4F] text-[14px] font-normal mt-2">
                Upload {type === "image" ? "Image" : "Document"} +
              </p>
              <p className="text-gray-400 text-[12px] mt-1">
                {type === "image"
                  ? "PNG, JPG, JPEG (max. 2MB)"
                  : "PNG, JPG, JPEG, PDF, DOC or DOCX (max. 2MB)"}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center">
              {type === "image" ? (
                <Image
                  src={filePreviewUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg mb-2"
                  width={100}
                  height={100}
                />
              ) : (
                <File className="w-8 h-8 text-red-500" />
              )}
              <p className="text-sm text-gray-600 mt-2 truncate w-full text-center">
                {fileName}
              </p>
            </div>
          )}
        </label>
        <ButtonComponent className="hidden group-hover:flex absolute top-0 left-0 flex-col justify-center items-center bg-white w-full h-full rounded-lg">
          {" "}
          <Image src={iconImage} alt="icon" width={32} height={32} />
          <label className="text-sm">Click to view</label>
        </ButtonComponent>
      </div>

      {value && !disabled && (
        <button
          onClick={handleRemoveFile}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
