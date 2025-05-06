"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { heatChart, lineChart } from "../../../public/images";

export function MarketActivity() {
  return (
    <div className=" bg-[#FBFBFB] mt-7 rounded-xl p-[28px]">
      <div className="flex justify-between sm:items-center gap-4 mb-[33px] sm:flex-row flex-col">
        <div className="flex flex-col gap-1 sm:gap-[6px]">
          <h2 className="text-xl sm:text-[28px] leading-normal text-[#1E1E1E] font-semibold">
            Market Activity
          </h2>
          <span className=" text-[16px] font-semibold text-[#1E1E1E] opacity-50 leading-normal">
            10:50 | 13 November 2024
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-blueCE w-fit">
            <Button
              variant="secondary"
              className="h-auto py-[9.5px] text-sm leading-normal font-semibold min-w-[160px] sm:min-w-[215px] justify-between"
            >
              Last 7 Days <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Last 24 Hours</DropdownMenuItem>
            <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
            <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-12 gap-5 xl:gap-7">
        <Card className="col-span-12 lg:col-span-4 rounded-[8px] border border-black/10 shadow-none">
          <div className="max-h-[381px] h-full rounded-lg">
            <Image
              src={heatChart}
              alt="chart"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </Card>

        <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-7">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-[8px] border border-black/10 shadow-none relative"
            >
              <p className="absolute left-4 top-4 text-[#2D2D2D]  text-[14px] font-semibold leading-normal">
                Loreume
              </p>
              <div className="bg-white h-[112px] rounded-lg">
                <Image
                  src={lineChart}
                  alt="chart"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-[11px] flex flex-col gap-[2px]">
                <p className="text-sm font-semibold leading-normal text-[#2D2D2D]">
                  05DEFEFREG24
                </p>
                <span className="text-[#2D2D2D] text-xs font-normal leading-normal">
                  75,050.00 | +20%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
