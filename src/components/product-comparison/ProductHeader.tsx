import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import Container from "../common/Container";
import { logoBlack, search } from "../../../public/images";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ButtonComponent } from "../common/ButtonComponent";

function ProductHeader() {
  return (
    <>
      <header className="bg-white border-b py-3 sticky top-0 z-10">
        <Container>
          <div className="flex items-center xl:flex-row flex-col gap-4 justify-between">
            <div className="flex items-center lg:flex-row flex-col gap-4 xl:gap-6 2xl:gap-12 flex-1 w-full lg:w-auto">
              <div className="flex min-w-[110px] xl:min-w-[170px] min-h-5">
                <Image
                  src={logoBlack}
                  alt="Mineramax Logo"
                  width={170}
                  height={20}
                  className="w-full h-full object-contain mix-blend-luminosity"
                />
              </div>

              <div className="flex items-center shadow-[0_1px_0_0_rgba(10, 10, 10, 0.02)] border border-[#F4F4F4] rounded-[8px] max-w-[480px] w-full">
                <Select>
                  <SelectTrigger className="min-w-[60px] max-w-[60px] w-full bg-transparent rounded-none border-0 border-r border-[#F4F4F4] focus:outline-0 focus:ring-0 [&_.select-icon]:hidden [&_span]:text-blueDark4F/80 [&_span]:font-medium">
                    <SelectValue
                      placeholder="All"
                      className="placeholder:text-[#536485] placeholder:text-sm placeholder:font-medium placeholder:leading-[14px] text-sm leading-[14px] text-[#536485] font-medium"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                    >
                      <path
                        d="M11.84 1L7.37808 5.68503C6.85114 6.23832 5.98886 6.23832 5.46192 5.68503L1 1"
                        fill="#536485"
                      />
                      <path
                        d="M11.84 1L7.37808 5.68503C6.85114 6.23832 5.98886 6.23832 5.46192 5.68503L1 1"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </SelectTrigger>
                  <SelectContent className="p-0">
                    <SelectGroup>
                      <SelectLabel className="text-[#536485] text-sm leading-[14px] font-medium cursor-pointer transition-all duration-500 ">
                        All
                      </SelectLabel>
                      <SelectItem
                        value="apple"
                        className="text-[#536485] text-sm leading-[14px] font-medium cursor-pointer transition-all duration-500 "
                      >
                        All One
                      </SelectItem>
                      <SelectItem
                        value="banana"
                        className="text-[#536485] text-sm leading-[14px] font-medium cursor-pointer transition-all duration-500 "
                      >
                        All Two
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="relative w-full max-w-[calc(100%-60px)]">
                  <Input
                    type="text"
                    placeholder="Search your own items"
                    className="w-full placeholder:text-[#536485] placeholder:text-sm placeholder:font-medium placeholder:leading-[14px] text-sm leading-[14px] font-medium text-[#536485] rounded-none border-0 pl-[17px] pr-12 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:outline-0"
                  />
                  <button className="absolute border-0 bg-transparent w-auto h-auto min-w-[15px] top-1/2 right-4 -translate-y-1/2 leading-[0]">
                    <Image src={search} alt="search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-5">
              <div className="flex items-center justify-center sm:justify-end xl:space-x-6 space-x-3 sm:gap-y-0 gap-y-1 flex-1 sm:flex-nowrap flex-wrap">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#536485] md:text-base text-sm font-semibold md:leading-normal"
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
                        fill="#536485"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2542">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Chat</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#536485] md:text-base text-sm font-semibold leading-normal"
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
                        fill="#536485"
                      />
                      <path
                        d="M8.47801 3.37522C8.09356 3.30518 7.69842 3.32048 7.32054 3.42005C6.94266 3.51962 6.59128 3.70102 6.29127 3.95142C5.99126 4.20183 5.74995 4.5151 5.58442 4.86909C5.41888 5.22307 5.33317 5.60911 5.33334 5.99989C5.33334 6.1767 5.40358 6.34627 5.52861 6.47129C5.65363 6.59632 5.8232 6.66656 6.00001 6.66656C6.17682 6.66656 6.34639 6.59632 6.47141 6.47129C6.59644 6.34627 6.66668 6.1767 6.66668 5.99989C6.66651 5.80374 6.70962 5.60997 6.79294 5.43239C6.87626 5.25482 6.99773 5.09781 7.14869 4.97257C7.29965 4.84733 7.47639 4.75695 7.66629 4.70785C7.8562 4.65876 8.0546 4.65217 8.24734 4.68856C8.5107 4.73968 8.75285 4.86815 8.94284 5.05755C9.13284 5.24695 9.26206 5.48869 9.31401 5.75189C9.36648 6.02816 9.33025 6.31394 9.21051 6.56838C9.09078 6.82282 8.89366 7.03289 8.64734 7.16856C8.23946 7.40487 7.9024 7.74623 7.67129 8.15709C7.44019 8.56795 7.32348 9.03326 7.33334 9.50456V9.99989C7.33334 10.1767 7.40358 10.3463 7.52861 10.4713C7.65363 10.5963 7.8232 10.6666 8.00001 10.6666C8.17682 10.6666 8.34639 10.5963 8.47142 10.4713C8.59644 10.3463 8.66668 10.1767 8.66668 9.99989V9.50456C8.65831 9.27256 8.71121 9.04246 8.82006 8.83742C8.9289 8.63237 9.08984 8.45962 9.28668 8.33656C9.76969 8.07127 10.1586 7.66286 10.4001 7.16749C10.6415 6.67212 10.7235 6.11413 10.6349 5.57024C10.5462 5.02635 10.2912 4.52328 9.90501 4.13022C9.51878 3.73715 9.02026 3.4734 8.47801 3.37522Z"
                        fill="#536485"
                      />
                      <path
                        d="M8.66683 11.9997C8.66683 11.6315 8.36835 11.333 8.00016 11.333C7.63197 11.333 7.3335 11.6315 7.3335 11.9997C7.3335 12.3679 7.63197 12.6663 8.00016 12.6663C8.36835 12.6663 8.66683 12.3679 8.66683 11.9997Z"
                        fill="#536485"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2536">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Help</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#536485] md:text-base text-sm font-semibold leading-normal"
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
                        fill="#536485"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2547">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Become a Seller</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#536485] md:text-base text-sm font-semibold leading-normal"
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
                        fill="#536485"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_175_2547">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Become a Buyer</span>
                </Link>
              </div>
              <ButtonComponent
                variant="primary"
                className="rounded shadow-custom bg-[#6C5DD3] w-[123px] max-w-full py-[6px]"
              >
                Login
              </ButtonComponent>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

export default ProductHeader;
