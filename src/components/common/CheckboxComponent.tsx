"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface UiCheckboxProps {
  id: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  error?: boolean;
  errorMessage?: string;
  labelClassName?: string;
}

const CheckboxComponent: React.FC<UiCheckboxProps> = ({
  id,
  label,
  disabled,
  className = "",
  checked,
  onCheckedChange,
  error,
  errorMessage,
}) => {
  const hasRegisterClass = className.includes("register");
  return (
    <div className={`flex items-start group flex-col gap-2 ${className}`}>
      <div className="flex gap-3 items-start">
        <Checkbox
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          className={cn(
            "transition-all duration-300 translate-y-[2px] data-[state=checked]:bg-blueCE data-[state=checked]:border-blueCE data-[state=checked]:text-white",
          )}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "lg:text-base lg:leading-normal text-sm font-medium text-[#1E1E1E] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer transition-all duration-300 ",
              className,
            )}
          >
            {label}
          </label>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-red04/90 text-xs font-medium ps-[30px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CheckboxComponent;
