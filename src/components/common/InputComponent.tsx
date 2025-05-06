"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { errorIcon, hide, show } from "../../../public/images";

// ✅ Extend native input props for proper type compatibility
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  shadow?: boolean;
  error?: boolean;
  errorMessage?: string;
  onButtonClick?: () => void;
  showIcon?: boolean;
  iconImage?: string;
  iconPosition?: "left" | "right";
}

export const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      value,
      type = "text",
      placeholder,
      shadow = false,
      error = false,
      errorMessage,
      onButtonClick,
      showIcon = false,
      iconImage,
      iconPosition = "right",
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    const handleClick = () => {
      if (onButtonClick) {
        onButtonClick();
      } else if (type === "password") {
        togglePasswordVisibility();
      }
    };

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

    const inputType = type === "password" && isPasswordVisible ? "text" : type;
    const buttonImageSrc = isPasswordVisible ? hide : show;

    return (
      <div className={clsx("flex flex-col gap-2 relative")}>
        {iconImage && iconPosition === "left" && (
          <em className="absolute top-5 left-4 min-w-4 inline-block">
            <Image src={iconImage} alt="icon" width={16} height={16} />
          </em>
        )}

        <Input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className={clsx(
            "rounded-lg lg:h-[52px] h-12 md:text-base px-4 py-[14px] border border-solid bg-transparent border-greyE7 text-[#122D4F] text-[16px] font-medium leading-normal placeholder:!opacity-100 md:placeholder:!text-base placeholder:!text-[16px] placeholder:!font-medium",
            { "shadow-inputShadow": shadow },
            { "text-red04 border-red04 pr-12": error },
            { "pl-12": iconImage && iconPosition === "left" },
            { "pr-16": type === "password" || iconImage || error },
            className,
          )}
          {...props}
        />

        {iconImage && iconPosition === "right" && (
          <em className="absolute top-[17px] right-4 min-w-4 inline-block">
            <Image src={iconImage} alt="icon" width={16} height={16} />
          </em>
        )}

        {!error && type === "password" && (
          <button
            type="button"
            className="absolute top-[17px] right-4 min-w-4 inline-block"
            onClick={handleClick}
          >
            <Image
              src={buttonImageSrc}
              alt="toggle visibility"
              width={20}
              height={16}
            />
          </button>
        )}

        {error && (
          <em className="absolute top-[17px] right-4 min-w-4 inline-block">
            <Image src={errorIcon} alt="error" width={16} height={16} />
          </em>
        )}

        {error && errorMessage && (
          <p className="text-red04/90 text-xs font-medium">{errorMessage}</p>
        )}
      </div>
    );
  },
);

InputComponent.displayName = "InputComponent";
