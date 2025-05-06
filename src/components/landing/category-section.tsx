"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Container from "@/components/common/Container";

export function CategorySection() {
  return (
    <div className="mt-10 sm:mt-20">
      <div className="flex items-stretch justify-between px-5 sm:px-10 overflow-x-auto rounded-[8px] bg-[#FBFBFB] backdrop-blur-[160px] divide-x-[1px] gap-5 sm:gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="min-w-[120px] justify-start h-auto"
          >
            <Button
              variant="outline"
              className="whitespace-nowrap border-0 shadow-none text-[#0D6ACE] text-[28px] font-semibold leading-normal uppercase px-0 pe-5 gap-2"
            >
              Iron <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Iron Ore</DropdownMenuItem>
            <DropdownMenuItem>Iron Pellets</DropdownMenuItem>
            <DropdownMenuItem>Iron Scrap</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1 py-[23px] h-auto ps-5 sm:ps-10">
          <label className="whitespace-nowrap text-[12px] leading-normal mb-1 font-medium text-blueDark4F/40">
            GOLD 05DC546024
          </label>
          <span className="block text-[14px] leading-normal font-semibold text-blueDark4F">
            75034.00 + 0.15
          </span>
        </div>
      </div>
    </div>
  );
}
