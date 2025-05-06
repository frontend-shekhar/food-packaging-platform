"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";
import Image from "next/image";
import { errorIcon } from "../../../public/images";

interface PhoneComponentProps {
  placeholder?: string; // Define the type for the placeholder prop
  shadow?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  value: string;
  disabled?: boolean;
  className?: string;
}

const UiPhoneInput: React.FC<PhoneComponentProps> = ({
  placeholder,
  shadow,
  error = false,
  errorMessage,
  value,
  onChange,
  onBlur,
  name,
  disabled,
  className,
}) => {
  const [phone, setPhone] = useState("");
  return (
    <>
      <div className={clsx("flex flex-col gap-2", { relative: errorMessage })}>
        <PhoneInput
          country={"br"}
          value={value}
          onChange={(phone) => {
            onChange(phone);
          }}
          disabled={disabled}
          onBlur={onBlur}
          inputProps={{
            name: name,
            required: true,
          }}
          placeholder={placeholder}
          inputClass={clsx(
            "rounded-lg lg:h-[52px] h-12 md:text-base px-4 py-[14px] border border-solid bg-transparent border-greyE7 text-[#122D4F] text-[16px] font-medium leading-normal placeholder:!opacity-100 md:placeholder:!text-base placeholder:!text-[16px] placeholder:!font-medium bg-input !shadow-none",
            className,
            {
              "pr-12": error,
              "pr-4": !error,
            },
          )}
          containerClass={clsx({ "with-shadow": shadow }, { error: error })}
          enableSearch={true}
          searchPlaceholder="Search country"
          autocompleteSearch={true}
          countryCodeEditable={false}
          disableCountryCode={false}
          preferredCountries={["in", "us", "gb", "ca"]}
        />
        {error && (
          <em className="absolute top-5 right-4 min-w-4 inline-block">
            <Image src={errorIcon} alt="error" width={16} height={16} />
          </em>
        )}
        {error && (
          <p
            className={clsx(
              "text-red04 text-xs font-medium capitalize",
              { hidden: !errorMessage },
              { block: !!errorMessage },
            )}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default UiPhoneInput;
