"use client";

import Link from "next/link";
import { format } from "date-fns";
import { debounce } from "lodash";
import { saveAs } from "file-saver";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/route.utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonComponent } from "../common/ButtonComponent";
import {
  UseAdminBuyerActions,
  UseExportAdminBuyerList,
  UseGetAdminBuyerList,
} from "@/services/query-components/admin-users.query-components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FilterDrawer from "../filters/FilterDrawer";

const InitialFilterValues = {
  status: "",
  startDate: "",
  endDate: "",
  markAsRedFlag: "",
};

export default function BuyerListing() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [buyerList, setBuyerList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterValues, setFilterValues] = useState<any>(InitialFilterValues);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  // Get Buyer List
  const successCallback = (data: any) => {
    if (data.onboardingInquiriesResponses)
      setBuyerList(data.onboardingInquiriesResponses);
    setTotalRecords(data.totalRecords);
  };
  const failureCallback = () => {};
  const { mutate: getAdminBuyerList, isPending } = UseGetAdminBuyerList(
    successCallback,
    failureCallback,
  );

  // Buyer Actions
  const successCallbackForAction = (data: any) => {
    getAdminBuyerList({
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
    });
  };
  const failureCallbackForAction = () => {};
  const { mutate: buyerActionMutate } = UseAdminBuyerActions(
    successCallbackForAction,
    failureCallbackForAction,
  );

  // Export Buyer List
  const successCallbackForExport = (data: any) => {
    if (data) {
      const blob = new Blob([data], { type: "text/csv" });
      saveAs(blob, `buyers-list-${new Date().getTime()}.csv`);
    }
  };
  const failureCallbackForExport = () => {};
  const { mutate: exportAdminBuyerList, isPending: exportPending } =
    UseExportAdminBuyerList(successCallbackForExport, failureCallbackForExport);

  // Debounced Search Logic
  const handleSearchTextChange = (e: any) => {
    let value = (e.target as HTMLInputElement).value
      .trim()
      .split(" ")
      .join("+");
    setSearchText(value);
    setPage(0);
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleSearchTextChange, 500);
  }, []);

  useEffect(() => {
    getAdminBuyerList({
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
      endDate:
        Number(filterValues.endDate) === 0
          ? undefined
          : Number(filterValues.endDate),
      startDate:
        Number(filterValues.startDate) === 0
          ? undefined
          : Number(filterValues.startDate),
      status: filterValues.status,
      markAsRedFlag: filterValues.markAsRedFlag,
    });

    return () => {
      debouncedResults.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAdminBuyerList, page, itemsPerPage, searchText, debouncedResults]);

  const handleResetFilters = () => {
    setFilterValues(InitialFilterValues);
    getAdminBuyerList({
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
    });
  };

  const handleApplyFilters = () => {
    setSearchText("");
    setPage(0);

    getAdminBuyerList({
      offSet: 0,
      size: itemsPerPage,
      searchKey: "",
      endDate:
        Number(filterValues.endDate) === 0
          ? undefined
          : Number(filterValues.endDate),
      startDate:
        Number(filterValues.startDate) === 0
          ? undefined
          : Number(filterValues.startDate),
      status: filterValues.status,
      markAsRedFlag: filterValues.markAsRedFlag,
    });
  };

  const handleExportData = () => {
    exportAdminBuyerList({
      export: true,
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
      endDate:
        Number(filterValues.endDate) === 0
          ? undefined
          : Number(filterValues.endDate),
      startDate:
        Number(filterValues.startDate) === 0
          ? undefined
          : Number(filterValues.startDate),
      status: filterValues.status,
      markAsRedFlag: filterValues.markAsRedFlag,
    });
  };

  const convertPascalCase = (str: string) =>
    str.charAt(0) + str.slice(1).toLowerCase();

  return (
    <div className="w-full">
      <div className="mb-6">
        {/* <div className="flex items-center justify-between mb-2">
            <h2 className="text-[#122D4F] text-[18px] font-semibold leading-[28.8px]">
              Lorem Ipsum
            </h2>
          </div> */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search by Buyer name, Company Name, Company registration number"
              className="pl-[36px] rounded-[8px] bg-white shadow-[0px_1.595px_0px_0px_rgba(10,10,10,0.04)] h-[40px]"
              onChange={debouncedResults}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="absolute left-2.5 top-2.5"
            >
              <path
                d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                stroke="#122D4F"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.1973 15.5166C14.5948 16.7166 15.5023 16.8366 16.1998 15.7866C16.8373 14.8266 16.4173 14.0391 15.2623 14.0391C14.4073 14.0316 13.9273 14.6991 14.1973 15.5166Z"
                stroke="#122D4F"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <ButtonComponent
              variant="primary"
              className="text-sm leading-normal font-semibold px-8"
              onClick={() => handleExportData()}
              disabled={exportPending}
            >
              Export
            </ButtonComponent>
            <FilterDrawer
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              type="BUYER"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table className="border-collapse">
          <TableHeader className=" bg-[#E2F0FF]">
            <TableRow className=" rounded-t-[8px]">
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Buyer Name
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Email
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Company Name
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Request Date
              </TableHead>
              <TableHead className="border-b text-center pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold">
                More
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={7} className="">
                  <p className="py-3 text-center text-sm leading-normal font-medium">
                    Loading
                  </p>
                </TableCell>
              </TableRow>
            ) : buyerList.length == 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="">
                  <p className="py-3 text-center text-sm leading-normal font-medium">
                    No buyers data is available
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              buyerList?.map((buyer: any) => (
                <TableRow key={buyer.id}>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4 relative">
                    <div className="flex items-center gap-2 ">
                      {buyer.markAsRedFlag && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="absolute top-[26px] left-[26px]"
                        >
                          <path
                            d="M12.6667 5.96699L6 3.08366V2.29199C6 1.95033 5.71667 1.66699 5.375 1.66699C5.03333 1.66699 4.75 1.95033 4.75 2.29199V17.7087C4.75 18.0503 5.03333 18.3337 5.375 18.3337C5.71667 18.3337 6 18.0503 6 17.7087V14.4087L12.85 11.0253C12.85 11.0253 12.85 11.0253 12.8583 11.0253C14.2417 10.3087 14.9833 9.38366 14.9417 8.40866C14.9 7.43366 14.0917 6.56699 12.6667 5.96699Z"
                            fill="#EE0004"
                          />
                        </svg>
                      )}
                      {/* <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={buyer?.avatar ? buyer?.avatar : ""}
                          alt={buyer?.firstName}
                        />
                        <AvatarFallback>
                          {buyer?.firstName[0].toUpperCase() +
                            buyer?.lastName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar> */}

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="truncate max-w-[150px] block cursor-default">
                              {buyer.firstName + " " + buyer.lastName}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="bg-white p-2 rounded-md text-sm max-w-[250px] shadow max-h-[150px] overflow-y-auto flex break-all border">
                              {buyer.firstName + " " + buyer.lastName}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {buyer.email}
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4 break-words max-w-[250px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="truncate max-w-[150px] block cursor-default">
                            {buyer.companyName}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="bg-white p-2 rounded-md text-sm max-w-[250px] shadow max-h-[150px] overflow-y-auto flex break-all border">
                            {buyer.companyName}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {format(buyer.createdDate, "PPPp")}
                  </TableCell>

                  <TableCell className="border-b pl-[54px] pe-[41px] py-[22px]">
                    <div className="flex justify-center">
                      <DropdownMenu
                        open={openDropdown === buyer.id}
                        onOpenChange={(open) =>
                          setOpenDropdown(open ? buyer.id : null)
                        }
                      >
                        <DropdownMenuTrigger asChild>
                          <div className="rounded-full w-[28px] h-[28px] flex justify-center items-center bg-[#0D6ACE] cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <path
                                d="M11.2138 5.1872C11.1596 5.13252 11.095 5.08913 11.024 5.05951C10.9529 5.0299 10.8766 5.01465 10.7996 5.01465C10.7226 5.01465 10.6464 5.0299 10.5753 5.05951C10.5042 5.08913 10.4397 5.13252 10.3854 5.1872L7.71378 7.85886C7.65955 7.91354 7.59504 7.95694 7.52395 7.98655C7.45287 8.01617 7.37662 8.03141 7.29962 8.03141C7.22261 8.03141 7.14636 8.01617 7.07528 7.98655C7.00419 7.95694 6.93968 7.91354 6.88545 7.85886L4.21378 5.1872C4.15955 5.13252 4.09504 5.08913 4.02395 5.05951C3.95287 5.0299 3.87662 5.01465 3.79962 5.01465C3.72261 5.01465 3.64636 5.0299 3.57528 5.05951C3.50419 5.08913 3.43968 5.13252 3.38545 5.1872C3.2768 5.29649 3.21582 5.44434 3.21582 5.59845C3.21582 5.75256 3.2768 5.9004 3.38545 6.0097L6.06295 8.6872C6.39107 9.01492 6.83586 9.19899 7.29962 9.19899C7.76337 9.19899 8.20816 9.01492 8.53628 8.6872L11.2138 6.0097C11.3224 5.9004 11.3834 5.75256 11.3834 5.59845C11.3834 5.44434 11.3224 5.29649 11.2138 5.1872Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[180px] p-5 border border-[#E0E4E8] flex flex-col gap-5"
                        >
                          <DropdownMenuItem
                            className="py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group"
                            onClick={() => setOpenDropdown(null)} // Close the DropdownMenu
                            asChild
                          >
                            <Link
                              className="flex justify-start items-center gap-2 !p-0 text-[14px] text-[#122D4FCC] "
                              href={ROUTES.VIEW_BUYER_DETAILS(buyer.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10.3867 7.99995C10.3867 9.31995 9.31999 10.3866 7.99999 10.3866C6.67999 10.3866 5.61333 9.31995 5.61333 7.99995C5.61333 6.67995 6.67999 5.61328 7.99999 5.61328C9.31999 5.61328 10.3867 6.67995 10.3867 7.99995Z"
                                  stroke="#122D4F"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="group-hover:stroke-blueCE"
                                />
                                <path
                                  d="M7.99999 13.5138C10.3533 13.5138 12.5467 12.1271 14.0733 9.72714C14.6733 8.78714 14.6733 7.20714 14.0733 6.26714C12.5467 3.86714 10.3533 2.48047 7.99999 2.48047C5.64665 2.48047 3.45332 3.86714 1.92665 6.26714C1.32665 7.20714 1.32665 8.78714 1.92665 9.72714C3.45332 12.1271 5.64665 13.5138 7.99999 13.5138Z"
                                  stroke="#122D4F"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="group-hover:stroke-blueCE"
                                />
                              </svg>
                              View
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group"
                            onClick={() => setOpenDropdown(null)} // Close the DropdownMenu
                            asChild
                          >
                            <ButtonComponent
                              className="w-full flex justify-start items-center gap-2 p-0 text-[14px] text-[#122D4FCC] hover:text-red-500 group"
                              onClick={() =>
                                buyerActionMutate({
                                  id: buyer.id,
                                  type: buyer.markAsRedFlag
                                    ? "unMarkAsRedFlag"
                                    : "markAsRedFlag",
                                })
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M3.43333 1.33301V14.6663"
                                  stroke="#122D4F"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="group-hover:stroke-red-500"
                                />
                                <path
                                  d="M3.43333 2.66699H10.9C12.7 2.66699 13.1 3.66699 11.8333 4.93366L11.0333 5.73366C10.5 6.26699 10.5 7.13366 11.0333 7.60033L11.8333 8.40033C13.1 9.66699 12.6333 10.667 10.9 10.667H3.43333"
                                  stroke="#122D4F"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="group-hover:stroke-red-500"
                                />
                              </svg>
                              {buyer.markAsRedFlag
                                ? "Unmark Red Flag"
                                : "Mark Red Flag"}
                            </ButtonComponent>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center -space-x-px h-full">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className="rounded-none border-blueDark4F/10 h-[42px] text-sm text-blueDark4F p-2 rounded-l-lg"
          >
            <ChevronRight className="h-5 w-5 text-sm rotate-180" />
          </Button>

          {/* Page Numbers */}
          {Array(totalPages)
            .fill(0)
            .map((p, idx) => {
              // Always show the first page
              if (idx === 0) {
                return (
                  <Button
                    key={idx}
                    variant={page === idx ? "primary" : "outline"}
                    onClick={() => setPage(idx)}
                    className={`rounded-none border-blueDark4F/10 h-[42px] text-sm ${
                      page === idx ? "text-white border" : "text-blueDark4F"
                    }`}
                  >
                    {idx + 1}
                  </Button>
                );
              }

              // Show ellipsis after the first page if the current page is near the end
              if (idx === 1 && page > totalPages - 3) {
                return (
                  <span
                    key="ellipsis-after-first"
                    className="px-2 text-blueDark4F py-2 px-4 border border-blueDark4F/10 h-[42px] flex justify-center items-center cursor-pointer"
                  >
                    ...
                  </span>
                );
              }

              // Always show the last page
              if (idx === totalPages - 1) {
                return (
                  <Button
                    key={idx}
                    variant={page === idx ? "primary" : "outline"}
                    onClick={() => setPage(idx)}
                    className={`rounded-none border-blueDark4F/10 h-[42px] text-sm ${
                      page === idx ? "text-white border" : "text-blueDark4F"
                    }`}
                  >
                    {idx + 1}
                  </Button>
                );
              }

              // Show ellipsis before the last page if the current page is not near the end
              if (idx === totalPages - 2 && page < totalPages - 3) {
                return (
                  <span
                    key="ellipsis-before-last"
                    className="text-blueDark4F py-2 px-4 border border-blueDark4F/10 h-[42px] flex justify-center items-center cursor-pointer"
                  >
                    ...
                  </span>
                );
              }

              // Show pages around the current page
              if (idx >= page - 1 && idx <= page + 1) {
                return (
                  <Button
                    key={idx}
                    variant={page === idx ? "primary" : "outline"}
                    onClick={() => setPage(idx)}
                    className={`rounded-none border-blueDark4F/10 h-[42px] text-sm ${
                      page === idx ? "text-white border" : "text-blueDark4F"
                    }`}
                  >
                    {idx + 1}
                  </Button>
                );
              }

              // Hide other pages
              return null;
            })}

          {/* Next Button */}
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-none border-blueDark4F/10 h-[42px] text-sm text-blueDark4F p-2 rounded-r-lg"
            disabled={page === totalPages - 1 || totalPages == 0}
          >
            <ChevronRight className="h-5 w-5 text-sm" />
          </Button>
        </div>

        <Select
          value={itemsPerPage.toString()}
          onValueChange={(val) => {
            setPage(0);
            setItemsPerPage(Number(val));
          }}
        >
          <SelectTrigger className="w-[180px] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block h-[42px] border-blueDark4F/10">
            <SelectValue placeholder="Items per page" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="7"
              viewBox="0 0 13 7"
              fill="none"
              className="w-4 h-4 arrow transition-transform duration-300 group-data-[state=open]:rotate-180"
            >
              <path
                opacity="0.6"
                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                fill="#122D4F"
              />
            </svg>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 items per page</SelectItem>
            <SelectItem value="10">10 items per page</SelectItem>
            <SelectItem value="15">15 items per page</SelectItem>
            <SelectItem value="20">20 items per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
