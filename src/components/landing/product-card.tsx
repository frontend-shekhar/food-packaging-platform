import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { product } from "../../../public/images";
import { ButtonComponent } from "../common/ButtonComponent";
import Link from "next/link";

export function ProductCard() {
  return (
    <Link href="/product-details">
      <Card className="p-5 sm:p-7 bg-white rounded-[8px] shadow-[0_0_13px_5px_rgba(0, 0, 0, 0.02)] border-0">
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
        <p className="text-xs text-blueDark4F/80 font-medium mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a
        </p>
        <div className="rounded-xl border border-blueDark4F/10 mt-10">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-blueDark4F/10">
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  High Port
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  Shanghai
                </td>
              </tr>
              <tr className="border-b border-blueDark4F/10">
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  Weight per Unit
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  0.5 Kilograms
                </td>
              </tr>
              <tr className="border-b border-blueDark4F/10">
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  Dimensions (LxW)
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  20 x 10 x 5 (in Centimeters)
                </td>
              </tr>
              <tr className="border-b border-blueDark4F/10">
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  Lead Time
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  7-14 days
                </td>
              </tr>
              <tr className="border-b border-blueDark4F/10">
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  Min Order Quantity
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  100 Units
                </td>
              </tr>
              <tr>
                <td className="p-[15px] text-blueDark4F text-xs font-medium">
                  Export Carton Weight
                </td>
                <td className="p-[15px] text-xs font-semibold leading-normal text-blueCE/70 border-l border-blueDark4F/10">
                  25 x 15 x 10 (in Centimeters)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </Link>
  );
}
