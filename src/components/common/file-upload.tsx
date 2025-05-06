import { ChangeEvent, useEffect, useState } from "react";
import { Upload, FileText, File } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import Image from "next/image";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
  onFileUpload?: (file: File) => Promise<any>;
  type: "logo" | "incorporation";
  allowedFileTypes?: string[];
  initialFileUrl: any; // Changed to any to accommodate different URL structures
}

export function FileUpload({
  onFileSelect,
  className,
  onFileUpload,
  type,
  allowedFileTypes,
  initialFileUrl,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const defaultAllowedTypes =
    type === "logo"
      ? ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"]
      : [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
          "image/svg+xml",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

  const finalAllowedTypes = allowedFileTypes || defaultAllowedTypes;

  // Get the appropriate URL based on type
  const getInitialUrl = () => {
    if (type === "logo" && initialFileUrl?.companyLogo) {
      return initialFileUrl.companyLogo;
    }
    if (type === "incorporation" && initialFileUrl?.letterOfIncorporation) {
      return initialFileUrl.letterOfIncorporation;
    }
    return "";
  };

  useEffect(() => {
    const url = getInitialUrl();
    if (url) {
      setFilePreviewUrl(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFileUrl]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!finalAllowedTypes.includes(selectedFile.type)) {
      showErrorToastMessage(
        type === "logo"
          ? "Please select a valid image file (png, jpeg, jpg, webp, svg)."
          : "Please select a valid file (png, jpeg, jpg, webp, svg, pdf, doc, docx).",
      );
      return;
    }

    if (selectedFile.size / (1024 * 1024) >= 2.1) {
      showErrorToastMessage("Please ensure the file size is 2MB or smaller.");
      return;
    }

    try {
      setIsUploading(true);

      if (selectedFile.type.startsWith("image/")) {
        const newPreviewUrl = URL.createObjectURL(selectedFile);
        // Cleanup old preview URL if it was created by createObjectURL
        if (filePreviewUrl && !getInitialUrl()) {
          URL.revokeObjectURL(filePreviewUrl);
        }
        setFilePreviewUrl(newPreviewUrl);
      } else {
        setFilePreviewUrl("");
      }

      setFile(selectedFile);
      onFileSelect(selectedFile);
      await onFileUpload?.(selectedFile);

      // showSuccessToastMessage(
      //   `${type === "logo" ? "Logo" : "Document"} uploaded successfully!`,
      // );
    } catch (error) {
      showErrorToastMessage(
        `Failed to upload ${type === "logo" ? "logo" : "document"}. Please try again.`,
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      // Only cleanup URLs created by createObjectURL
      if (filePreviewUrl && !getInitialUrl()) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePreviewUrl]);

  const renderFileIcon = () => {
    const initialUrl = getInitialUrl();

    if (
      !file &&
      initialUrl &&
      (type === "logo" || initialUrl.match(/\.(jpg|jpeg|png|webp|svg)$/i))
    ) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={initialUrl || ""}
          alt="Preview"
          className="w-16 h-16 object-contain rounded-lg"
          width={64}
          height={64}
        />
      );
    }

    if (!file && !initialUrl) {
      return <Upload className="w-8 h-8 text-gray-400" />;
    }

    if (file?.type.startsWith("image/")) {
      return (
        <Image
          src={filePreviewUrl}
          alt="Preview"
          className="w-16 h-16 object-contain rounded-lg"
          width={64}
          height={64}
        />
      );
    }

    if (file?.type === "application/pdf") {
      return <FileText className="w-8 h-8 text-red-500" />;
    }

    if (file?.type.includes("word")) {
      return <File className="w-8 h-8 text-blue-500" />;
    }

    return <File className="w-8 h-8 text-gray-400" />;
  };

  const getDisplayText = () => {
    if (file) {
      return file.name;
    }
    if (getInitialUrl()) {
      return `Current ${type === "logo" ? "Logo" : "Document"}`;
    }
    return `Upload ${type === "logo" ? "Logo" : "Document"} +`;
  };

  return (
    <div
      className={cn(
        "rounded-[8px] border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] p-4 flex flex-col items-center justify-center text-gray-500 hover:border-[#2B62DD] cursor-pointer max-h-[150px]",
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
      />
      <label
        htmlFor={`file-upload-${type}`}
        className="cursor-pointer flex flex-col items-center"
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {renderFileIcon()}
            <p className="text-sm text-gray-600 mt-2">{getDisplayText()}</p>
            {!file && !getInitialUrl() && (
              <p className="text-gray-400 text-[12px] mt-1">
                {type === "logo"
                  ? "PNG, JPG, JPEG, WEBP, or SVG (max. 2MB)"
                  : "PNG, JPG, JPEG, WEBP, SVG, PDF, DOC, or DOCX (max. 2MB)"}
              </p>
            )}
          </div>
        )}
      </label>
    </div>
  );
}

// import React, { useState } from "react";
// import { Upload } from "lucide-react";
// import {
//   showErrorToastMessage,
//   showSuccessToastMessage,
// } from "@/utils/toast.utils";

// const LetterOfIncorporationUpload = ({ onFileUpload }) => {
//   const [file, setFile] = useState(null);
//   const [filePreviewUrl, setFilePreviewUrl] = useState("");

//   const onFileChangeHandler = (e) => {
//     const allowedTypes = ["test/pdf"];

//     const imageFile = e.target.files[0];

//     // Check if there's a file selected
//     if (!imageFile) {
//       return;
//     }

//     // Check file type
//     if (!allowedTypes.includes(imageFile.type)) {
//       showErrorToastMessage(
//         "Please select a valid image file (png, jpeg, jpg, webp, svg)."
//       );
//       e.target.value = null; // Clear the file input
//       return;
//     }

//     // Check file size (2MB limit)
//     const fileSizeInMB = imageFile.size / (1024 * 1024);
//     if (fileSizeInMB >= 2.1) {
//       showErrorToastMessage("Please ensure the image size is 2MB or smaller.");
//       e.target.value = null;
//       return;
//     }

//     // Update state and preview
//     setFile(imageFile);
//     setFilePreviewUrl(URL.createObjectURL(imageFile));
//     onFileUpload(imageFile);

//     showSuccessToastMessage("Letter of Incorporation uploaded successfully!");
//   };

//   return (
//     <div className="w-full">
//       <div className="relative flex flex-col items-center justify-center w-full py-[42px] border-2 border-dashed rounded-lg bg-white">
//         <input
//           type="file"
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           onChange={onFileChangeHandler}
//           accept=".png,.jpg,.jpeg,.webp,.svg"
//         />

//         <div className="flex flex-col items-center space-y-3">
//           {filePreviewUrl ? (
//             <div className="flex flex-col items-center">
//               <img
//                 src={filePreviewUrl}
//                 alt="Preview"
//                 className="w-16 h-16 object-cover rounded-lg mb-2"
//               />
//               <p className="text-sm text-gray-600">{file?.name}</p>
//             </div>
//           ) : (
//             <>
//               <Upload className="w-12 h-12 text-gray-400" />
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">
//                   Upload Letter of Incorporation
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   PNG, JPG, JPEG, WEBP or SVG (max. 2MB)
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LetterOfIncorporationUpload;
