"use client";
import Loader from "@/components/common/Loader";
import SellerAddProductForm from "@/components/forms/seller-add-product/SellerAddProductForm";
import { getLocalStorage } from "@/lib/useLocalStorage";
import { UseGetSellerStatus } from "@/services/query-components/seller-onborading.query-components.services";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import rejected from "/public/images/rejected.svg";

export default function SellerDashboard() {
  const [isRejected, setIsRejected] = useState(false);

  // Get Seller Status
  const successCallback = (data: any) => {
    if (data === "REJECTED") setIsRejected(true);
  };
  const failureCallback = () => {};
  const { mutate: getSellerStatus, isPending } = UseGetSellerStatus(
    successCallback,
    failureCallback,
  );

  useEffect(() => {
    let user: any = getLocalStorage("user");
    getSellerStatus(user.id);
  }, [getSellerStatus]);

  if (isPending) {
    return <Loader />;
  }

  return false ? (
    <div className="flex justify-center items-center flex-col  min-h-[calc(100vh-100px)]">
      <div className="w-[180px] h-[183px] mb-5">
        <Image
          src={rejected}
          alt="rejected"
          width={500}
          height={500}
          className="h-full w-full object-contain"
        />
      </div>
      <label className="text-[#181A1E] text-center text-[24px] font-semibold leading-[40px]">
        Your account was rejected.
      </label>
      <label className="text-[#181A1E] text-center text-[24px] font-semibold leading-[40px]">
        You can reapply with updated details in 7 days
      </label>
    </div>
  ) : (
    <Suspense fallback={<Loader />}>
      <SellerAddProductForm />
    </Suspense>
  );
}
