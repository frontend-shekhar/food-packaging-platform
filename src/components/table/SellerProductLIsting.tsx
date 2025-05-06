"use client";

import { format } from "date-fns";
import { debounce } from "lodash";
import { saveAs } from "file-saver";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import CheckboxComponent from "@/components/common/CheckboxComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { ROLES } from "@/constants/common.constants";
import { getLocalStorage } from "@/lib/useLocalStorage";
import { cn } from "@/lib/utils";
import {
  UseActiveOrInactiveProduct,
  UseExportAdminProductList,
  UseGetAdminProductList,
} from "@/services/query-components/admin-products.query-components";
import {
  UseActivateProduct,
  UseDeleteProduct,
  UseDuplicateProduct,
  UseGetProductId,
  UseGetSellerProductList,
  UseProductAction,
} from "@/services/query-components/seller-product.query-components.services";
import { ButtonComponent } from "../common/ButtonComponent";
import { Product } from "../product-comparison/ProductInfo";

import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import FilterDrawer from "../filters/FilterDrawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const certificateFormSchema = yup.object({
  certificates: yup.array(yup.string().required()).default([]),
  analysisDate: yup.number().optional(),
  certificateCountry: yup.string().optional(),
});

export function SellerProductLIsting() {
  const form = useFormContext<yup.InferType<typeof certificateFormSchema>>();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState<string>("");
  const [productList, setProductList] = useState<any>([]);
  const [filterValues, setFilterValues] = useState<any>({
    active: "",
    status: "",
    startDate: null,
    endDate: null,
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [succOpen, setSuccOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const [userData, setUserData] = useState<any>(() => getLocalStorage("user"));
  const isAdmin = userData && userData.userRoles.includes(ROLES.SUPER_ADMIN);

  // Get Product List
  const successCallback = (data: any) => {
    if (data.productResponses || data.productInquiryResponses)
      setProductList(data.productResponses || data.productInquiryResponses);
    setTotalRecords(data.totalRecords);
  };
  const failureCallback = () => {};

  // Role wise GET Product List
  const { mutate: getSellerProductList, isPending: isSellerPending } =
    UseGetSellerProductList(successCallback, failureCallback);
  const { mutate: getAdminProductList, isPending: isAdminPending } =
    UseGetAdminProductList(successCallback, failureCallback);

  const getProductList = isAdmin ? getAdminProductList : getSellerProductList;

  // Generate Product ID
  const successCallbackForId = (data: any) => {
    if (data) router.push(`seller-add-product?productId=${data}`);
  };
  const failureCallbackForId = () => {};
  const { mutate: getProductIdMutate } = UseGetProductId(
    successCallbackForId,
    failureCallbackForId,
  );

  // Delete Product
  const successCallbackForDelete = (data: any) => {
    let products = productList.map((product: any) => {
      if (product.id == data) product.active = false;
      return product;
    });
    setProductList(products);
  };
  const failureCallbackForDelete = () => {};
  const { mutate: deleteProductMutate, isPending: deleteProductIsPending } =
    UseDeleteProduct(successCallbackForDelete, failureCallbackForDelete);

  // Activate Product
  const successCallbackForActivate = (data: any) => {
    let products = productList.map((product: any) => {
      if (product.id == data) product.active = true;
      return product;
    });
    setProductList(products);
  };
  const failureCallbackForActivate = () => {};
  const { mutate: activateProductMutate } = UseActivateProduct(
    successCallbackForActivate,
    failureCallbackForActivate,
  );

  // Publish Product
  const successCallbackForPublish = (data: any) => {
    getProductList({
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
      ...filterValues,
    });
  };
  const failureCallbackForPublish = (statusCode: string) => {};
  const { mutate: productActionMutate, isPending: isPublishing } =
    UseProductAction(successCallbackForPublish, failureCallbackForPublish);

  // Active/Inactive Product
  const successCallbackForActiveInactive = (id: string) => {
    setProductId(null);
    setProductList((prevItems: Product[]) =>
      prevItems?.map((item: Product) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };
  const failureCallbackForActiveInactive = () => {
    setProductId(null);
  };
  const {
    mutate: activeOrInactiveProduct,
    isPending: activeOrInactiveProductisPending,
  } = UseActiveOrInactiveProduct(
    successCallbackForActiveInactive,
    failureCallbackForActiveInactive,
  );

  // Duplicate Product
  const successCallbackForDuplicate = (data: any) => {
    setProductList((prev: any) => [data, ...prev]);
  };
  const failureCallbackForDuplicate = () => {};
  const { mutate: duplicateProductMutate } = UseDuplicateProduct(
    successCallbackForDuplicate,
    failureCallbackForDuplicate,
  );

  // Export Buyer List
  const successCallbackForExport = (data: any) => {
    if (data) {
      const blob = new Blob([data], { type: "text/csv" });
      saveAs(blob, `product-list-${new Date().getTime()}.csv`);
    }
  };
  const failureCallbackForExport = () => {};
  const { mutate: exportAdminProductList, isPending: exportPending } =
    UseExportAdminProductList(
      successCallbackForExport,
      failureCallbackForExport,
    );

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

  const isPending = isAdmin
    ? isAdminPending || activeOrInactiveProductisPending
    : isSellerPending || deleteProductIsPending;

  useEffect(() => {
    getProductList({
      offSet: page,
      size: itemsPerPage,
      searchKey: searchText,
      ...filterValues,
    });

    return () => {
      debouncedResults.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductList, page, itemsPerPage, searchText, debouncedResults]);

  const handleExportData = () => {
    exportAdminProductList({
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
      active: filterValues.active ? filterValues.active : "",
    });
  };

  const convertPascalCase = (str: string) => {
    switch (str) {
      case "DRAFT":
        return "Drafted";
      case "PUBLISHED":
        return "Published";
      case "INCOMPLETE":
        return "Incomplete";
      default:
        return "";
    }
  };

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
              placeholder="Search by product name , product id"
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
            {/* <Popover>
              <PopoverTrigger>
                {" "}
                <ButtonComponent
                  variant="primary"
                  className="text-sm leading-normal font-semibold px-8"
                >
                  Filter
                </ButtonComponent>
              </PopoverTrigger>
              <PopoverContent style={{ width: "200px", padding: "20px" }}>
                {" "}
                <div className="flex flex-col gap-5">
                  <CheckboxComponent
                    className="text-[#122D4F] lg:text-sm font-semibold"
                    id="register"
                    labelClassName="text-[#080808] "
                    label="Product Category"
                  ></CheckboxComponent>
                  <CheckboxComponent
                    className="text-[#122D4F] lg:text-sm font-semibold"
                    id="register"
                    labelClassName="text-[#080808] "
                    label="Verification"
                  ></CheckboxComponent>
                  <CheckboxComponent
                    className="text-[#122D4F] lg:text-sm font-semibold"
                    id="register"
                    labelClassName="text-[#080808] "
                    label="Product ID"
                  ></CheckboxComponent>
                  <ButtonComponent
                    variant="outlineHover"
                    element="button-big"
                    type="submit"
                    className="w-full"
                  >
                    Apply Filters
                  </ButtonComponent>
                </div>
              </PopoverContent>
            </Popover> */}
            {!isAdmin ? (
              <ButtonComponent
                variant="secondary"
                className="text-sm leading-normal font-semibold px-8"
                onClick={() => getProductIdMutate()}
              >
                Add Product
              </ButtonComponent>
            ) : (
              <ButtonComponent
                variant="primary"
                className="text-sm leading-normal font-semibold px-8"
                onClick={() => handleExportData()}
                disabled={exportPending}
              >
                Export
              </ButtonComponent>
            )}

            <FilterDrawer
              isAdmin={isAdmin}
              onApply={() =>
                getProductList({
                  offSet: page,
                  size: itemsPerPage,
                  searchKey: searchText,
                  ...filterValues,
                })
              }
              onReset={() => {
                setFilterValues({ status: "", startDate: null, endDate: null });
                getProductList({
                  offSet: page,
                  size: itemsPerPage,
                  searchKey: searchText,
                });
              }}
              type="PRODUCT"
              key={"ddd"}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table className="border-collapse">
          <TableHeader className=" bg-[#E2F0FF]">
            <TableRow className=" rounded-t-[8px]">
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Product Name
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Product ID
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Product Category
              </TableHead>
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Date Created
              </TableHead>
              {isAdmin && (
                <>
                  <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                    Seller Name
                  </TableHead>
                  <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                    Seller Email
                  </TableHead>
                </>
              )}

              {!isAdmin && (
                <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                  Verification
                </TableHead>
              )}
              <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Status
              </TableHead>
              {/* <TableHead className="border-b border-r pl-[54px] pe-[41px] py-3 text-sm leading-normal font-semibold text-nowrap">
                Action
              </TableHead> */}
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
            ) : productList.length == 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="">
                  <p className="py-3 text-center text-sm leading-normal font-medium">
                    No Products Available
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              productList?.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4 ">
                    <div className="flex items-center gap-2 ">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={product.productImages[0]}
                          alt={product.name}
                        />
                        <AvatarFallback className="bg-blueCE text-white">
                          JJ
                        </AvatarFallback>
                      </Avatar>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <span className="truncate max-w-[150px] block cursor-default">
                              {" "}
                              {product.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="bg-white p-2 rounded-md text-sm max-w-[250px] shadow max-h-[150px] overflow-y-auto flex break-all border">
                              {product.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {product.productId}
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {product.category}
                  </TableCell>
                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {format(product.createdDate, "P")}
                  </TableCell>
                  {isAdmin && (
                    <>
                      <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                        {`${product.firstName} ${product.lastName}`}
                      </TableCell>
                      <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                        {product.email}
                      </TableCell>
                    </>
                  )}

                  {!isAdmin && (
                    <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                      <div
                        className={cn(
                          "rounded-[4px] flex justify-center items-center w-[80px] py-[6px] px-[18px] text-[12px]",
                          product.status === "INCOMPLETE" &&
                            "bg-[#EE00041A] text-[#EE0004CC]",
                          product.status === "DRAFT" &&
                            "bg-[#FFF6D6] text-[#806400]",
                          product.status === "PUBLISHED" &&
                            "bg-[#29AC6233] text-[#005525]",
                        )}
                      >
                        {convertPascalCase(product.status)}
                      </div>
                    </TableCell>
                  )}

                  <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {product.status === "PUBLISHED" ? (
                      <div
                        className={cn(
                          "rounded-[4px] flex justify-center items-center w-[80px] py-[6px] px-[18px] text-[12px]",
                          product.active === true &&
                            "bg-[#29AC6233] text-[#005525]",

                          product.active === false &&
                            "bg-[#EE00041A] text-[#EE0004CC]",
                        )}
                      >
                        {product.active === true ? "Active" : "Deactive"}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-[80px] py-[6px] px-[18px] text-[12px]">
                        -
                      </div>
                    )}
                    {/* unverified color box */}
                    {/* <div className="rounded-[4px] bg-[rgba(238,0,4,0.10)] flex justify-center items-center w-[80px] py-[6px] px-[18px] text-[#EE0004cc]">
                  {product.verification}
                  </div> */}
                  </TableCell>
                  {/* <TableCell className="border-b border-r pl-[54px] pe-[41px] py-[22px] text-nowrap text-sm leading-4">
                    {product.action}
                  </TableCell> */}

                  <TableCell className="border-b pl-[54px] pe-[41px] py-[22px]">
                    <div className="flex justify-center">
                      <DropdownMenu
                        open={openDropdown === product.id}
                        onOpenChange={(open) =>
                          setOpenDropdown(open ? product.id : null)
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
                          {!isAdmin && (
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-transparent hover:text-blueCE group p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                duplicateProductMutate({ id: product.id });
                                setOpenDropdown(null); // Close the DropdownMenu
                              }}
                            >
                              <label className="flex justify-start items-center gap-2 !p-0 text-[14px] text-[#122D4FCC] cursor-pointer hover:bg-transparent hover:text-blueCE">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M14.6668 7.40001V4.60001C14.6668 2.26668 13.7335 1.33334 11.4002 1.33334H8.60016C6.26683 1.33334 5.3335 2.26668 5.3335 4.60001V5.33334H7.40016C9.7335 5.33334 10.6668 6.26668 10.6668 8.60001V10.6667H11.4002C13.7335 10.6667 14.6668 9.73334 14.6668 7.40001Z"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                  <path
                                    d="M10.6668 11.4V8.60001C10.6668 6.26668 9.7335 5.33334 7.40016 5.33334H4.60016C2.26683 5.33334 1.3335 6.26668 1.3335 8.60001V11.4C1.3335 13.7333 2.26683 14.6667 4.60016 14.6667H7.40016C9.7335 14.6667 10.6668 13.7333 10.6668 11.4Z"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                  <path
                                    d="M4.05322 9.99998L5.35322 11.3L7.94656 8.69998"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                </svg>
                                Duplicate
                              </label>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-transparent hover:text-blueCE group"
                            onClick={(e) => {
                              setOpenDropdown(null); // Close the DropdownMenu
                            }}
                            asChild
                          >
                            <Link
                              href={`seller-add-product?id=${product.id}`}
                              className="flex justify-start items-center gap-2 !p-0 text-[14px] text-[#122D4FCC] "
                            >
                              {isAdmin ? (
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
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M10.6668 1.33334H5.3335C2.66683 1.33334 1.3335 2.66668 1.3335 5.33334V14C1.3335 14.3667 1.6335 14.6667 2.00016 14.6667H10.6668C13.3335 14.6667 14.6668 13.3333 14.6668 10.6667V5.33334C14.6668 2.66668 13.3335 1.33334 10.6668 1.33334Z"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                  <path
                                    d="M8.60685 5.22668L5.14685 8.68668C5.01352 8.82001 4.88686 9.08001 4.86019 9.26668L4.67353 10.5867C4.60686 11.0667 4.94019 11.4 5.42019 11.3333L6.74018 11.1467C6.92684 11.12 7.18686 10.9933 7.32019 10.86L10.7802 7.40001C11.3735 6.80668 11.6602 6.11334 10.7802 5.23334C9.90019 4.34668 9.20685 4.62668 8.60685 5.22668Z"
                                    stroke="white"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                  <path
                                    d="M8.11328 5.72C8.40661 6.76667 9.22661 7.59333 10.2799 7.88667"
                                    stroke="white"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                  />
                                </svg>
                              )}

                              {isAdmin ? "View" : "Edit"}
                            </Link>
                          </DropdownMenuItem>

                          {isAdmin ? (
                            <>
                              {product.active ? (
                                <DropdownMenuItem
                                  className={`py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group text-red-600`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenDropdown(null); // Close the DropdownMenu
                                    setProductId(product.id);
                                    setSuccOpen(true);
                                  }}
                                  asChild
                                >
                                  <ButtonComponent className="w-full flex justify-start items-center gap-2 p-0 text-[14px] text-[#122D4FCC] hover:text-blueCE group">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M6.12012 12.0267V13.6533C6.12012 14.7733 6.72678 15 7.46678 14.16L12.5135 8.42667C13.1335 7.72667 12.8734 7.14667 11.9334 7.14667H11.3134"
                                        stroke="white"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                      <path
                                        d="M9.88016 5.89335V2.34668C9.88016 1.22668 9.2735 1.00001 8.5335 1.84001L3.48683 7.57335C2.86683 8.27335 3.12683 8.85335 4.06683 8.85335H6.12683V9.64001"
                                        stroke="white"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                      <path
                                        d="M14.6668 1.33334L1.3335 14.6667"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                    </svg>
                                    Deactivate
                                  </ButtonComponent>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  className={`py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group text-green-600`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenDropdown(null); // Close the DropdownMenu
                                    activeOrInactiveProduct({
                                      id: product.id,
                                      type: "active",
                                    });
                                  }}
                                  asChild
                                >
                                  <ButtonComponent className="w-full flex justify-start items-center gap-2 p-0 text-[14px] text-[#122D4FCC] hover:text-blueCE group">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M4.06023 8.85335H6.12023V13.6533C6.12023 14.7733 6.7269 15 7.4669 14.16L12.5136 8.42668C13.1336 7.72668 12.8736 7.14668 11.9336 7.14668H9.87356V2.34668C9.87356 1.22668 9.2669 1.00001 8.5269 1.84001L3.48023 7.57335C2.8669 8.28001 3.1269 8.85335 4.06023 8.85335Z"
                                        stroke="white"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                    </svg>
                                    Activate
                                  </ButtonComponent>
                                </DropdownMenuItem>
                              )}
                            </>
                          ) : product.status !== "PUBLISHED" ? (
                            <>
                              {product.completed && (
                                <DropdownMenuItem
                                  className="py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenDropdown(null); // Close the DropdownMenu
                                    productActionMutate({
                                      id: product.id,
                                      type: "PUBLISHED",
                                    });
                                  }}
                                  asChild
                                >
                                  <ButtonComponent className="w-full flex justify-start items-center gap-2 p-0 text-[14px] text-[#122D4FCC] hover:text-blueCE group">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M6.34018 2.82003L12.0468 5.67336C14.6068 6.95336 14.6068 9.0467 12.0468 10.3267L6.34018 13.18C2.50018 15.1 0.933509 13.5267 2.85351 9.69336L3.43351 8.54003C3.58018 8.2467 3.58018 7.76003 3.43351 7.4667L2.85351 6.3067C0.933509 2.47336 2.50684 0.900029 6.34018 2.82003Z"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                      <path
                                        d="M3.62646 8H7.22647"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                      />
                                    </svg>
                                    Publish
                                  </ButtonComponent>
                                </DropdownMenuItem>
                              )}
                            </>
                          ) : (
                            <DropdownMenuItem
                              className={`py-2 cursor-pointer hover:bg-transparent hover:text-blueCE group ${product.active ? "text-red-600" : "text-green-600"} `}
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenDropdown(null); // Close the DropdownMenu
                                if (product.active) {
                                  // Deactivate
                                  deleteProductMutate({ id: product.id });
                                } else {
                                  // Activate
                                  activateProductMutate({ id: product.id });
                                }
                              }}
                              asChild
                            >
                              <ButtonComponent className="w-full flex justify-start items-center gap-2 p-0 text-[14px] text-[#122D4FCC] hover:text-blueCE group">
                                {product.active ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M6.12012 12.0267V13.6533C6.12012 14.7733 6.72678 15 7.46678 14.16L12.5135 8.42667C13.1335 7.72667 12.8734 7.14667 11.9334 7.14667H11.3134"
                                      stroke="white"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                    />
                                    <path
                                      d="M9.88016 5.89335V2.34668C9.88016 1.22668 9.2735 1.00001 8.5335 1.84001L3.48683 7.57335C2.86683 8.27335 3.12683 8.85335 4.06683 8.85335H6.12683V9.64001"
                                      stroke="white"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                    />
                                    <path
                                      d="M14.6668 1.33334L1.3335 14.6667"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-blueCE stroke-[#122D4F]"
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
                                      d="M4.06023 8.85335H6.12023V13.6533C6.12023 14.7733 6.7269 15 7.4669 14.16L12.5136 8.42668C13.1336 7.72668 12.8736 7.14668 11.9336 7.14668H9.87356V2.34668C9.87356 1.22668 9.2669 1.00001 8.5269 1.84001L3.48023 7.57335C2.8669 8.28001 3.1269 8.85335 4.06023 8.85335Z"
                                      stroke="white"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-blueCE stroke-[#122D4F]"
                                    />
                                  </svg>
                                )}
                                {product.active ? "Deactivate" : "Activate"}
                              </ButtonComponent>
                            </DropdownMenuItem>
                          )}
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

              // Show ellipsis before the last page if there are hidden pages
              if (idx === totalPages - 2 && page < totalPages - 3) {
                return (
                  <span
                    key="ellipsis"
                    className="text-blueDark4F py-2 px-4 border border-blueDark4F/10 h-[42px] flex justify-center items-center cursor-pointer"
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
            setItemsPerPage(Number(val));
            setPage(0);
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

      <Dialog open={succOpen} onOpenChange={(value) => setSuccOpen(value)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px] my-5">
                This product will also get deactivated on seller side. Are you
                sure about deactivating this product?
              </p>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <ButtonComponent
                variant="secondary"
                onClick={() => {
                  if (productId) {
                    activeOrInactiveProduct({
                      id: productId,
                      type: "inActive",
                    });
                  }
                }}
                className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-red-600 text-white hover:bg-red-400 hover:font-semibold hover:transition-none leading-[16px]"
              >
                Deactivate
              </ButtonComponent>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
