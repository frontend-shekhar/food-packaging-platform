"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, ChevronDown, Route } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../../public/images/logo/logo.png";
import Container from "@/components/common/Container";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../common/ButtonComponent";
import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from "@/lib/useLocalStorage";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/route.utils";
import { ROLES } from "@/constants/common.constants";
import avatar from "../../../public/images/icons/user.png";
import {
  UseBecomeBuyer,
  UseBecomeSeller,
} from "@/services/query-components/auth.query-components.services";

export function Header() {
  const [menuToggler, setMenuToggler] = useState(false);
  const [user, setUser] = useState<any>(() => getLocalStorage("user"));
  const router = useRouter();
  const pathname = usePathname();
  const handleLogOut = () => {
    deleteCookie("ACCESS_TOKEN");
    removeLocalStorage("user");
    removeLocalStorage("documentDetails");
    setUser(null);
    setTimeout(() => {
      window.location.replace(ROUTES.HOME);
    }, 100);
  };

  const successCallbackForSeller = (data: any) => {
    router.replace(ROUTES.SELLER_ONBOARDING);
    const { loginToken, ...rest } = data;
    saveLocalStorage("user", { ...rest, currentUser: user.currentUser });
  };
  const failureCallbackForSeller = () => {};
  const { mutate: becomeSellerMutate } = UseBecomeSeller(
    successCallbackForSeller,
    failureCallbackForSeller,
  );

  const successCallbackForBuyer = (data: any) => {
    router.replace(ROUTES.BUYER_ONBOARDING);
    const { loginToken, ...rest } = data;
    saveLocalStorage("user", { ...rest, currentUser: user.currentUser });
  };
  const failureCallbackForBuyer = () => {};
  const { mutate: becomeBuyerMutate } = UseBecomeBuyer(
    successCallbackForBuyer,
    failureCallbackForBuyer,
  );

  const renderHeaderLinks = () => {
    const isAdmin = user.userRoles.includes(ROLES.SUPER_ADMIN);
    const isBuyer = user.userRoles.includes(ROLES.BUYER);
    const isSeller = user.userRoles.includes(ROLES.SELLER);

    const handleSelectUser = (route: string) => {
      if (route === ROUTES.BUYER_DASHBOARD) {
        saveLocalStorage("user", { ...user, currentUser: ROLES.BUYER });
      } else if (route === ROUTES.SELLER_DASHBOARD) {
        saveLocalStorage("user", { ...user, currentUser: ROLES.SELLER });
      }
      router.push(route);
    };

    if (isAdmin) {
      return (
        <ButtonComponent
          element="link"
          variant="link"
          href={ROUTES.ADMIN_DASHBOARD}
          className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_175_2547)">
              <path
                d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                fill="#2B62DD"
              />
            </g>
            <defs>
              <clipPath id="clip0_175_2547">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="text-sm">Go to dashboard</span>
        </ButtonComponent>
      );
    } else if (
      isSeller &&
      isBuyer &&
      user.sellerBasicDetailsCompleted &&
      user.buyerBasicDetailsCompleted
    ) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="m-0 p-0">
            <Button
              variant="link"
              className="flex items-center gap-2 text-blueDark4F text-sm font-semibold leading-normal hover:no-underline cursor-pointer"
            >
              Dashboards
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <ButtonComponent
                onClick={() => handleSelectUser(ROUTES.BUYER_DASHBOARD)}
              >
                Buyer Dashboard
              </ButtonComponent>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <ButtonComponent
                onClick={() => handleSelectUser(ROUTES.SELLER_DASHBOARD)}
              >
                Seller Dashboard
              </ButtonComponent>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (
      isBuyer &&
      !user.sellerBasicDetailsCompleted &&
      user.buyerBasicDetailsCompleted &&
      pathname !== ROUTES.SELLER_ONBOARDING
    ) {
      return (
        <>
          <ButtonComponent
            element="button"
            variant="link"
            className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
            onClick={() => becomeSellerMutate(user.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_175_2547)">
                <path
                  d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                  fill="#2B62DD"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_2547">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm">Become a Seller</span>
          </ButtonComponent>
          <ButtonComponent
            element="link"
            variant="link"
            href={ROUTES.BUYER_DASHBOARD}
            className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_175_2547)">
                <path
                  d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                  fill="#2B62DD"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_2547">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm">Go to dashboard</span>
          </ButtonComponent>
        </>
      );
    } else if (
      isSeller &&
      !user.buyerBasicDetailsCompleted &&
      user.sellerBasicDetailsCompleted &&
      pathname !== ROUTES.BUYER_ONBOARDING
    ) {
      return (
        <>
          <ButtonComponent
            element="button"
            variant="link"
            onClick={() => becomeBuyerMutate(user.id)}
            className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_175_2547)">
                <path
                  d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                  fill="#2B62DD"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_2547">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm">Become a buyer</span>
          </ButtonComponent>
          <ButtonComponent
            element="link"
            variant="link"
            href={ROUTES.SELLER_DASHBOARD}
            className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_175_2547)">
                <path
                  d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                  fill="#2B62DD"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_2547">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm">Go to dashboard</span>
          </ButtonComponent>
        </>
      );
    }
  };

  return (
    <>
      <div className="border-b">
        {/* Top Header */}
        <div className="bg-[#f8f9fa] py-4 ">
          <Container>
            <div className="hidden lg:flex items-center lg:flex-row flex-col gap-4 lg:gap-7 xl:gap-[53px] justify-between">
              <div className="flex items-center lg:flex-row flex-col gap-4 lg:gap-[34px]">
                <div className="flex min-w-[160px] xl:min-w-[184px] h-[33px]">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="Mineramax Logo"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                </div>

                <div className="relative ">
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="m-0 p-0 absolute !h-full flex items-center top-1/2 -translate-y-1/2 left-[18px] border-r border-blueDark4F/50 min-w-12 rounded-none justify-start"
                    >
                      <Button
                        variant="ghost"
                        className="w-auto h-auto text-sm font-normal text-blueDark4F leading-normal gap-2"
                      >
                        All <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Tool 1</DropdownMenuItem>
                      <DropdownMenuItem>Tool 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  <label className="text-blueDark4F text-[14px] font-medium leading-[13.6px] absolute h-full flex items-center top-1/2 -translate-y-1/2 left-[18px] m-0 border-r border-blueDark4F/50 min-w-12">
                    All
                  </label>

                  <Input
                    type="text"
                    placeholder="Search your own items"
                    className="w-full ps-20 placeholder:text-blueDark4F rounded-lg bg-white shadow-sm lg:min-w-[362px]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-x-4 sm:gap-x-4 gap-y-1 sm:flex-nowrap flex-wrap whitespace-nowrap">
                {/* <ButtonComponent
                  element="link"
                  variant="link"
                  href="#"
                  className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_175_2542)">
                      <path
                        d="M12.6667 0.666992H3.33333C2.4496 0.668051 1.60237 1.01958 0.97748 1.64447C0.352588 2.26936 0.00105857 3.1166 0 4.00032L0 12.0003C0.00105857 12.8841 0.352588 13.7313 0.97748 14.3562C1.60237 14.9811 2.4496 15.3326 3.33333 15.3337H12.6667C13.5504 15.3326 14.3976 14.9811 15.0225 14.3562C15.6474 13.7313 15.9989 12.8841 16 12.0003V4.00032C15.9989 3.1166 15.6474 2.26936 15.0225 1.64447C14.3976 1.01958 13.5504 0.668051 12.6667 0.666992ZM3.33333 2.00033H12.6667C13.0659 2.00111 13.4557 2.12134 13.786 2.34553C14.1163 2.56972 14.3719 2.88762 14.52 3.25833L9.41467 8.36432C9.03895 8.73853 8.53028 8.94864 8 8.94864C7.46972 8.94864 6.96105 8.73853 6.58533 8.36432L1.48 3.25833C1.6281 2.88762 1.88374 2.56972 2.21403 2.34553C2.54432 2.12134 2.93414 2.00111 3.33333 2.00033ZM12.6667 14.0003H3.33333C2.8029 14.0003 2.29419 13.7896 1.91912 13.4145C1.54405 13.0395 1.33333 12.5308 1.33333 12.0003V5.00032L5.64267 9.30699C6.26842 9.93116 7.11617 10.2817 8 10.2817C8.88383 10.2817 9.73158 9.93116 10.3573 9.30699L14.6667 5.00032V12.0003C14.6667 12.5308 14.456 13.0395 14.0809 13.4145C13.7058 13.7896 13.1971 14.0003 12.6667 14.0003Z"
                        fill="#2B62DD"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2542">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-sm">Chat</span>
                </ButtonComponent>
                <ButtonComponent
                  element="link"
                  variant="link"
                  href="#"
                  className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_175_2536)">
                      <path
                        d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z"
                        fill="#2B62DD"
                      />
                      <path
                        d="M8.47801 3.37522C8.09356 3.30518 7.69842 3.32048 7.32054 3.42005C6.94266 3.51962 6.59128 3.70102 6.29127 3.95142C5.99126 4.20183 5.74995 4.5151 5.58442 4.86909C5.41888 5.22307 5.33317 5.60911 5.33334 5.99989C5.33334 6.1767 5.40358 6.34627 5.52861 6.47129C5.65363 6.59632 5.8232 6.66656 6.00001 6.66656C6.17682 6.66656 6.34639 6.59632 6.47141 6.47129C6.59644 6.34627 6.66668 6.1767 6.66668 5.99989C6.66651 5.80374 6.70962 5.60997 6.79294 5.43239C6.87626 5.25482 6.99773 5.09781 7.14869 4.97257C7.29965 4.84733 7.47639 4.75695 7.66629 4.70785C7.8562 4.65876 8.0546 4.65217 8.24734 4.68856C8.5107 4.73968 8.75285 4.86815 8.94284 5.05755C9.13284 5.24695 9.26206 5.48869 9.31401 5.75189C9.36648 6.02816 9.33025 6.31394 9.21051 6.56838C9.09078 6.82282 8.89366 7.03289 8.64734 7.16856C8.23946 7.40487 7.9024 7.74623 7.67129 8.15709C7.44019 8.56795 7.32348 9.03326 7.33334 9.50456V9.99989C7.33334 10.1767 7.40358 10.3463 7.52861 10.4713C7.65363 10.5963 7.8232 10.6666 8.00001 10.6666C8.17682 10.6666 8.34639 10.5963 8.47142 10.4713C8.59644 10.3463 8.66668 10.1767 8.66668 9.99989V9.50456C8.65831 9.27256 8.71121 9.04246 8.82006 8.83742C8.9289 8.63237 9.08984 8.45962 9.28668 8.33656C9.76969 8.07127 10.1586 7.66286 10.4001 7.16749C10.6415 6.67212 10.7235 6.11413 10.6349 5.57024C10.5462 5.02635 10.2912 4.52328 9.90501 4.13022C9.51878 3.73715 9.02026 3.4734 8.47801 3.37522Z"
                        fill="#2B62DD"
                      />
                      <path
                        d="M8.66683 11.9997C8.66683 11.6315 8.36835 11.333 8.00016 11.333C7.63197 11.333 7.3335 11.6315 7.3335 11.9997C7.3335 12.3679 7.63197 12.6663 8.00016 12.6663C8.36835 12.6663 8.66683 12.3679 8.66683 11.9997Z"
                        fill="#2B62DD"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2536">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-sm">Help</span>
                </ButtonComponent> */}
                {user ? (
                  renderHeaderLinks()
                ) : (
                  <>
                    <ButtonComponent
                      element="link"
                      variant="link"
                      href={ROUTES.SELLER_ONBOARDING}
                      className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_175_2547)">
                          <path
                            d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                            fill="#2B62DD"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_175_2547">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className="text-sm">Become a Seller</span>
                    </ButtonComponent>
                    <ButtonComponent
                      element="link"
                      variant="link"
                      href={ROUTES.BUYER_ONBOARDING}
                      className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_175_2547)">
                          <path
                            d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                            fill="#2B62DD"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_175_2547">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className="text-sm">Become a Buyer</span>
                    </ButtonComponent>
                  </>
                )}

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="m-0 p-0">
                      <Button
                        variant="link"
                        className="flex justify-start items-center gap-2 text-blueDark4F text-sm font-semibold leading-normal hover:no-underline cursor-pointer group"
                      >
                        <Image
                          src={avatar}
                          alt="profile"
                          width={200}
                          height={200}
                          className="w-[32px] h-[32px] object-contain"
                        />
                        {user ? user.firstName + " " + user.lastName : ""}{" "}
                        <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={handleLogOut}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.93335 5.03991C6.14002 2.63991 7.37335 1.65991 10.0733 1.65991H10.16C13.14 1.65991 14.3334 2.85325 14.3334 5.83325V10.1799C14.3334 13.1599 13.14 14.3532 10.16 14.3532H10.0733C7.39335 14.3532 6.16002 13.3866 5.94002 11.0266"
                            stroke="#2B62DD"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 8H2.41333"
                            stroke="#2B62DD"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.90002 5.7666L1.66669 7.99994L3.90002 10.2333"
                            stroke="#2B62DD"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="text-sm">Logout</span>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>Tool 2</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <ButtonComponent
                    element="link"
                    variant="link"
                    href={ROUTES.LOGIN}
                    className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.78668 9.74659L9.49335 8.03992L7.78668 6.33325"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.66669 8.04004H9.44669"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 2.66675C10.9467 2.66675 13.3333 4.66675 13.3333 8.00008C13.3333 11.3334 10.9467 13.3334 8 13.3334"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-sm">Login</span>
                  </ButtonComponent>
                )}

                {/* <ButtonComponent
                  type="button"
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
                >
                  {user ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.93335 5.03991C6.14002 2.63991 7.37335 1.65991 10.0733 1.65991H10.16C13.14 1.65991 14.3334 2.85325 14.3334 5.83325V10.1799C14.3334 13.1599 13.14 14.3532 10.16 14.3532H10.0733C7.39335 14.3532 6.16002 13.3866 5.94002 11.0266"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 8H2.41333"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.90002 5.7666L1.66669 7.99994L3.90002 10.2333"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.78668 9.74659L9.49335 8.03992L7.78668 6.33325"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.66669 8.04004H9.44669"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 2.66675C10.9467 2.66675 13.3333 4.66675 13.3333 8.00008C13.3333 11.3334 10.9467 13.3334 8 13.3334"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}

                  <span className="text-sm">{user ? "Logout" : "Login"}</span>
                </ButtonComponent> */}
              </div>
            </div>
            <div className="flex lg:hidden items-center lg:flex-row flex-col gap-4 lg:gap-7 xl:gap-[53px]">
              <div className="lg:flex min-w-[160px] xl:min-w-[183px] min-h-[33px]">
                <Image
                  src={logo}
                  alt="Mineramax Logo"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between md:flex-row flex-col w-full gap-5 lg:gap-10">
                <div className="relative w-full md:w-[40%]">
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="m-0 p-0 absolute !h-full flex items-center top-1/2 -translate-y-1/2 left-[18px] border-r border-blueDark4F/50 min-w-12 rounded-none justify-start"
                    >
                      <Button
                        variant="ghost"
                        className="w-auto h-auto text-sm font-normal text-blueDark4F leading-normal gap-2"
                      >
                        All <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Tool 1</DropdownMenuItem>
                      <DropdownMenuItem>Tool 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  <label className="text-blueDark4F text-[14px] font-medium leading-[13.6px] absolute h-full flex items-center top-1/2 -translate-y-1/2 left-[18px] m-0 border-r border-blueDark4F/50 min-w-12">
                    All
                  </label>

                  <Input
                    type="text"
                    placeholder="Search your own items"
                    className="w-full ps-20 placeholder:text-blueDark4F rounded-lg bg-white shadow-sm lg:min-w-[362px]"
                  />
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-x-4 sm:gap-x-4 gap-y-1 sm:flex-nowrap flex-wrap whitespace-nowrap">
                  {/* <ButtonComponent
                    element="link"
                    variant="link"
                    href="#"
                    className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_175_2542)">
                        <path
                          d="M12.6667 0.666992H3.33333C2.4496 0.668051 1.60237 1.01958 0.97748 1.64447C0.352588 2.26936 0.00105857 3.1166 0 4.00032L0 12.0003C0.00105857 12.8841 0.352588 13.7313 0.97748 14.3562C1.60237 14.9811 2.4496 15.3326 3.33333 15.3337H12.6667C13.5504 15.3326 14.3976 14.9811 15.0225 14.3562C15.6474 13.7313 15.9989 12.8841 16 12.0003V4.00032C15.9989 3.1166 15.6474 2.26936 15.0225 1.64447C14.3976 1.01958 13.5504 0.668051 12.6667 0.666992ZM3.33333 2.00033H12.6667C13.0659 2.00111 13.4557 2.12134 13.786 2.34553C14.1163 2.56972 14.3719 2.88762 14.52 3.25833L9.41467 8.36432C9.03895 8.73853 8.53028 8.94864 8 8.94864C7.46972 8.94864 6.96105 8.73853 6.58533 8.36432L1.48 3.25833C1.6281 2.88762 1.88374 2.56972 2.21403 2.34553C2.54432 2.12134 2.93414 2.00111 3.33333 2.00033ZM12.6667 14.0003H3.33333C2.8029 14.0003 2.29419 13.7896 1.91912 13.4145C1.54405 13.0395 1.33333 12.5308 1.33333 12.0003V5.00032L5.64267 9.30699C6.26842 9.93116 7.11617 10.2817 8 10.2817C8.88383 10.2817 9.73158 9.93116 10.3573 9.30699L14.6667 5.00032V12.0003C14.6667 12.5308 14.456 13.0395 14.0809 13.4145C13.7058 13.7896 13.1971 14.0003 12.6667 14.0003Z"
                          fill="#2B62DD"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_175_2542">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm">Chat</span>
                  </ButtonComponent>
                  <ButtonComponent
                    element="link"
                    variant="link"
                    href={ROUTES.SELLER_ONBOARDING}
                    className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_175_2536)">
                        <path
                          d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0ZM8 14.6667C6.68146 14.6667 5.39253 14.2757 4.2962 13.5431C3.19987 12.8106 2.34539 11.7694 1.84081 10.5512C1.33622 9.33305 1.2042 7.99261 1.46144 6.6994C1.71867 5.40619 2.35361 4.21831 3.28596 3.28596C4.21831 2.35361 5.4062 1.71867 6.6994 1.46143C7.99261 1.2042 9.33305 1.33622 10.5512 1.8408C11.7694 2.34539 12.8106 3.19987 13.5431 4.2962C14.2757 5.39253 14.6667 6.68146 14.6667 8C14.6647 9.76752 13.9617 11.4621 12.7119 12.7119C11.4621 13.9617 9.76752 14.6647 8 14.6667Z"
                          fill="#2B62DD"
                        />
                        <path
                          d="M8.47801 3.37522C8.09356 3.30518 7.69842 3.32048 7.32054 3.42005C6.94266 3.51962 6.59128 3.70102 6.29127 3.95142C5.99126 4.20183 5.74995 4.5151 5.58442 4.86909C5.41888 5.22307 5.33317 5.60911 5.33334 5.99989C5.33334 6.1767 5.40358 6.34627 5.52861 6.47129C5.65363 6.59632 5.8232 6.66656 6.00001 6.66656C6.17682 6.66656 6.34639 6.59632 6.47141 6.47129C6.59644 6.34627 6.66668 6.1767 6.66668 5.99989C6.66651 5.80374 6.70962 5.60997 6.79294 5.43239C6.87626 5.25482 6.99773 5.09781 7.14869 4.97257C7.29965 4.84733 7.47639 4.75695 7.66629 4.70785C7.8562 4.65876 8.0546 4.65217 8.24734 4.68856C8.5107 4.73968 8.75285 4.86815 8.94284 5.05755C9.13284 5.24695 9.26206 5.48869 9.31401 5.75189C9.36648 6.02816 9.33025 6.31394 9.21051 6.56838C9.09078 6.82282 8.89366 7.03289 8.64734 7.16856C8.23946 7.40487 7.9024 7.74623 7.67129 8.15709C7.44019 8.56795 7.32348 9.03326 7.33334 9.50456V9.99989C7.33334 10.1767 7.40358 10.3463 7.52861 10.4713C7.65363 10.5963 7.8232 10.6666 8.00001 10.6666C8.17682 10.6666 8.34639 10.5963 8.47142 10.4713C8.59644 10.3463 8.66668 10.1767 8.66668 9.99989V9.50456C8.65831 9.27256 8.71121 9.04246 8.82006 8.83742C8.9289 8.63237 9.08984 8.45962 9.28668 8.33656C9.76969 8.07127 10.1586 7.66286 10.4001 7.16749C10.6415 6.67212 10.7235 6.11413 10.6349 5.57024C10.5462 5.02635 10.2912 4.52328 9.90501 4.13022C9.51878 3.73715 9.02026 3.4734 8.47801 3.37522Z"
                          fill="#2B62DD"
                        />
                        <path
                          d="M8.66683 11.9997C8.66683 11.6315 8.36835 11.333 8.00016 11.333C7.63197 11.333 7.3335 11.6315 7.3335 11.9997C7.3335 12.3679 7.63197 12.6663 8.00016 12.6663C8.36835 12.6663 8.66683 12.3679 8.66683 11.9997Z"
                          fill="#2B62DD"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_175_2536">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm">Help</span>
                  </ButtonComponent> */}
                  {/* <ButtonComponent
                    element="link"
                    variant="link"
                    href="#"
                    className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_175_2547)">
                        <path
                          d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                          fill="#2B62DD"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_175_2547">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-sm">Become a Seller</span>
                  </ButtonComponent>
                  <ButtonComponent
                    variant="link"
                    onClick={handleLogOut}
                    className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M7.78668 9.74659L9.49335 8.03992L7.78668 6.33325"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.66669 8.04004H9.44669"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 2.66675C10.9467 2.66675 13.3333 4.66675 13.3333 8.00008C13.3333 11.3334 10.9467 13.3334 8 13.3334"
                        stroke="#2B62DD"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-sm">{user ? "Logout" : "Login"}</span>
                  </ButtonComponent> */}
                  {user ? (
                    renderHeaderLinks()
                  ) : (
                    <ButtonComponent
                      element="link"
                      variant="link"
                      href={ROUTES.SELLER_ONBOARDING}
                      className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_175_2547)">
                          <path
                            d="M6 8C8.206 8 10 6.206 10 4C10 1.794 8.206 0 6 0C3.794 0 2 1.794 2 4C2 6.206 3.794 8 6 8ZM6 1.33333C7.47067 1.33333 8.66667 2.52933 8.66667 4C8.66667 5.47067 7.47067 6.66667 6 6.66667C4.52933 6.66667 3.33333 5.47067 3.33333 4C3.33333 2.52933 4.52933 1.33333 6 1.33333ZM14 12.6667H15.3333V16H8V12.6667H9.33333V14.6667H14V12.6667ZM3.33333 9.33333H6.46133L5.846 10.6667H3.33333C2.23067 10.6667 1.33333 11.564 1.33333 12.6667V16H0V12.6667C0 10.8287 1.49533 9.33333 3.33333 9.33333ZM16 10.6667C16 11.4033 15.446 12 14.762 12H14.3493C13.6653 12 13.1113 11.4033 13.1113 10.6667C13.1113 11.4033 12.5573 12 11.8733 12H11.4607C10.7767 12 10.2227 11.4033 10.2227 10.6667C10.2227 11.4033 9.66867 12 8.98467 12H8.572C7.888 12 7.334 11.4033 7.334 10.6667L8.15933 8.66667H15.1753L16 10.6667Z"
                            fill="#2B62DD"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_175_2547">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className="text-sm">Become a Seller</span>
                    </ButtonComponent>
                  )}

                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="m-0 p-0">
                        <Button
                          variant="link"
                          className="flex justify-start items-center gap-2 text-blueDark4F text-sm font-semibold leading-normal hover:no-underline cursor-pointer group"
                        >
                          <Image
                            src={avatar}
                            alt="profile"
                            width={200}
                            height={200}
                            className="w-[32px] h-[32px] object-contain"
                          />
                          {user ? user.firstName + " " + user.lastName : ""}{" "}
                          <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={handleLogOut}
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M5.93335 5.03991C6.14002 2.63991 7.37335 1.65991 10.0733 1.65991H10.16C13.14 1.65991 14.3334 2.85325 14.3334 5.83325V10.1799C14.3334 13.1599 13.14 14.3532 10.16 14.3532H10.0733C7.39335 14.3532 6.16002 13.3866 5.94002 11.0266"
                              stroke="#2B62DD"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10 8H2.41333"
                              stroke="#2B62DD"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3.90002 5.7666L1.66669 7.99994L3.90002 10.2333"
                              stroke="#2B62DD"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span className="text-sm">Logout</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>Tool 2</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <ButtonComponent
                      element="link"
                      variant="link"
                      href={ROUTES.LOGIN}
                      className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.78668 9.74659L9.49335 8.03992L7.78668 6.33325"
                          stroke="#2B62DD"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.66669 8.04004H9.44669"
                          stroke="#2B62DD"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 2.66675C10.9467 2.66675 13.3333 4.66675 13.3333 8.00008C13.3333 11.3334 10.9467 13.3334 8 13.3334"
                          stroke="#2B62DD"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span className="text-sm">Login</span>
                    </ButtonComponent>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Main Header */}
        <div className="bg-blueDark4F backdrop-blur-[160px]">
          <Container>
            <div className="flex items-center justify-between lg:justify-start gap-4">
              <div className="min-w-[150px] lg:min-w-[283px] flex border-r border-white/20 py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="m-0 p-0 pr-[17px]">
                    <Button
                      variant="ghost"
                      className="text-white w-full flex justify-between items-center ps-0 ms-0"
                    >
                      All Categories <ChevronDown className="ml-1 h-4 w-4 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Category 1</DropdownMenuItem>
                    <DropdownMenuItem>Category 2</DropdownMenuItem>
                    <DropdownMenuItem>Category 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="lg:hidden block">
                <button
                  className="flex flex-col gap-1"
                  onClick={() => setMenuToggler(true)}
                >
                  <span className="block w-[14px] h-[2px] bg-white"></span>
                  <span className="block w-[22px] h-[2px] bg-white"></span>
                  <span className="block w-[18px] h-[2px] bg-white"></span>
                </button>
              </div>
              <div
                className="hidden lg:flex items-center gap-10 py-3 overflow-x-auto whitespace-nowrap"
                style={{ scrollbarWidth: "none" }}
              >
                <Link
                  href="/"
                  className="text-white text-base leading-normal font-semibold"
                >
                  Main Page
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="m-0 p-0">
                    <Button
                      variant="ghost"
                      className="text-white w-auto h-auto text-base leading-normal font-semibold gap-2"
                    >
                      Buyer Tools <ChevronDown className="h-4 w-4 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Buyer Onboarding</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="m-0 p-0">
                    <Button
                      variant="ghost"
                      className="text-white w-auto h-auto text-base leading-normal font-semibold gap-2"
                    >
                      Seller Tools{" "}
                      <ChevronDown className="h-4 w-4 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Seller Onboarding</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href="/rfqs"
                  className="text-white text-base leading-normal font-semibold"
                >
                  RFQ&apos;s
                </Link>
                <Link
                  href="/messages"
                  className="text-white text-base leading-normal font-semibold"
                >
                  Messages
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div
        className={`fixed p-5 flex flex-col top-0 items-start gap-5 py-3 overflow-x-auto whitespace-nowrap z-50 bg-white max-w-[360px] min-h-screen w-full transition-all duration-300 ${menuToggler ? "right-0" : "-right-[375px]"}`}
      >
        <div className="flex w-full items-center justify-between gap-2 mb-5">
          <div className="text-base leading-normal font-semibold text-blueDark4F">
            {/* Category */}
          </div>
          <div>
            <button
              className="w-7 h-7 bg-blueDark4F rounded-md flex justify-center items-center -space-x-4"
              onClick={() => setMenuToggler(false)}
            >
              <span className="block w-4 rotate-45 h-[2px] bg-white origin-bottom"></span>
              <span className="block w-4 h-[2px] -rotate-45 bg-white origin-center"></span>
            </button>
          </div>
        </div>
        <Link href="/" className="">
          Main Page
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="m-0 p-0">
            <Button
              variant="ghost"
              className="text-black font-normal text-base w-auto h-auto"
            >
              Buyer Tools <ChevronDown className="ml-1 h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Tool 1</DropdownMenuItem>
            <DropdownMenuItem>Tool 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="m-0 p-0">
            <Button
              variant="ghost"
              className="text-black font-normal text-base w-auto h-auto"
            >
              Seller Tools <ChevronDown className="ml-1 h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Tool 1</DropdownMenuItem>
            <DropdownMenuItem>Tool 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/rfqs" className="">
          RFQ&apos;s
        </Link>
        <Link href="/messages" className="">
          Messages
        </Link>
      </div>
      {menuToggler && (
        <div
          className="fixed top-0 right-0 bg-black/70 w-full min-h-screen z-10"
          onClick={() => setMenuToggler(false)}
        ></div>
      )}
    </>
  );
}
