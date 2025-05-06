"use client";
import Loader from "@/components/common/Loader";
import { SellerProductLIsting } from "@/components/table/SellerProductLIsting";
import { getLocalStorage } from "@/lib/useLocalStorage";
import rejected from "/public/images/rejected.svg";
import { UseGetSellerStatus } from "@/services/query-components/seller-onborading.query-components.services";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SellerProductListing() {
  const [isRejected, setIsRejected] = useState(false);

  // Get Product List
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

  return (
    <div className="px-5 flex-1 overflow-auto pb-10 pt-5">
      {/* <div className="flex items-start justify-between mb-[30px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[#122D4F] text-[18px] font-semibold leading-[27px]">
            My Products
          </h1>
          <p className="text-[#8C9097]  text-[12px] font-medium leading-[19.51px]">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
          </p>
        </div>
      </div> */}
      {false ? (
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
        <SellerProductLIsting />
      )}
    </div>
  );
}
