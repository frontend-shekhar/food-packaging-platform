import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  variant?: "default" | "primary";
  onClick: (type: string) => void;
}

export function PricingCard() {
  return (
    <div className="rounded-lg p-5 text-left bg-white">
      <h3 className="text-[#122D4F] text-[20px] font-semibold leading-[28.8px] mb-1">
        ertert
      </h3>
      <p className="text-[#122D4F99] text-[14px] font-medium leading-[20px]">
        sxvxcbcnsfdgsdf
      </p>
      <div className="mt-[30px]">
        <span
          className="text-[#396CE8] text-[29px] font-bold leading-[28.8px]
"
        >
          345234234
        </span>
        <span className="text-[#396CE8] text-[16px] font-bold leading-[28.8px]"></span>
      </div>

      <ul className="mt-[30px] space-y-4">
        <li className="flex items-start gap-2 w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            className="min-w-[11px] min-h-[8px] mt-[5px]"
          >
            <path
              d="M3.94796 8C3.76863 8.00008 3.59106 7.96303 3.4254 7.89098C3.25974 7.81892 3.10925 7.71328 2.98255 7.58009L0 4.45161L1.1381 3.25775L3.94796 6.20667L9.8619 5.25172e-05L11 1.19392L4.91336 7.58009C4.78666 7.71328 4.63617 7.81892 4.47051 7.89098C4.30485 7.96303 4.12728 8.00008 3.94796 8Z"
              fill="#3EA56B"
            />
          </svg>
          <p className="text-[#122D4F] text-[12px] font-bold leading-[20px] break-all">
            sdaasd
            <span className="text-[#122D4F] text-[12px] font-medium leading-[20px]">
              It is a long established fact that a reader
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
}
