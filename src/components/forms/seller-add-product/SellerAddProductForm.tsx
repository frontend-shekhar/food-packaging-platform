"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { defineStepper } from "@stepperize/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import ProductInfoForm, { productInfoSchema } from "./ProductInfoForm";

import CertificationForm, { certificateFormSchema } from "./CertificationForm";
import InternForm, { internInfoFormSchema } from "./InternForm";
import OtherInfoForm, { otherInfoFormSchema } from "./OtherInfoForm";
import PricingForm, { pricingFormSchema } from "./PricingForm";
import WarehouseLocationForm, {
  finalWareHouseLocSchema,
} from "./WarehouseLocationForm";
import LocationForm, { finalproductLocationSchema } from "./LocationForm";
import {
  UseGetSellerProductInfo,
  UseSaveProductCertificates,
  UseSaveProductFinalInfo,
  UseSaveProductInternInfo,
  UseSaveProductOtherInfo,
  UseSaveProductPricingInfo,
  UseSaveSellerProductInfo,
} from "@/services/query-components/seller-product.query-components.services";
import { ROUTES } from "@/utils/route.utils";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { ROLES } from "@/constants/common.constants";
import { getLocalStorage } from "@/lib/useLocalStorage";
import {
  UseGetAdminProductInfo,
  UseGetAdminProductList,
} from "@/services/query-components/admin-products.query-components";
import Link from "next/link";
import Loader from "@/components/common/Loader";

const { useStepper, utils } = defineStepper(
  {
    id: "product-info",
    title: "Product Information",
    subtitle: "Lorem Ipsum is simply",
    schema: productInfoSchema,
  },
  {
    id: "certification",
    title: "Certification",
    subtitle: "Lorem Ipsum is simply",
    schema: certificateFormSchema,
  },
  {
    id: "location",
    title: "Location",
    subtitle: "Lorem Ipsum is simply",
    schema: finalproductLocationSchema,
  },
  {
    id: "warehouse-location",
    title: "Warehouse Location",
    subtitle: "Lorem Ipsum is simply",
    schema: finalWareHouseLocSchema,
  },
  {
    id: "pricing",
    title: "Pricing",
    subtitle: "Lorem Ipsum is simply",
    schema: pricingFormSchema,
  },
  {
    id: "others",
    title: "Others",
    subtitle: "Lorem Ipsum is simply",
    schema: otherInfoFormSchema,
  },
  {
    id: "intern",
    title: "Intern",
    subtitle: "Lorem Ipsum is simply",
    schema: yup.object({}),
  },
);

export default function SellerAddProductForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const productId = searchParams.get("productId");

  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  const [userData, setUserData] = useState<any>(() => getLocalStorage("user"));
  const [stepCompleted, setStepCompleted] = useState<Record<string, boolean>>(
    stepper.all.reduce((acc: Record<string, boolean>, step) => {
      acc[step.id] = false;
      return acc;
    }, {}),
  );

  const isSeller = userData && userData.userRoles.includes(ROLES.SELLER);

  const form = useForm<yup.InferType<typeof stepper.current.schema>>({
    mode: "onChange",
    resolver: yupResolver(stepper.current.schema),
    // disabled: !isSeller,
    defaultValues: {
      productId,
    },
  });

  // ? Get Product Info Role wise
  const successCallbackForGet = (data: any) => {
    const {
      productImages,
      certificates,
      productLocations,
      productWareHouseLocations,
      productPricingDetails,
      productOtherDetails,
      productInternDetails,
      ...rest
    } = data;
    form.reset({
      productImages,
      productLocations,
      productWareHouseLocations,
      ...productPricingDetails,
      ...certificates,
      ...productOtherDetails,
      ...productInternDetails,
      ...rest,
    });

    if (productImages && productImages.length > 0)
      setStepCompleted((prev) => ({ ...prev, "product-info": true }));
    if (certificates)
      setStepCompleted((prev) => ({ ...prev, certification: true }));
    if (productLocations && productLocations.length > 0)
      setStepCompleted((prev) => ({ ...prev, location: true }));
    if (productWareHouseLocations && productWareHouseLocations.length > 0)
      setStepCompleted((prev) => ({ ...prev, "warehouse-location": true }));
    if (productPricingDetails)
      setStepCompleted((prev) => ({ ...prev, pricing: true }));
    if (productOtherDetails)
      setStepCompleted((prev) => ({ ...prev, others: true }));
    if (productInternDetails)
      setStepCompleted((prev) => ({ ...prev, intern: true }));
  };
  const failureCallbackForGet = () => {};
  const { mutate: getSellerProductList, isPending: isSellerPending } =
    UseGetSellerProductInfo(successCallbackForGet, failureCallbackForGet);
  const { mutate: getAdminProductList, isPending: isAdminPending } =
    UseGetAdminProductInfo(successCallbackForGet, failureCallbackForGet);

  const getProductInfoMutate = isSeller
    ? getSellerProductList
    : getAdminProductList;
  const isPending = isSeller ? isSellerPending : isAdminPending;

  const successCallback = (data: any) => {
    setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
    if (stepper.current.id === "product-info") {
      if (data.id) router.replace(`${pathname}?id=${data.id}`);
    } else if (stepper.current.id === "intern" && id) {
      saveProductFinalInfoMutate({ id });
      return;
    }
    stepper.next();
  };
  const failureCallback = () => {};

  const { mutate: saveSellerProductInfoMutate } = UseSaveSellerProductInfo(
    successCallback,
    failureCallback,
  );
  const { mutate: saveProductCertificateInfoMutate } =
    UseSaveProductCertificates(successCallback, failureCallback);
  const { mutate: saveProductPricingMutate } = UseSaveProductPricingInfo(
    successCallback,
    failureCallback,
  );
  const { mutate: saveProductOtherInfoMutate } = UseSaveProductOtherInfo(
    successCallback,
    failureCallback,
  );
  const { mutate: saveProductInternInfoMutate } = UseSaveProductInternInfo(
    successCallback,
    failureCallback,
  );

  const successCallbackForFinal = (data: any) => {
    if (isSeller) {
      showSuccessToastMessage("Product Saved in Draft State Successfully.");
      router.push(ROUTES.SELLER_PRODUCT_LISTING);
    } else {
      showSuccessToastMessage("Product Saved Successfully.");
      router.push(ROUTES.ADMIN_PRODUCT_LISTING);
    }
  };
  const failureCallbackForFinal = () => {};
  const { mutate: saveProductFinalInfoMutate } = UseSaveProductFinalInfo(
    successCallbackForFinal,
    failureCallbackForFinal,
  );

  const onSubmit = (values: yup.InferType<typeof stepper.current.schema>) => {
    if (stepper.current.id === "product-info") {
      const {
        id,
        productId,
        category,
        granularity,
        mn,
        moisture,
        moisture1,
        moisture2,
        moisture3,
        name,
        country,
        productImages,
        impurities,
        phosphrous,
      } = values as yup.InferType<typeof productInfoSchema>;

      saveSellerProductInfoMutate({
        id,
        productId,
        category,
        granularity,
        mn,
        moisture,
        moisture1,
        moisture2,
        moisture3,
        name,
        country,
        productImages,
        impurities,
        phosphrous,
      });
    } else if (stepper.current.id === "certification" && id) {
      const { certificates, analysisDate, certificateCountry } =
        values as yup.InferType<typeof certificateFormSchema>;
      saveProductCertificateInfoMutate({
        data: { analysisDate, certificates, certificateCountry },
        id,
      });
    } else if (stepper.current.id === "location" && id) {
      setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
      stepper.next();
    } else if (stepper.current.id === "warehouse-location" && id) {
      const productWareHouseLocations = form.getValues(
        "productWareHouseLocations",
      );

      if (productWareHouseLocations && productWareHouseLocations.length > 0) {
        setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
        stepper.next();
      } else {
        showErrorToastMessage("Minimum 1 Warehouse Location is required.");
      }
    } else if (stepper.current.id === "pricing" && id) {
      const {
        cifPrice,
        currency,
        fobPrice,
        minOrderQuantity,
        paymentType,
        priceValidity,
        pricingStructure,
        sampleAvailibility,
        smallOrder,
      } = values as yup.InferType<typeof pricingFormSchema>;
      saveProductPricingMutate({
        data: {
          cifPrice,
          currency,
          fobPrice,
          minOrderQuantity,
          paymentType,
          priceValidity,
          pricingStructure,
          sampleAvailibility,
          smallOrder,
        },
        id,
      });
    } else if (stepper.current.id === "others" && id) {
      const {
        additionalDesc,
        customerContactSupport,
        impactStatements,
        returnPolicy,
        tradeExperiance,
        email,
        mobile,
      } = values as yup.InferType<typeof otherInfoFormSchema>;
      saveProductOtherInfoMutate({
        data: {
          additionalDesc,
          customerContactSupport,
          impactStatements,
          returnPolicy,
          tradeExperiance,
          email,
          mobile,
        },
        id,
      });
    } else if (stepper.current.id === "intern" && id) {
      const { verifiedInSite, verifiedOnline, verifiedOnlineAndSite } =
        values as yup.InferType<typeof internInfoFormSchema>;
      saveProductInternInfoMutate({
        data: { verifiedInSite, verifiedOnline, verifiedOnlineAndSite },
        id,
      });
    }
  };

  useEffect(() => {
    if (id) getProductInfoMutate(id);
  }, [getProductInfoMutate, id]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <div className="w-full p-5">
          {/* Progress Steps */}
          <div className="bg-white rounded-lg shadow-[0_0_13px_5px_rgba(0,0,0,0.02)] mb-6 sticky top-[60px] z-10">
            <Link
              href={
                isSeller
                  ? ROUTES.SELLER_PRODUCT_LISTING
                  : ROUTES.ADMIN_PRODUCT_LISTING
              }
              className="flex gap-[6px] items-center justify-start p-4 cursor-pointer w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M4.785 2.96484L1.75 5.99984L4.785 9.03484"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.25 6H1.83496"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <label className="text-[#122D4F] text-base font-medium leading-relaxed cursor-pointer">
                Back to list
              </label>
            </Link>
            <div className="flex justify-between overflow-x-auto w-full">
              {stepper.all.map((step, index, array) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center justify-center pt-[14px] pb-[13px] pl-5 pe-[25px] border border-b-[5px] border-t-0 border-l-0 border-r-0 min-w-[224px] cursor-pointer",
                    index == currentIndex && "border-[#2B62DD]",
                  )}
                  onClick={async () => {
                    // Handle backward steps
                    if (index < currentIndex) {
                      stepper.goTo(step.id);
                      return;
                    }

                    // Handle forward steps
                    if (index > currentIndex) {
                      const valid = await form.trigger();
                      if (valid) stepper.goTo(step.id);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "w-8 h-8 bg-transparent rounded-full flex items-center justify-center border text-[10px] font-normal leading-normal",
                      index == currentIndex
                        ? "bg-[#2B62DD] text-white"
                        : stepCompleted[step.id]
                          ? "bg-[#2B62DD] text-white"
                          : "text-[#122D4F] border-[#122D4F]",
                    )}
                  >
                    0{index + 1}
                  </div>
                  <div className="ml-2">
                    <p
                      className={cn(
                        "text-[14px] font-semibold leading-[20px]",
                        index == currentIndex
                          ? "text-[#2B62DD]"
                          : stepCompleted[step.id]
                            ? "text-[#2B62DD]"
                            : "text-gray-600",
                      )}
                    >
                      {step.title}
                    </p>
                    {/* <p
                      className={cn(
                        "text-[12px] font-normal leading-[20px]",
                        index < currentIndex && "text-[#122D4F]",
                        index == currentIndex && "text-[#122D4F]",
                        index > currentIndex && "text-gray-500",
                      )}
                    >
                      Lorem Ipsum is simply
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note: Replace isSeller={isSeller} if want to disable forms for admin **/}
          {stepper.switch({
            "product-info": () => <ProductInfoForm isSeller={true} />,
            certification: () => <CertificationForm isSeller={true} />,
            location: () => <LocationForm isSeller={true} />,
            "warehouse-location": () => (
              <WarehouseLocationForm isSeller={true} />
            ),
            pricing: () => <PricingForm isSeller={true} />,
            others: () => <OtherInfoForm isSeller={true} />,
            intern: () => <InternForm isSeller={isSeller} />,
          })}
        </div>
      </form>
    </Form>
  );
}
