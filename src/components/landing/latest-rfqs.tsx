"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import country from "../../../public/images/icons/country.svg";
import { ButtonComponent } from "../common/ButtonComponent";
const rfqs = [
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
  "| Aluminium Lngot A4 | 17/11/2024",
];

export function LatestRFQs() {
  return (
    <>
      <div className="bg-[#FBFBFB] mt-10 sm:mt-20 flex flex-col gap-[34px] py-7 rounded-xl">
        <div className="flex justify-between px-7 sm:items-center sm:flex-row flex-col">
          <h2 className="text-xl sm:text-[28px] leading-normal text-[#1E1E1E] font-semibold">
            Latest RFQ&apos;s
          </h2>
          <ButtonComponent variant="secondary" className="w-fit">
            Post Requirement
          </ButtonComponent>
        </div>

        <div>
          {/* First Marquee - Left to Right */}
          <div className="w-full overflow-hidden relative">
            <div className="marquee-section w-max">
              <div className="flex gap-[60px] whitespace-nowrap">
                {/* Duplicating content to ensure seamless scroll */}
                {[...rfqs, ...rfqs, ...rfqs, ...rfqs, ...rfqs].map((rfq, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-[22.5px] h-[15px]">
                      <Image
                        src={country}
                        alt="country"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[#333335] text-[18px] font-semibold leading-[28.8px]">
                      {rfq}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Marquee - Right to Left */}
          <div className="w-full overflow-hidden relative mt-[29px] scale-x-[-1]">
            <div className="marquee-section w-max">
              <div className="flex gap-[60px] whitespace-nowrap scale-x-[-1]">
                {/* Duplicating content to ensure seamless scroll */}
                {[...rfqs, ...rfqs, ...rfqs, ...rfqs, ...rfqs].map((rfq, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3  scale-x-[-1]"
                  >
                    <div className="w-[22.5px] h-[15px]">
                      <Image
                        src={country}
                        alt="country"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[#333335] text-[18px] font-semibold leading-[28.8px]">
                      {rfq}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
