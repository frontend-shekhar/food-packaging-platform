"use client";
import { Suspense } from "react";
import BuyerOnboarding from "@/app/buyer-onboarding/components/BuyerOnboarding";
import Loader from "@/components/common/Loader";

export default function EditSellerOnboardingPage() {
  return (
    <div className="px-5 flex-1 overflow-auto pb-10 pt-5">
      <Suspense fallback={<Loader />}>
        <BuyerOnboarding isEditing={true} isReadOnly={false} />
      </Suspense>
    </div>
  );
}
