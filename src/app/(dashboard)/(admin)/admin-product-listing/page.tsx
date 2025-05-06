"use client";

import { SellerProductLIsting } from "@/components/table/SellerProductLIsting";

const Productlisting = () => {
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
      <SellerProductLIsting />
    </div>
  );
};

export default Productlisting;
