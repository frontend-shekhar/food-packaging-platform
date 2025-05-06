import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { product } from "../../../public/images";
import { ButtonComponent } from "../common/ButtonComponent";
import Link from "next/link";

export function LatestProductCard() {
  return (
    <Card className="overflow-hidden bg-white rounded-[8px] border-0 shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] p-5 sm:p-7">
      <Link href="/product-details">
        <div className="flex flex-col gap-5">
          <div className="flex sm:flex-row flex-col gap-[18px]">
            <div className="w-full sm:w-32 h-32 relative bg-[#fbfbfb]rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src={product}
                alt="Product"
                fill
                className="object-contain sm:object-cover"
              />
            </div>
            <div className="flex flex-col gap-[13px]">
              <div className="flex flex-col gap-[5px]">
                <h3 className="font-semibold text-[#122D4F] leading-normal text-base sm:text-lg">
                  Brand Pile Machine
                </h3>
                <p className="text-[#122D4F] font-bold leading-normal text-base sm:text-lg">
                  14265 USD
                </p>
                <span className="block text-xs font-medium text-blueCE/70">
                  1 Piece
                </span>
              </div>
              <ButtonComponent variant="secondary" className="">
                Send Inquiry Now
              </ButtonComponent>
            </div>
          </div>
          <p className="text-xs leading-[22px] text-blueDark4F/80 font-medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a
          </p>
        </div>
      </Link>
    </Card>
  );
}
