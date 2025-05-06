"use client";
import Image from "next/image";
import comingsoon from "../../../../../public/images/admin.svg";

export default function SellerProductListing() {
  return (
    <div className="flex justify-center items-center flex-col gap-[18px] sm:min-h-[calc(100vh-100px)]">
      <Image
        src={comingsoon}
        alt="comingsoon"
        width={1000}
        height={1000}
        className="h-full w-full object-contain"
      />
      {/* <div className="w-[305px] h-[305px] mb-5">
        <Image
          src={comingsoon}
          alt="comingsoon"
          width={305}
          height={305}
          className="h-full w-full object-contain"
        />
      </div>
      <label className="text-[#181A1E] text-center text-[44px] font-semibold leading-[54px]">
        Coming Soon
      </label> */}
      {/* <p className="text-[#4E545F] text-center text-lg font-semibold leading-[30px]">
        Are you Ready to get something new from us. Then subscribe the news
        letter to get latest updates?
      </p> */}
    </div>
  );
}
