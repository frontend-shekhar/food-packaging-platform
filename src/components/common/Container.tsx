import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className = "",
  containerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className={cn(`px-5 ${containerClassName}`)}>
      <div
        className={cn(
          `3xl:max-w-[1519px] 2xl:max-w-[1440px]  lg:px-10 w-full mx-auto ${className}`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
