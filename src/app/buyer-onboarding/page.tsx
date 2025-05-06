"use client";

import { Suspense } from "react";
import BuyerOnboarding from "./components/BuyerOnboarding";
import Loader from "@/components/common/Loader";

export default function BuyerOnboardingPage() {
  return (
    <Suspense fallback={<Loader />}>
      <BuyerOnboarding isEditing={false} isReadOnly={false} />
    </Suspense>
  );
}
