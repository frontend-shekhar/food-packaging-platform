"use client";

import { CheckIcon, FileTextIcon, MapPinIcon } from "@/components/common/Icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
interface Step {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "pending";
  icon: React.ComponentType<{ className?: string }>;
}
const steps: Step[] = [
  {
    id: 1,
    title: "General Information",
    status: "completed",
    icon: CheckIcon,
  },
  {
    id: 2,
    title: "Documents & Certificates",
    status: "in-progress",
    icon: FileTextIcon,
  },
  {
    id: 3,
    title: "Location",
    status: "pending",
    icon: MapPinIcon,
  },
];

export function SellerOnboardingSidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <nav className="space-y-2 p-5">
      <div className="flex flex-col bg-[#F8F9FB] text-black">
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div
              className="flex items-center justify-center flex-col"
              key={step.id}
            >
              <Card
                key={step.id}
                className={cn(
                  "relative flex flex-col gap-2 border-0 py-[22px] px-4 shadow-sm transition-colors bg-white w-full group",
                )}
              >
                <div className="flex items-center justify-center rounded-full bg-[#EAEAEA] w-[26.6px] h-[26.6px]">
                  <step.icon
                    className={cn(
                      "h-5 w-5",
                      step.status === "completed" && "text-[#3EA56B] ",
                      step.status === "in-progress" && "text-muted-foreground",
                      step.status === "pending" && "text-muted-foreground",
                    )}
                  />
                </div>
                <div className="text-[#76828D] text-[12px] not-italic font-semibold leading-[12px] tracking-[0.48px]">
                  Step {step.id}
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <div
                  className={cn(
                    "text-[12px] font-medium leading-[12px] mt-2 p-[10px] bg-[#eaeaea] rounded-[4px] w-fit",
                    step.status === "completed" && "text-white bg-[#3EA56B]",
                    step.status === "in-progress" && "text-[#080808]",
                    step.status === "pending" && "text-[#080808]",
                  )}
                >
                  {step.status === "completed" && "Completed"}
                  {step.status === "in-progress" && "In-Progress"}
                  {step.status === "pending" && "Pending"}
                </div>
              </Card>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="19"
                viewBox="0 0 6 19"
                fill="none"
                className=""
              >
                <path
                  d="M3.5 5L5.88675 1.26184e-07L0.113249 -1.26184e-07L2.5 5L3.5 5ZM2.5 14L0.113248 19L5.88675 19L3.5 14L2.5 14ZM2.5 4.5L2.5 14.5L3.5 14.5L3.5 4.5L2.5 4.5Z"
                  fill="white"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
