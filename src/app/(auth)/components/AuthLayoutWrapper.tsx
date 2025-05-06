"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import HeadingComponent from "@/components/common/HeadingComponent";
import Image from "next/image";
import logo from "/public/images/logo/logo-login.svg";

const AuthLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Determine background class based on route
  const backgroundClasses: Record<string, string> = {
    "/login": "bg-login-bg",
    "/otp-verification": "bg-otp-bg",
    "/register": "bg-register-bg",
    "/forgot-password": "bg-forgot-bg",
    "/reset-password": "bg-forgot-bg",
  };

  // Default to login background if route is not found
  const bgClass = backgroundClasses[pathname] || "bg-login-bg";

  return (
    <div className="min-h-screen flex lg:flex-nowrap flex-wrap bg-no-repeat bg-cover bg-auth-bg">
      <div
        className={`lg:w-1/2 w-full lg:min-h-full lg:block hidden bg-no-repeat bg-cover bg-center ${bgClass}`}
      />
      <div className="lg:w-1/2 w-full">
        <div className="p-4 sm:px-10 max-w-[641px] w-full mx-auto flex justify-center flex-col h-full lg:gap-[54px] gap-8">
          <div className="flex flex-col gap-[8px]">
            <HeadingComponent tag="h1" text="Welcome to" />
            <em className="leading-[0] inline-block min-w-[184px] lg:mb-[56px] mb-[32px]">
              <Image src={logo} width={184} height={34} alt="logo" />
            </em>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
