import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { mail } from "../../../public/images";
import { ButtonComponent } from "../common/ButtonComponent";

export function QuoteForm() {
  return (
    <div className="mt-10 sm:mt-20 px-10 py-9 rounded-[8px] bg-[#FBFBFB] shadow-[0_1.595px_0_0_rgba(10, 10, 10, 0.04)]">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 sm:gap-[69px] items-center">
        <div className="flex flex-col gap-7">
          <h2 className="lg:text-[40px] sm:text-[32px] text-2xl lg:leading-[61px] sm:leading-[40px] leading-normal font-bold text-[#2D2D2D] max-w-[526px] w-full">
            Get free quotes from multiple seller
          </h2>
          <ul className="flex lg:gap-[71px] gap-[30px]">
            <li className="flex flex-col gap-3">
              <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] bg-blueDark4F rounded-full flex items-center justify-center">
                <Image src={mail} alt="mail" width={20} height={20} />
              </div>
              <p className="text-sm sm:text-base text-[#2D2D2D] font-semibold leading-normal max-w-[95px] w-full">
                Tell us what You Need
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] bg-blueDark4F rounded-full flex items-center justify-center">
                <Image src={mail} alt="mail" width={20} height={20} />
              </div>
              <p className="text-sm sm:text-base text-[#2D2D2D] font-semibold leading-normal max-w-[95px] w-full">
                Receive free quotes
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <div className="w-12 h-12 sm:w-[54px] sm:h-[54px] bg-blueDark4F rounded-full flex items-center justify-center">
                <Image src={mail} alt="mail" width={20} height={20} />
              </div>
              <p className="text-sm sm:text-base text-[#2D2D2D] font-semibold leading-normal max-w-[95px] w-full">
                Seal the Deal
              </p>
            </li>
          </ul>
        </div>
        <Card className="p-0 border-0 shadow-none flex flex-col gap-4">
          <h2 className="text-[#1E1E1E] text-xl sm:text-[28px] font-semibold leading-normal">
            Tell us your requirement
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Enter your product details"
              className="bg-white h-[38px] min-h-[38px] rounded-[8px] py-3 px-4 border-0 shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] placeholder:text-sm placeholder:leading-[14px] placeholder:text-[#536485] placeholder:font-medium text-sm font-medium text-black focus-visible:outline-0 focus-visible:ring-0"
            />
            <Input
              placeholder="Enter your mobile number"
              className="bg-white h-[38px] min-h-[38px] rounded-[8px] py-3 px-4 border-0 shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] placeholder:text-sm placeholder:leading-[14px] placeholder:text-[#536485] placeholder:font-medium text-sm font-medium text-black focus-visible:outline-0 focus-visible:ring-0"
            />
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-[15px]">
              <Input
                placeholder="Enter your name"
                className="bg-white h-[38px] xl:col-span-1 lg:col-span-2 min-h-[38px] rounded-[8px] py-3 px-4 border-0 shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] placeholder:text-sm placeholder:leading-[14px] placeholder:text-[#536485] placeholder:font-medium text-sm font-medium text-black focus-visible:outline-0 focus-visible:ring-0"
              />
              <Input
                placeholder="Country"
                className="bg-white h-[38px] xl:col-span-1 lg:col-span-2 min-h-[38px] rounded-[8px] py-3 px-4 border-0 shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] placeholder:text-sm placeholder:leading-[14px] placeholder:text-[#536485] placeholder:font-medium text-sm font-medium text-black focus-visible:outline-0 focus-visible:ring-0"
              />
              <div className="lg:col-span-4 text-center xl:col-span-2">
                <ButtonComponent
                  className="w-full sm:w-fit lg:w-full shadow-none h-[38px] min-h-[38px] text-base leading-normal"
                  variant="primary"
                >
                  Submit Requirement
                </ButtonComponent>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
