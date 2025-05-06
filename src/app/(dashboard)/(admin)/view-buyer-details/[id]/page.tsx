"use client";
import BuyerOnboarding from "@/app/buyer-onboarding/components/BuyerOnboarding";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function ViewBuyerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="px-5 flex-1 overflow-auto pb-10 pt-5">
      <Suspense fallback={<Loader />}>
        <BuyerOnboarding
          isReadOnly={true}
          detailId={params.id}
          isEditing={true}
        />
      </Suspense>
    </div>
  );
}
