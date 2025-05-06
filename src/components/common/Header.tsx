"use client";

import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from "@/lib/useLocalStorage";
import { ROUTES } from "@/utils/route.utils";
import avatar from "../../../public/images/icons/avatar.png";
import { ROLES } from "@/constants/common.constants";
import { getPageTitle } from "@/utils/common.utils";
import { UserContext } from "@/utils/userContext";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import {
  UseBecomeBuyer,
  UseBecomeSeller,
} from "@/services/query-components/auth.query-components.services";

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

export function Header({ toggleSidebar, title }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const { data: currentUser, changeCurrentUser } = useContext(UserContext);

  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    let userData = getLocalStorage("user");
    setUser(userData);
  }, []);

  const handleLogOut = () => {
    deleteCookie("ACCESS_TOKEN");
    removeLocalStorage("user");
    removeLocalStorage("documentDetails");
    setTimeout(() => {
      window.location.replace(ROUTES.HOME);
    }, 100);
  };

  // For Become Seller
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

  // For Become Buyer
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

  const handleUserToggle = (value: string) => {
    // saveLocalStorage("user", { ...user, currentUser: value });
    changeCurrentUser(value);
    if (value === ROLES.BUYER) {
      router.replace(ROUTES.BUYER_DASHBOARD);
    } else if (value === ROLES.SELLER) router.replace(ROUTES.SELLER_DASHBOARD);
  };

  // const currentUser = user && user.currentUser;
  const isAdmin = user && user.userRoles.includes(ROLES.SUPER_ADMIN);
  const isBuyer = user && user.userRoles.includes(ROLES.BUYER);
  const isSeller = user && user.userRoles.includes(ROLES.SELLER);
  const showToggle =
    user &&
    !isAdmin &&
    isBuyer &&
    isSeller &&
    user.sellerBasicDetailsCompleted &&
    user.buyerBasicDetailsCompleted;

  return (
    <header className="bg-white border-b border-[#b6b6b6]/10 z-50 sticky top-0">
      <div className="">
        <div className="flex justify-between items-center sm:flex-row flex-col-reverse sm:gap-0 gap-5 pt-[10px] pb-[14px] px-5 ">
          <div className="flex items-center ">
            <button className="lg:hidden px-2" onClick={toggleSidebar}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="#000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <h1 className="text-[#333335] text-[18px] font-semibold leading-[27px]">
              {pageTitle ? pageTitle : "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center ">
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="relative w-5 h-5 p-0">
                  <Image
                    src={bell}
                    alt="bell"
                    width={200}
                    height={200}
                    className="w-5 h-5 object-contain"
                  />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center ps-1 h-3 pe-[3.67px] pt-[1px] pb-[1.78px] text-[10px] font-semibold leading-[10px] text-white transform translate-x-1/2 -translate-y-1/2 bg-[#23B7E5] rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      You have {notificationCount} unread messages.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <p className="text-sm">New order received</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <p className="text-sm">Your listing was approved</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <p className="text-sm">Price update for Iron Ore</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" className="w-5 h-5 p-0">
              <Image
                src={message}
                alt="message"
                width={200}
                height={200}
                className="w-5 h-5 object-contain"
              />
            </Button>
            <Button variant="ghost" className="w-5 h-5 p-0">
              <Image
                src={gear}
                alt="gear"
                width={200}
                height={200}
                className="w-5 h-5 object-contain"
              />
            </Button> */}
            {showToggle && (
              <ToggleSwitch
                options={[
                  { label: "Buyer", value: ROLES.BUYER },
                  { label: "Seller", value: ROLES.SELLER },
                ]}
                value={currentUser}
                onValueChange={handleUserToggle}
              />
            )}
            {isBuyer &&
              !user.sellerBasicDetailsCompleted &&
              user.buyerBasicDetailsCompleted &&
              pathname !== ROUTES.SELLER_ONBOARDING && (
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
              )}
            {isSeller &&
              !user.buyerBasicDetailsCompleted &&
              user.sellerBasicDetailsCompleted &&
              pathname !== ROUTES.BUYER_ONBOARDING && (
                <ButtonComponent
                  element="button"
                  variant="link"
                  className="flex items-center gap-2 text-blueDark4F text-[16px] font-semibold leading-normal hover:no-underline cursor-pointer"
                  onClick={() => becomeBuyerMutate(user.id)}
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
              )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative rounded-full flex gap-[7px] ms-8 items-center w-max justify-end cursor-pointer">
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={200}
                    height={200}
                    className="h-[36px] w-[36px] object-contain"
                  />
                  <label className="text-[#536485] text-[14px] font-semibold leading-[13.6px] cursor-pointer">
                    {user ? user.firstName + " " + user.lastName : ""}
                  </label>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user ? user.firstName + " " + user.lastName : ""}
                    </p>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {" "}
                          <p className="text-xs leading-none text-muted-foreground truncate max-w-[150px] block text-left">
                            {user ? user.email : ""}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="bg-white p-2 rounded-md text-sm max-w-[250px] shadow max-h-[150px] overflow-y-auto flex break-all border">
                            {user ? user.email : ""}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
