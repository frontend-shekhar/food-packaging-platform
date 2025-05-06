import { OnboardingFileUpload } from "@/services/api-functions/sellerOnboarding.api-function.services";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { useState } from "react";

function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // File type and size validation
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
      "application/msword",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      showErrorToastMessage("Invalid file type");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      showErrorToastMessage("File size exceeds 2MB");
      return;
    }

    try {
      setIsUploading(true);

      // Actual file upload logic
      const response = await OnboardingFileUpload({
        data: {
          file: selectedFile,
        },
        type: "companyVerificationDocuments",
      });

      setFile(selectedFile);
      setIsUploadComplete(true);
      showSuccessToastMessage("Document uploaded successfully");
    } catch (error) {
      showErrorToastMessage("File upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <input
      type="file"
      onChange={handleFileUpload}
      accept=".png,.jpg,.jpeg,.pdf,.doc"
      disabled={isUploading}
    />
  );
}

export default DocumentUploader;
