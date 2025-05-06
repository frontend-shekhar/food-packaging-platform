"use client";
import React, { ReactNode } from "react";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import arrow from "/public/images/arrow.svg";
import logo from "/public/images/logo/logoehite.png";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen lg:block flex bg-[#fbfbfb]">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "show" : ""} z-[999] w-[253px] bg-gradient-to-t from-custom-blue to-custom-blue h-full text-white fixed top-0 bottom-0 min-h-screen `}
      >
        <button
          className="lg:hidden p-2 absolute -right-5 top-10"
          onClick={toggleSidebar}
        >
          <Image
            src={arrow}
            alt="arrow"
            width={200}
            height={200}
            className="w-[20px] h-[20px] object-contain"
          />
        </button>

        <div className="border-b border-[#b6b6b6]/10 pt-[14px] pb-[14px] px-[33px]">
          <Link href="/">
            <Image
              src={logo}
              alt="Mineramax Logo"
              width={200}
              height={200}
              className="w-[173px] h-[32px] object-contain"
            />
          </Link>
        </div>
        <Sidebar />
      </aside>
      <div className="lg:ml-[253px] flex flex-col min-h-screen lg:w-auto w-full">
        <Header toggleSidebar={toggleSidebar} title="Admin Dashboard" />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
