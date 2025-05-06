"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleOption {
  label: string;
  value: string;
}

export interface ToggleSwitchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  options: ToggleOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const ToggleSwitch = React.forwardRef<HTMLDivElement, ToggleSwitchProps>(
  (
    { className, options, defaultValue, value, onValueChange, ...props },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = React.useState(
      value || defaultValue || options[0]?.value,
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setSelectedValue(optionValue);
      }
      onValueChange?.(optionValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex rounded-lg overflow-hidden border border-input",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={cn(
              "px-[34px] py-[10px] text-sm font-medium transition-colors text-[12px] leading-[13.6px]",
              selectedValue === option.value
                ? "bg-blueCE text-white"
                : "bg-white text-[#7B7B7B] hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  },
);
ToggleSwitch.displayName = "ToggleSwitch";

export { ToggleSwitch };
