"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ButtonComponent } from "../common/ButtonComponent";
import { useState } from "react";

interface FilterValues {
  status:
    | ""
    | "ALL"
    | "DRAFT"
    | "PUBLISHED"
    | "INCOMPLETE"
    | "PENDING"
    | "APPROVED"
    | "REJECTED";
  startDate: string;
  endDate: string;
  markAsRedFlag?: string;
  isAdmin?: boolean;
  active?: string;
}

const FilterDrawer = ({
  filterValues,
  setFilterValues,
  type,
  onApply,
  onReset,
  isAdmin,
}: {
  filterValues: FilterValues;
  setFilterValues: (filterValues: FilterValues) => void;
  type: "BUYER" | "SELLER" | "PRODUCT";
  onApply: () => void;
  onReset: () => void;
  isAdmin?: boolean;
}) => {
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>({
    startDate: false,
    endDate: false,
  });
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const renderDateInput = (label: string, key: "startDate" | "endDate") => (
    <div className="space-y-2">
      <label className="text-[#122D4F] text-[14px] font-medium">{label}</label>
      <Popover
        open={popoverOpen[key]}
        onOpenChange={(open) => {
          setPopoverOpen((prev) => ({ ...prev, [key]: open }));
          setOpenSelect(null); // Close any open Select when DatePicker is opened
        }}
      >
        <PopoverTrigger asChild>
          <Button className="lg:h-[52px] h-12 text-sm rounded-md border bg-[#FBFBFB] text-[#122D4F] px-3 py-2 w-full shadow-none">
            <span>
              {filterValues[key]
                ? new Date(Number(filterValues[key])).toLocaleDateString()
                : "Select Date"}
            </span>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={
              filterValues[key]
                ? new Date(Number(filterValues[key]))
                : undefined
            }
            onSelect={(date) => {
              if (!date) {
                setFilterValues({ ...filterValues, [key]: "" });
                return;
              }

              const adjustedDate = new Date(date);
              if (key === "startDate") {
                adjustedDate.setHours(0, 0, 0, 0);
              } else if (key === "endDate") {
                adjustedDate.setHours(23, 59, 59, 999);
              }

              const value = adjustedDate.getTime().toString();
              setFilterValues({ ...filterValues, [key]: value });
              setPopoverOpen((prev) => ({ ...prev, [key]: false }));
            }}
            disabled={(date: Date) => {
              if (date < new Date("1900-01-01")) return true;
              if (date > new Date()) return true;

              if (key === "startDate" && filterValues.endDate) {
                return date > new Date(Number(filterValues.endDate));
              }

              if (key === "endDate" && filterValues.startDate) {
                return date < new Date(Number(filterValues.startDate));
              }

              return false;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  const renderSelect = (
    label: string,
    key: keyof FilterValues,
    options: { label: string; value: string }[],
  ) => (
    <div className="space-y-2">
      <label className="text-[#122D4F] text-[14px] font-semibold leading-normal">
        {label}
      </label>
      <Select
        value={typeof filterValues?.[key] === "string" ? filterValues[key] : ""}
        onValueChange={(value: "ALL" | "true" | "false") => {
          setFilterValues({
            ...filterValues,
            [key]: value === "ALL" ? "" : value,
          });
        }}
        onOpenChange={(open: boolean) => {
          if (open) {
            setOpenSelect(key as string);
          } else {
            setOpenSelect(null);
          }
        }}
        open={openSelect === key}
      >
        <SelectTrigger className="h-[52px] bg-[#FBFBFB] [&_span]:text-blueDark4F/80 [&_span]:font-medium group [&_svg]:hidden [&_svg.arrow]:block ">
          <SelectValue placeholder="Select" />
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
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <ButtonComponent
          variant="primary"
          className="text-sm leading-normal font-semibold px-8"
        >
          Filter
        </ButtonComponent>
      </SheetTrigger>
      <SheetContent
        onEscapeKeyDown={(event) => {
          if (openSelect || Object.values(popoverOpen).some((open) => open)) {
            // Prevent closing the sheet if a child component is open
            event.preventDefault();
          }
        }}
      >
        <SheetHeader className="mb-5">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="p-5 border border-[#122D4F0F] rounded-[8px] bg-white shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-5">
            {renderDateInput("Start Date", "startDate")}
            {renderDateInput("End Date", "endDate")}

            {/* Product Listing Filters */}
            {type === "PRODUCT" &&
              (isAdmin
                ? renderSelect("Status", "active", [
                    { label: "All", value: "ALL" },
                    { label: "Active", value: "true" },
                    { label: "Deactive", value: "false" },
                  ])
                : renderSelect("Status", "status", [
                    { label: "All", value: "ALL" },
                    { label: "Draft", value: "DRAFT" },
                    { label: "Published", value: "PUBLISHED" },
                  ]))}

            {/* Seller Filters */}
            {type === "SELLER" && (
              <>
                {renderSelect("Status", "status", [
                  { label: "All", value: "ALL" },
                  { label: "Incomplete", value: "INCOMPLETE" },
                  { label: "Approved", value: "APPROVED" },
                  { label: "Pending", value: "PENDING" },
                  { label: "Rejected", value: "REJECTED" },
                ])}
              </>
            )}

            {/* Buyer & Seller Filters */}
            {(type === "BUYER" || type === "SELLER") && (
              <>
                {renderSelect("Marked as Red Flag", "markAsRedFlag", [
                  { label: "All", value: "ALL" },
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ])}
              </>
            )}
            <SheetClose asChild>
              <div className="flex gap-2 items-center justify-center">
                <ButtonComponent
                  variant="primary"
                  element="button-big"
                  type="button"
                  className="w-full"
                  onClick={onApply}
                >
                  Apply Filters
                </ButtonComponent>
                <ButtonComponent
                  variant="outline"
                  element="button-big"
                  type="button"
                  className="w-full"
                  onClick={onReset}
                >
                  reset
                </ButtonComponent>
              </div>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
