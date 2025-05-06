"use client";
//
import { MouseEvent, useContext, useEffect, useState } from "react";
import { ChevronDown, Route } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import selleronboard from "../../../public/images/icons/Seller Onboarding Details.svg";
import productlisting from "../../../public/images/icons/Product Listing.svg";
import buyeronboarding from "../../../public/images/icons/Buyer Onboarding Details.svg";
import buyerdashboard from "../../../public/images/icons/Buyer Dashboard.svg";

import sellerdashboard from "../../../public/images/icons/Seller Dashboard.svg";
sellerdashboard;
import logo from "../../../public/images/logo/logoehite.png";
import { getLocalStorage } from "@/lib/useLocalStorage";
import { ROLES } from "@/constants/common.constants";
import { ROUTES } from "@/utils/route.utils";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserContext } from "@/utils/userContext";
const navItems = [
  {
    title: "Products",
    src: "/images/icons/home.svg",
    items: [
      { title: "Overview", href: "/products", id: "overview" },
      { title: "Categories", href: "/products/categories", id: "categories" },
      { title: "Inventory", href: "/products/inventory", id: "inventory" },
    ],
  },
];

export function Sidebar({ onMenuSelect }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(() => getLocalStorage("user"));
  const pathname = usePathname();
  const { data: currentUser } = useContext(UserContext);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleItemClick = (e: any, id: string) => {
    e.preventDefault();
    onMenuSelect(id);
  };

  const isAdmin = userData && userData.userRoles.includes(ROLES.SUPER_ADMIN);
  // const currentUser = userData && userData.currentUser;

  return (
    <>
      <div className="">
        {/* <div className=" border-[#b6b6b6]/10 pt-[14px] pb-[13px] px-[33px] ">
          <Link href="/">
            <Image
              src={logo}
              alt="Mineramax Logo"
              width={200}
              height={200}
              className="w-[173px] h-[32px] object-contain"
            />
          </Link>
        </div> */}
        <nav className="space-y-2  px-3 overflow-y-auto max-h-screen pt-5 pb-[100px]">
          {/* {navItems.map((item, index) => (
        <Collapsible
          key={index}
          className="w-full"
          open={openIndex === index}
          onOpenChange={() => handleToggle(index)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-blue-800 rounded group">
            <div className="flex items-center gap-3">
              {item.src && (
                <Image
                  src={item.src}
                  alt="icons"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              )}
              <span className="text-white text-[14px] font-medium leading-[13.6px]">
                {item.title}
              </span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="9"
              viewBox="0 0 4 9"
              fill="none"
              className="group-data-[state=open]:rotate-90"
            >
              <path
                d="M3.84795 4.231L0.853801 0.813865C0.752437 0.707079 0.635478 0.653687 0.502924 0.653687C0.37037 0.653687 0.253411 0.707079 0.152047 0.813865C0.0506823 0.929549 0 1.06303 0 1.21431C0 1.36559 0.0506823 1.49907 0.152047 1.61476L2.79532 4.63145L0.152047 7.64814C0.0506823 7.76382 0 7.89731 0 8.04859C0 8.19987 0.0506823 8.33335 0.152047 8.44903C0.206628 8.51132 0.259259 8.55582 0.309942 8.58251C0.360624 8.60921 0.424951 8.62256 0.502924 8.62256C0.580897 8.62256 0.645224 8.60921 0.695906 8.58251C0.746589 8.55582 0.79922 8.51132 0.853801 8.44903L3.84795 5.03189C3.94932 4.91621 4 4.78273 4 4.63145C4 4.48017 3.94932 4.34669 3.84795 4.231Z"
                fill="white"
              />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-12 space-y-1 mt-1">
            {item.items.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                onClick={(e) => handleItemClick(e, subItem.id)}
                className="block py-1.5 px-2 text-sm text-gray-300 hover:text-white hover:bg-blue-800 rounded"
              >
                {subItem.title}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))} */}

          {currentUser === ROLES.SELLER && (
            <>
              <Link
                href={ROUTES.SELLER_DASHBOARD}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.SELLER_DASHBOARD && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={sellerdashboard}
                    width={20}
                    height={20}
                    alt="sellerdashboard"
                    className=""
                  />
                  Seller Dashboard
                  {/* <div className="bg-blueDark4F rounded-[4px] p-1 text-white flex justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    1
                  </div> */}
                </div>
              </Link>
              <Link
                href={ROUTES.SELLER_PRODUCT_LISTING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.SELLER_PRODUCT_LISTING && "bg-blueCE",
                  pathname == ROUTES.SELLER_ADD_PRODUCT && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={productlisting}
                    width={20}
                    height={20}
                    alt="selleronboard"
                    className=""
                  />
                  Product Listing
                  {/* <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div> */}
                </div>
              </Link>
              <Link
                href={ROUTES.EDIT_SELLER_ONBOARDING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.EDIT_SELLER_ONBOARDING && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={selleronboard}
                    width={20}
                    height={20}
                    alt="selleronboard"
                    className=""
                  />
                  Seller onboarding details
                  {/* <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div> */}
                </div>
              </Link>
            </>
          )}
          {currentUser === ROLES.BUYER && (
            <>
              <Link
                href={ROUTES.BUYER_DASHBOARD}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.BUYER_DASHBOARD && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={buyerdashboard}
                    width={20}
                    height={20}
                    alt="buyerdashboard"
                    className=""
                  />
                  Buyer Dashboard
                  {/* <div className="bg-blueDark4F rounded-[4px] p-1 text-white flex justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    1
                  </div> */}
                </div>
              </Link>
              <Link
                href={ROUTES.EDIT_BUYER_ONBOARDING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.EDIT_BUYER_ONBOARDING && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={buyeronboarding}
                    width={20}
                    height={20}
                    alt="buyeronboarding"
                    className=""
                  />
                  Buyer onboarding details
                  {/* <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div> */}
                </div>
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <Link
                href={ROUTES.ADMIN_DASHBOARD}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname == ROUTES.ADMIN_DASHBOARD && "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={buyerdashboard}
                    width={20}
                    height={20}
                    alt="buyerdashboard"
                    className=""
                  />
                  Dashboard
                  {/* <div className="bg-blueDark4F rounded-[4px] p-1 text-white flex justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    1
                  </div> */}
                </div>
              </Link>
              <Link
                href={ROUTES.BUYER_LISTING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname.includes(ROUTES.BUYER_LISTING) ||
                    pathname.includes(ROUTES.VIEW_BUYER_DETAILS())
                    ? "bg-blueCE"
                    : "",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={buyeronboarding}
                    width={20}
                    height={20}
                    alt="buyeronboarding"
                    className=""
                  />
                  Buyers
                  <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div>
                </div>
              </Link>
              <Link
                href={ROUTES.SELLER_LISTING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  pathname.includes(ROUTES.SELLER_LISTING) ||
                    pathname.includes(ROUTES.VIEW_SELLER_DETAILS())
                    ? "bg-blueCE"
                    : "",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={selleronboard}
                    width={20}
                    height={20}
                    alt="selleronboard"
                    className=""
                  />
                  Sellers
                  <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div>
                </div>
              </Link>
              <Link
                href={ROUTES.ADMIN_PRODUCT_LISTING}
                className={cn(
                  "flex justify-between items-center py-[14px] px-3 text-sm text-white hover:text-white hover:bg-blueCE rounded-lg transition-all duration-300",
                  (pathname.includes(ROUTES.ADMIN_PRODUCT_LISTING) ||
                    pathname.includes(ROUTES.SELLER_ADD_PRODUCT)) &&
                    "bg-blueCE",
                )}
              >
                <div className="flex justify-start items-center gap-[10px]">
                  <Image
                    src={productlisting}
                    width={20}
                    height={20}
                    alt="productlisting"
                    className=""
                  />
                  Products
                  <div className="bg-blueCE rounded-[4px] p-1 text-white hidden justify-center items-center font-semibold text-[10px] leading-[10px] w-6 h-[18px]">
                    2
                  </div>
                </div>
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
