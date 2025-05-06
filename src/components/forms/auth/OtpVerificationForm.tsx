"use client";

import Link from "next/link";
import { setCookie } from "cookies-next";
import { ClockIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { ROUTES } from "@/utils/route.utils";
import HeadingComponent from "@/components/common/HeadingComponent";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import {
  UseSendOTP,
  UseVerifyOtp,
} from "@/services/query-components/auth.query-components.services";
import { ROLES } from "@/constants/common.constants";
import { saveLocalStorage } from "@/lib/useLocalStorage";

interface OtpInputRef extends HTMLInputElement {
  value: string;
  focus: () => void;
}

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timer, setTimer] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [otpError, setOtpError] = useState<string>("");
  const inputRefs = useRef<(OtpInputRef | null)[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const email = searchParams.get("email");
  const from = searchParams.get("from");

  if (!email) redirect(ROUTES.LOGIN);

  const getTargetRoute = async (data: any) => {
    if (from === "forgot-password") return ROUTES.RESET_PASSWORD;

    const isSeller = data.userRoles.includes(ROLES.SELLER);
    const isBuyer = data.userRoles.includes(ROLES.BUYER);
    const isAdmin = data.userRoles.includes(ROLES.SUPER_ADMIN);

    if (isSeller) {
      if (!data.sellerBasicDetailsCompleted) {
        return ROUTES.SELLER_ONBOARDING;
      } else {
        return ROUTES.HOME;
      }
    } else if (isBuyer) {
      if (!data.buyerBasicDetailsCompleted) {
        return ROUTES.BUYER_ONBOARDING;
      } else {
        return ROUTES.HOME;
      }
    } else if (isAdmin) {
      return ROUTES.ADMIN_DASHBOARD;
    } else {
      return ROUTES.HOME;
    }
  };

  const successCallback = async (data: any) => {
    const expirationTime = await new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    await setCookie("ACCESS_TOKEN", data.loginToken, {
      secure: true, // Important for HTTPS
      expires: expirationTime,
      path: "/", // Crucial for cookie accessibility
      sameSite: "lax", // Recommended for security
    });

    const { loginToken, ...rest } = data;
    await saveLocalStorage("user", { ...rest, currentUser: data.userRoles[0] });

    const targetRoute = await getTargetRoute(data); // Create this helper function
    window.location.href = targetRoute;
  };

  const failureCallback = () => {};
  const verifyOtpMutation = UseVerifyOtp(successCallback, failureCallback);

  const failureCallbackForOTP = (statusCode: string) => {};
  const successCallbackForOTP = (data: any) => {};
  const { mutate: resendOtpMutation, isPending } = UseSendOTP(
    successCallbackForOTP,
    failureCallbackForOTP,
  );

  const startTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    setTimer(120);
    setCanResend(false);

    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
          }
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (otpValues.some((value) => value !== "")) {
      setOtpError("");
    }
  }, [otpValues]);

  const handleOtpChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      e.key === "Backspace" &&
      !otpValues[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendOtp = async () => {
    if (!canResend || !email) return;

    try {
      // Keep the resend button disabled while request is in progress
      setCanResend(false);
      resendOtpMutation(email);

      // Only reset OTP fields and start timer on successful resend
      setOtpValues(["", "", "", "", "", ""]);
      setOtpError("");
      inputRefs.current.forEach((input) => {
        if (input) input.value = "";
      });
      startTimer();
    } catch (error) {
      // Re-enable the resend button on error
      setCanResend(true);
      console.error("Error resending OTP:", error);
    }
  };

  const validateOtp = (): boolean => {
    if (otpValues.some((value) => value === "")) {
      setOtpError("Please enter the complete OTP code");
      const emptyIndex = otpValues.findIndex((value) => value === "");
      if (emptyIndex !== -1 && inputRefs.current[emptyIndex]) {
        inputRefs.current[emptyIndex]?.focus();
      }
      return false;
    }

    if (otpValues.some((value) => !/^\d$/.test(value))) {
      setOtpError("OTP must contain only numbers");
      return false;
    }

    return true;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (pasteData.length === 6) {
      setOtpValues(pasteData.split(""));
      pasteData.split("").forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit;
        }
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp()) return;

    verifyOtpMutation.mutate({
      email: email,
      otp: otpValues.join(""),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <HeadingComponent tag="h2" text="OTP Verification" />
        <p className="text-grey88/70 lg:text-base text-sm font-semibold leading-normal">
          We&apos;ve sent a code to {email}
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 auth-page-forms">
        <div className="flex flex-col gap-4">
          <div className="flex xl:gap-10 gap-8">
            {otpValues.map((value, index) => (
              <div
                key={index}
                className="min-w-[50px] xl:min-w-[50px] max-w-[calc(16.6%-27px)] w-full"
              >
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  type="text"
                  maxLength={1}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={`w-full border-0 text-[#122D4F] font-medium bg-white min-h-[50px] xl:min-h-[60px] text-center text-xl rounded-lg shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                          ${otpError ? "border-[1px] border-red-500" : ""}`}
                />
              </div>
            ))}
          </div>
          {otpError && (
            <div className="text-red-500 text-sm text-start font-medium">
              {otpError}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            {from === "forgot-password" ? (
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-[#122D4F80] text-[16px] font-semibold leading-normal underline decoration-solid decoration-skip-ink-none hover:text-[#122D4F] transition-colors"
              >
                Enter Wrong Email?
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-center items-center text-[#122D4F] gap-[6px] text-[16px] font-semibold leading-normal ">
            {formatTime(timer)} <span>Minutes</span>
            <ClockIcon />
          </div>
        </div>

        <div className="flex md:gap-[25px] gap-3 mt-6">
          <ButtonComponent
            variant="primary"
            element="button-big"
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isPending}
            className={`w-1/2 text-center ${!canResend || isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Sending..." : "Resend Code"}
          </ButtonComponent>
          <ButtonComponent
            variant="secondary"
            element="button-big"
            type="submit"
            className="w-1/2"
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
}

export default OtpVerificationForm;
