"use client";
import { Suspense } from "react";
import SellerOnboarding from "@/app/seller-onboarding/components/SellerOnboarding";

export default function ViewSellerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="px-5 flex-1 overflow-auto pb-10 pt-5">
      <Suspense>
        <SellerOnboarding
          isReadOnly={true}
          detailId={params.id}
          isEditing={true}
        />
      </Suspense>
    </div>
  );
}
