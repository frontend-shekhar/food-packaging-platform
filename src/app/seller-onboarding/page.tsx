"use client";

import { Suspense } from "react";
import SellerOnboarding from "./components/SellerOnboarding";
import Loader from "@/components/common/Loader";

export default function SellerOnboardingPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SellerOnboarding isEditing={false} isReadOnly={false} />
    </Suspense>
  );
}
