"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  element?: "link" | "button" | "button-big";
  variant?:
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "outline"
    | "outlineHover"
    | "ghost"
    | "link";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
}

const primary =
  "inline-flex justify-center items-center relative capitalize text-white border-0 text-sm font-semibold leading-normal hover:bg-blueDark4FHover bg-blueDark4F rounded-[8px] py-[9.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap ";
const secondary =
  "inline-flex justify-center items-center relative capitalize text-white border-0 text-sm font-semibold leading-normal hover:bg-blueCEHover bg-blueCE rounded-[8px] py-[9.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap";
const warning =
  "inline-flex justify-center items-center relative capitalize text-white border-0 text-sm font-semibold leading-normal hover:bg-orangeFFHover bg-orangeFF rounded-[8px] py-[9.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap";
const danger =
  "inline-flex justify-center items-center relative capitalize text-white border-0 text-sm font-semibold leading-normal hover:bg-red04/[75%] bg-red04 rounded-[8px] py-[9.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap";
const outline =
  "inline-flex justify-center items-center relative capitalize text-blueCE hover:text-blueCE border border-blueCE text-sm font-semibold leading-normal hover:border-blueCE bg-transparent rounded-[8px] py-[8.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap";
const outlineHover =
  "inline-flex justify-center items-center relative capitalize text-blueCE hover:text-white border border-blueCE text-sm font-semibold leading-normal hover:border-blueCE bg-transparent hover:bg-blueCE rounded-[8px] py-[8.5px] px-5 transition-all duration-500 overflow-hidden whitespace-nowrap";
const ghost =
  "inline-flex items-center hover:bg-accent hover:text-accent-foreground ms-8 h-5 w-5";
const link =
  "text-blueDark4F underline-offset-4 hover:underline transition-all duration-500";

export const ButtonComponent: React.FC<ButtonProps> = ({
  href,
  type = "button",
  className = "",
  children,
  element = "button",
  startIcon,
  endIcon,
  variant = "",
  onClick,
  disabled,
}) => {
  // console.log(`Button variant: ${variant}`);
  // const baseClasses = variant === "secondary" ? secondary : primary;

  const variantClasses =
    variant === "primary"
      ? primary
      : variant === "secondary"
        ? secondary
        : variant === "warning"
          ? warning
          : variant === "danger"
            ? danger
            : variant === "outline"
              ? outline
              : variant === "outlineHover"
                ? outlineHover
                : variant === "ghost"
                  ? ghost
                  : variant === "link"
                    ? link
                    : "";

  if (element === "link" && href) {
    return (
      <Link href={href} className={cn(variantClasses, className)}>
        {startIcon && (
          <em className="inline-block leading-[0] min-w-4">{startIcon}</em>
        )}
        {children}
        {endIcon && (
          <em className="inline-block leading-[0] min-w-4">{endIcon}</em>
        )}
      </Link>
    );
  }
  if (element === "button-big") {
    return (
      <>
        <button
          type={type}
          className={cn(
            variantClasses,
            className,
            disabled && "opacity-40",
            "text-base leading-normal",
            variant === "outline" || "outlineHover" ? "py-[11px]" : "py-3",
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {startIcon && (
            <em className="inline-block leading-[0] min-w-4">{startIcon}</em>
          )}
          {children}
          {endIcon && (
            <em className="inline-block leading-[0] min-w-4">{endIcon}</em>
          )}
        </button>
      </>
    );
  }
  return (
    <>
      <button
        type={type}
        className={cn(variantClasses, className, disabled && "opacity-40")}
        onClick={onClick}
        disabled={disabled}
      >
        {startIcon && (
          <em className="inline-block leading-[0] min-w-4">{startIcon}</em>
        )}
        {children}
        {endIcon && (
          <em className="inline-block leading-[0] min-w-4">{endIcon}</em>
        )}
      </button>
    </>
  );
};
