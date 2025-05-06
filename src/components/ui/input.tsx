"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData("text");
      const isValid = /^[ A-Za-z0-9_@./#&+-]*$/.test(pastedText);
      if (!isValid) {
        e.preventDefault(); // block the paste
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isValid = /^[ A-Za-z0-9_@./#&+-]*$/.test(e.key);
      if (!isValid) {
        e.preventDefault(); // block invalid key input
      }
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg bg-[#fbfbfb]   border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F]  text-[16px] font-medium leading-normal form-control",
          className,
        )}
        ref={ref}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
