"use client";

import * as React from "react";
import Image from "next/image";

interface CircularProgressProps {
  progress: number;
  image: string;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  progress,
  image,
  size = 120,
  strokeWidth = 6,
}: CircularProgressProps) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full bg-[#1B2B65]"
          style={{ padding: strokeWidth }}
        >
          <div className="relative  overflow-hidden rounded-full h-[41px] w-[41px]">
            <Image
              src={image}
              alt="Profile"
              className="object-cover h-full w-full"
              width={200}
              height={200}
            />
          </div>
        </div>

        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#2EBE6D"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="flex h-[15px] min-w-[34px] items-center justify-center rounded-[10.932px] bg-white  shadow-sm absolute -bottom-[10px] left-[10px]">
          <span className="text-[10px] font-semibold leading-[12px] text-[#2EBE6D]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
