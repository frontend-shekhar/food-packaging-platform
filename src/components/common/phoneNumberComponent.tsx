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
}

const PhoneNumberInput: React.FC<PhoneComponentProps> = ({
  placeholder,
  shadow,
  error = false,
  errorMessage,
  value,
  onChange,
  onBlur,
  name,
}) => {
  const [phone, setPhone] = useState("");
  console.log("error", error);
  return (
    <>
      <div className={clsx("flex flex-col gap-2")}>
        <div
          className={clsx(
            "flex items-center border rounded-lg", // Main container styles
            shadow ? "shadow-md" : "", // Optional shadow
            error ? "border-red-500" : "border-gray-300", // Error state border
          )}
        >
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => {
              onChange(phone);
            }}
            onBlur={onBlur}
            inputProps={{
              name: name,
              required: true,
            }}
            placeholder={placeholder}
            inputClass={clsx(
              "w-full h-full px-4 py-2 rounded-r-lg outline-none", // Ensures full width and padding
              "focus:ring-2 focus:ring-blue-500", // Focus styles
              {
                "pr-12": error, // Adds padding-right for error icon
                "pr-4": !error, // Default padding-right
              },
            )}
            containerClass="flex-grow"
            buttonClass="bg-transparent border-none outline-none" // Style the country code dropdown button
            enableSearch={true} // Enable country search
            searchPlaceholder="Search country"
            autocompleteSearch={true} // Enable autocomplete for country search
            countryCodeEditable={false} // Prevent manual editing of country code
            disableCountryCode={false}
            preferredCountries={["in", "us", "gb", "ca"]} // Add preferred countries at top
          />
          {/* {error && (
            <div className="absolute right-4">
              <Image src={errorIcon} alt="error" width={16} height={16} />
            </div>
          )} */}
        </div>
        {error && (
          <p
            className={clsx(
              "text-red-500 text-xs font-semibold capitalize text-right mt-1", // Default error message styles
              { hidden: !errorMessage }, // Hide when errorMessage is not present
              { block: !!errorMessage }, // Show when errorMessage is present
            )}
          >
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default PhoneNumberInput;
