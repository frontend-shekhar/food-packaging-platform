"use client";

import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { defineStepper } from "@stepperize/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import arrow from "../../../../public/images/arrow.svg";
import logo from "../../../../public/images/logo/logo-login.svg";
import {
  CheckIcon,
  DocumentsIcon,
  GeneralInfoIcon,
  MapPinIcon,
} from "@/components/common/Icons";
import DocumentsForm, {
  CertificatesFormData,
  certificatesSchema,
  finalDocumentsSchema,
  finalDocumentsSchemaType,
  ProductInformationFormData,
  productInformationSchema,
  ReachInformationFormData,
  reachInformationSchema,
} from "@/components/forms/seller-onboarding/DocumentsForm";
import GeneralInformationForm, {
  companyInformationEditFormData,
  companyInformationEditSchema,
  companyInformationFormData,
  companyInformationSchema,
  companyVerificationFormSchema,
  companyVerificationSchemaType,
  contactDetailsFromFormData,
  contactDetailsFromSchema,
} from "@/components/forms/seller-onboarding/GeneralInformationForm";
import LocationForm, {
  deliveryLocationsData,
  deliveryLocationsSchem,
  StorageLocationSchem,
  StorageLocationSchemsData,
} from "@/components/forms/seller-onboarding/LocationForm";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  UseGetSellerOnboarding,
  UseGetSellerOnboardingForAdmin,
  UseSaveSellerCertificatehDetailsSecond,
  UseSaveSellerContactInfo,
  UsesellerOnboardingFinalSave,
} from "@/services/query-components/seller-onborading.query-components.services";
import { ROUTES } from "@/utils/route.utils";
import { envelop } from "../../../../public/images";
import { Header } from "@/components/common/Header";
import Link from "next/link";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import { UseAdminSellerActions } from "@/services/query-components/admin-users.query-components";
import Loader from "@/components/common/Loader";
import { showErrorToastMessage } from "@/utils/toast.utils";

const { useStepper, utils } = defineStepper(
  {
    id: "general-info",
    title: "General Information",
    icon: GeneralInfoIcon,
    completedIcon: CheckIcon,
    schema: yup.object({}),
  },
  {
    id: "documents",
    title: "Documents & Certificates",
    icon: DocumentsIcon,
    completedIcon: CheckIcon,
    schema: yup.object({}),
  },
  {
    id: "location",
    title: "Location",
    icon: MapPinIcon,
    completedIcon: CheckIcon,
    schema: yup.object({}),
  },
);

const SellerOnboarding = ({
  detailId,
  isReadOnly,
  isEditing,
}: {
  detailId?: string;
  isReadOnly: boolean;
  isEditing: boolean;
}) => {
  const router = useRouter();
  const stepper = useStepper();
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenForEdit, setIsDialogOpenForEdit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sellerStatus, setSellerStatus] = useState(null);
  const [userData, setUserData] = useState<any>({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formCompletion, setFormCompletion] = useState({
    generalInfo: false,
    documents: false,
    location: false,
  });
  const [stepCompleted, setStepCompleted] = useState<Record<string, boolean>>(
    stepper.all.reduce((acc: Record<string, boolean>, step) => {
      acc[step.id] = false;
      return acc;
    }, {}),
  );

  const currentIndex = utils.getIndex(stepper.current.id);

  const companyInfoForm = useForm<companyInformationFormData>({
    mode: "onChange",
    resolver: yupResolver(companyInformationSchema),
  });
  const companyInfoEditForm = useForm<companyInformationEditFormData>({
    mode: "onChange",
    resolver: yupResolver(companyInformationEditSchema),
  });
  const contactDetailsForm = useForm<contactDetailsFromFormData>({
    mode: "onChange",
    resolver: yupResolver(contactDetailsFromSchema),
  });
  const ProductInformationForm = useForm<ProductInformationFormData>({
    mode: "onChange",
    resolver: yupResolver(productInformationSchema),
  });
  const companyVerificationForm = useForm<companyVerificationSchemaType>({
    mode: "onChange",
    resolver: yupResolver(companyVerificationFormSchema),
  });
  // const ReachInformationForm = useForm<ReachInformationFormData>({
  //   mode: "onChange",
  //   resolver: yupResolver(reachInformationSchema),
  // });
  const CertificatesFormOne = useForm<CertificatesFormData>({
    mode: "onChange",
    resolver: yupResolver(certificatesSchema),
  });
  const finalDocumentsForm = useForm<finalDocumentsSchemaType>({
    mode: "onChange",
    resolver: yupResolver(finalDocumentsSchema),
  });
  const deliveryLocationsForm = useForm<deliveryLocationsData>({
    mode: "onChange",
    resolver: yupResolver(deliveryLocationsSchem),
  });
  const storageLocationsForm = useForm<StorageLocationSchemsData>({
    mode: "onChange",
    resolver: yupResolver(StorageLocationSchem),
  });
  const form = useForm<yup.InferType<typeof stepper.current.schema>>({
    mode: "onChange",
    disabled: isReadOnly,
    resolver: yupResolver(stepper.current.schema),
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const updateFormCompletion = useCallback(
    (formType: keyof typeof formCompletion, isComplete: boolean) => {
      setFormCompletion((prev) => ({
        ...prev,
        [formType]: isComplete,
      }));
    },
    [],
  );

  const handleStepChange = async (
    index: number,
    currentIndex: number,
    step: (typeof stepper.all)[number],
  ) => {
    // Handle backward steps
    if (index < currentIndex) {
      stepper.goTo(step.id);
      return;
    }

    // Handle forward steps
    if (index > currentIndex) {
      if (stepper.current.id === "general-info") {
        const valid1 = isEditing
          ? await companyInfoEditForm.trigger()
          : await companyInfoForm.trigger();
        const valid2 = await companyVerificationForm.trigger();
        const valid3 = await contactDetailsForm.trigger();

        if (valid3 && valid1 && valid2) {
          if (!completedSections["companyInfo"]) {
            showErrorToastMessage("Please save Company Infomation");
            return;
          }
          if (!completedSections["verificationDocs"]) {
            showErrorToastMessage("Please save Company Verification Documents");
            return;
          }
          if (!completedSections["contactDetails"]) {
            showErrorToastMessage("Please save Contact Details");
            return;
          }
          stepper.goTo(step.id);
        }
      } else if (stepper.current.id === "documents") {
        const valid1 = await ProductInformationForm.trigger();
        const valid2 = await CertificatesFormOne.trigger();
        const valid3 = await finalDocumentsForm.trigger();

        if (valid3 && valid1 && valid2) {
          if (!completedSections["productInfo"]) {
            showErrorToastMessage("Please save Your Products");
            return;
          }
          if (!completedSections["certificates"]) {
            showErrorToastMessage("Please save Certificates");
            return;
          }
          if (!completedSections["otherCertificates"]) {
            showErrorToastMessage("Please save Other Certificates");
            return;
          }

          stepper.goTo(step.id);
        }
      }
    }
  };

  const [completedSections, setCompletedSections] = useState({
    companyInfo: false,
    verificationDocs: false,
    contactDetails: false,
    productInfo: false,
    // reach: false,
    certificates: false,
    otherCertificates: false,
    delivery: false,
    storage: false,
  });

  const handleSectionComplete = (section: string, value: boolean) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: value,
    }));
    if (section == "companyInfo" && !isEditing)
      setIsDialogOpen((prev) => !prev);
  };

  const populateData = (data: any) => {
    setSellerStatus(data.status);
    if (data.status === "APPROVED") setIsDialogOpenForEdit(true);
    const {
      generalInformation,
      contactDetails,
      deliveryLocations,
      storageLocations,
      productDetails,
      companyCertificates,
      reachDetails,
      documentDetails,
      companyVerificationDocuments,
      userResponse,
      ...rest
    } = data;

    form.reset({
      ...generalInformation,
      ...contactDetails,
      ...deliveryLocations,
      ...storageLocations,
      ...productDetails,
      ...companyCertificates,
      // ...reachDetails,
      documentDetails,
      ...companyVerificationDocuments,
      ...rest,
    });
    if (generalInformation) {
      companyInfoForm.reset({
        ...generalInformation,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        mobile: userResponse.mobile,
      });
      companyInfoEditForm.reset({
        ...generalInformation,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        mobile: userResponse.mobile,
      });
    }
    if (contactDetails) {
      contactDetailsForm.reset({
        ...contactDetails,
      });
    }
    if (companyVerificationDocuments) {
      companyVerificationForm.reset({
        companyVerificationDocuments: [...companyVerificationDocuments],
      });
    }
    if (deliveryLocations && deliveryLocations.length > 0) {
      deliveryLocationsForm.reset({ ...deliveryLocations });
    }
    if (storageLocations && storageLocations.length > 0) {
      storageLocationsForm.reset({ ...storageLocations });
    }
    if (productDetails) {
      ProductInformationForm.reset({ ...productDetails });
    }
    // if (reachDetails) {
    //   ReachInformationForm.reset({ ...reachDetails });
    // }
    if (companyCertificates) {
      CertificatesFormOne.reset({ ...companyCertificates });
    }
    if (companyCertificates) {
      CertificatesFormOne.reset({ ...companyCertificates });
    }
    if (documentDetails) {
      saveLocalStorage("documentDetails", documentDetails);
    }

    setCompletedSections({
      certificates: !!companyCertificates,
      companyInfo: generalInformation && generalInformation.taxId,
      contactDetails: !!contactDetails,
      delivery: deliveryLocations && deliveryLocations.length > 0,
      otherCertificates: documentDetails && documentDetails.length > 0,
      productInfo: !!productDetails,
      // reach: !!reachDetails,
      storage: storageLocations && storageLocations.length > 0,
      verificationDocs:
        companyVerificationDocuments && companyVerificationDocuments.length > 0,
    });

    if (contactDetails)
      setStepCompleted((prev) => ({ ...prev, "general-info": true }));
    if (companyCertificates)
      setStepCompleted((prev) => ({ ...prev, documents: true }));
    if (storageLocations.length > 0)
      setStepCompleted((prev) => ({ ...prev, location: true }));
  };

  const successCallbackForGet = (data: any) => {
    if (data.id) router.replace(`${pathname}?id=${data.id}`);
    populateData(data);
  };

  const failureCallbackForGet = () => {};
  const { mutate: getSellerInfoMutate, isPending } = UseGetSellerOnboarding(
    successCallbackForGet,
    failureCallbackForGet,
  );

  const successCallbackForAction = (data: any) => {
    getSellerInfoForAdminMutate(detailId!);
  };
  const failureCallbackForAction = () => {};
  const { mutate: sellerActionMutate } = UseAdminSellerActions(
    successCallbackForAction,
    failureCallbackForAction,
  );

  const successCallbackForAdminGet = (data: any) => {
    populateData(data);
  };
  const failureCallbackForAdminGet = () => {};
  const { mutate: getSellerInfoForAdminMutate, isPending: isPendingAdmin } =
    UseGetSellerOnboardingForAdmin(
      successCallbackForAdminGet,
      failureCallbackForAdminGet,
    );

  const successCallback = (data: any) => {
    setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
    if (stepper.current.id === "location") {
      if (sellerStatus !== "APPROVED") setIsDialogOpen((prev) => !prev);
    }
  };
  const failureCallback = () => {};

  const { mutate: saveFinalSaveMutate } = UsesellerOnboardingFinalSave(
    successCallback,
    failureCallback,
  );

  const onSubmit = async () => {
    if (id) {
      if (stepper.current.id === "general-info") {
        const valid1 = isEditing
          ? await companyInfoEditForm.trigger()
          : await companyInfoForm.trigger();
        const valid2 = await companyVerificationForm.trigger();
        const valid3 = await contactDetailsForm.trigger();

        if (valid3 && valid1 && valid2) {
          if (!completedSections["companyInfo"]) {
            showErrorToastMessage("Please save Company Infomation");
            return;
          }
          if (!completedSections["verificationDocs"]) {
            showErrorToastMessage("Please save Company Verification Documents");
            return;
          }
          if (!completedSections["contactDetails"]) {
            showErrorToastMessage("Please save Contact Details");
            return;
          }

          setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
          stepper.next();
        }
      } else if (stepper.current.id === "documents") {
        const valid1 = await ProductInformationForm.trigger();
        const valid2 = await CertificatesFormOne.trigger();
        const valid3 = await finalDocumentsForm.trigger();

        if (valid3 && valid1 && valid2) {
          if (!completedSections["productInfo"]) {
            showErrorToastMessage("Please save Your Products");
            return;
          }
          if (!completedSections["certificates"]) {
            showErrorToastMessage("Please save Certificates");
            return;
          }
          if (!completedSections["otherCertificates"]) {
            showErrorToastMessage("Please save Other Certificates");
            return;
          }

          setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
          stepper.next();
        }
      } else if (stepper.current.id === "location") {
        const delivaryData = deliveryLocationsForm.getValues();
        const storageData = storageLocationsForm.getValues();
        const validDeliveryInfo = Object.keys(delivaryData).length > 0;
        const validStorageInfo = Object.keys(storageData).length > 0;

        if (!completedSections["delivery"]) {
          showErrorToastMessage("Please save Delivery Locations");
          return;
        }
        if (!completedSections["storage"]) {
          showErrorToastMessage("Please save Storage Location");
          return;
        }

        if (validDeliveryInfo && validStorageInfo) {
          saveFinalSaveMutate(id);
        }
      }
    }
  };

  useEffect(() => {
    const userDataLocal: any = getLocalStorage("user");
    companyInfoForm.setValue("firstName", userDataLocal.firstName);
    companyInfoForm.setValue("lastName", userDataLocal.lastName);
    companyInfoForm.setValue("mobile", userDataLocal.mobile);
    companyInfoForm.setValue("email", userDataLocal.email);
    setUserData(userDataLocal);

    if (isReadOnly && detailId) {
      getSellerInfoForAdminMutate(detailId);
    } else {
      getSellerInfoMutate(userDataLocal.id);
    }
  }, [
    isReadOnly,
    detailId,
    getSellerInfoForAdminMutate,
    getSellerInfoMutate,
    form,
    companyInfoForm,
  ]);

  const convertPascalCase = (str: string) =>
    str.charAt(0) + str.slice(1).toLowerCase();

  const handleSellerAction = (type: "APPROVED" | "REJECTED") => {
    sellerActionMutate({ id: detailId!, type });
  };

  return (
    <>
      {isEditing && isReadOnly && (
        <div
          className={cn(
            "rounded-lg flex justify-center items-center p-4  text-base font-semibold w-full mb-5",
            sellerStatus === "REJECTED" && "bg-[#EE00041A] text-[#EE0004CC]",
            sellerStatus === "PENDING" && "bg-[#FFF6D6] text-[#806400]",
            sellerStatus === "APPROVED" && "bg-[#3EA56B] text-white",
            sellerStatus === "INCOMPLETE" && "bg-[#FF4D011A] text-[#FF4D01]",
          )}
        >
          {convertPascalCase(sellerStatus ?? "")}
        </div>
      )}

      <Form {...form}>
        <form
          className="bg-white min-h-screen lg:block flex"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {!isEditing && (
            <aside
              className={`${isSidebarOpen ? "show" : ""} z-[99] w-[253px] bg-[#F6F9FF] h-full text-white fixed top-0 bottom-0 `}
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
              <nav className="p-4 overflow-y-auto max-h-screen  pb-[100px]">
                <div className="flex flex-col  text-black">
                  <div className="flex flex-col">
                    {stepper.all.map((step, index, array) => {
                      if (step.id === "general-info") {
                        return (
                          <div
                            className="flex items-center justify-center flex-col"
                            key={step.id}
                          >
                            <Card
                              className={cn(
                                "relative flex flex-col gap-2 border border-transparent hover:border-[#e5e7eb] p-4 shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] transition-colors bg-white w-full group cursor-pointer",
                              )}
                              onClick={async () =>
                                handleStepChange(index, currentIndex, step)
                              }
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center rounded-full  w-[26.6px] h-[26.6px]",
                                  index == currentIndex
                                    ? "bg-[#EAEAEA]"
                                    : stepCompleted[step.id]
                                      ? "bg-[#0D6ACE] completed-icon-color"
                                      : "bg-[#EAEAEA]",
                                )}
                              >
                                {index == currentIndex ? (
                                  <step.icon
                                    className={"text-muted-foreground"}
                                  />
                                ) : stepCompleted[step.id] ? (
                                  <step.completedIcon
                                    className={"text-white"}
                                  />
                                ) : (
                                  <step.icon
                                    className={"text-muted-foreground"}
                                  />
                                )}
                              </div>
                              <div className="text-[#76828D] text-[12px]  font-semibold leading-[12px] tracking-[0.48px]">
                                Step {index + 1}
                              </div>
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{step.title}</h3>
                              </div>
                              <div
                                className={cn(
                                  " text-[12px] font-medium leading-[12px] mt-2 p-[10px] bg-[#eaeaea] rounded-[4px] w-fit",
                                  index == currentIndex
                                    ? "text-[#080808]"
                                    : stepCompleted[step.id]
                                      ? "text-white bg-[#0D6ACE]"
                                      : "text-[#080808]",
                                )}
                              >
                                {index == currentIndex
                                  ? "In-Progress"
                                  : stepCompleted[step.id]
                                    ? "Completed"
                                    : "Pending"}
                              </div>
                            </Card>
                            {index !== stepper.all.length - 1 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="19"
                                viewBox="0 0 6 19"
                                fill="none"
                                className=""
                              >
                                <path
                                  d="M3.5 5L5.88675 1.26184e-07L0.113249 -1.26184e-07L2.5 5L3.5 5ZM2.5 14L0.113248 19L5.88675 19L3.5 14L2.5 14ZM2.5 4.5L2.5 14.5L3.5 14.5L3.5 4.5L2.5 4.5Z"
                                  fill="white"
                                />
                              </svg>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </nav>
            </aside>
          )}

          <main
            className={cn(
              "bg-white flex flex-col min-h-screen w-full",
              isEditing ? "" : " lg:ml-[253px] lg:w-[calc(100%-253px)]",
            )}
          >
            {isEditing ? (
              <>
                {isReadOnly && (
                  <>
                    <div className="flex justify-between items-center p-5 pb-0">
                      <Link
                        href={ROUTES.SELLER_LISTING}
                        className="flex gap-[6px] items-center justify-start  cursor-pointer w-fit"
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
                      <div className="flex justify-end items-center gap-5">
                        {sellerStatus === "PENDING" ? (
                          <>
                            <Dialog>
                              <DialogTrigger asChild>
                                <ButtonComponent className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-green-500 text-white">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="group-hover:stroke-green-500 "
                                  >
                                    <path
                                      d="M8.00016 14.6667C11.6668 14.6667 14.6668 11.6667 14.6668 8.00001C14.6668 4.33334 11.6668 1.33334 8.00016 1.33334C4.3335 1.33334 1.3335 4.33334 1.3335 8.00001C1.3335 11.6667 4.3335 14.6667 8.00016 14.6667Z"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-green-500 stroke-white"
                                    />
                                    <path
                                      d="M7 10L10.7733 6"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-green-500 stroke-white"
                                    />
                                    <path
                                      d="M7 10L5 8"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-green-500 stroke-white"
                                    />
                                  </svg>
                                  Approve
                                </ButtonComponent>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Confirm Action</DialogTitle>
                                  <DialogDescription>
                                    <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px] my-5">
                                      Are you sure you want to approve this
                                      seller?
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                  <DialogClose asChild>
                                    <ButtonComponent
                                      variant="secondary"
                                      onClick={() =>
                                        handleSellerAction("APPROVED")
                                      }
                                      className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-green-500 text-white hover:bg-green-400 hover:font-semibold hover:transition-none leading-[16px]"
                                    >
                                      Approve
                                    </ButtonComponent>
                                  </DialogClose>
                                  {/* <ButtonComponent
                                    variant="secondary"
                                    className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] "
                                  >
                                    No
                                  </ButtonComponent> */}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <ButtonComponent className="rounded-[4px] flex justify-start gap-2 items-center w-max py-[6px] px-[18px] text-[12px] bg-[#EE00041A] text-[#EE0004CC]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M8.00016 14.6667C11.6668 14.6667 14.6668 11.6667 14.6668 8.00001C14.6668 4.33334 11.6668 1.33334 8.00016 1.33334C4.3335 1.33334 1.3335 4.33334 1.3335 8.00001C1.3335 11.6667 4.3335 14.6667 8.00016 14.6667Z"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-red-500 stroke-red-500"
                                    />
                                    <path
                                      d="M6.11328 9.88668L9.88661 6.11334"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-red-500 stroke-red-500"
                                    />
                                    <path
                                      d="M9.88661 9.88668L6.11328 6.11334"
                                      stroke="white"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="group-hover:stroke-red-500 stroke-red-500"
                                    />
                                  </svg>
                                  Reject
                                </ButtonComponent>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Confirm Action</DialogTitle>
                                  <DialogDescription>
                                    <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px] my-5">
                                      Are you sure you want to reject this
                                      seller?
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                  <DialogClose asChild>
                                    <ButtonComponent
                                      variant="secondary"
                                      onClick={() =>
                                        handleSellerAction("REJECTED")
                                      }
                                      className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-red-500 text-white hover:bg-red-400 hover:font-semibold hover:transition-none leading-[16px]"
                                    >
                                      Reject
                                    </ButtonComponent>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        ) : sellerStatus === "APPROVED" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <ButtonComponent className="rounded-[4px] flex justify-start gap-2 items-center w-max py-[6px] px-[18px] text-[12px] bg-[#EE00041A] text-[#EE0004CC]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M8.00016 14.6667C11.6668 14.6667 14.6668 11.6667 14.6668 8.00001C14.6668 4.33334 11.6668 1.33334 8.00016 1.33334C4.3335 1.33334 1.3335 4.33334 1.3335 8.00001C1.3335 11.6667 4.3335 14.6667 8.00016 14.6667Z"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-red-500 stroke-red-500"
                                  />
                                  <path
                                    d="M6.11328 9.88668L9.88661 6.11334"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-red-500 stroke-red-500"
                                  />
                                  <path
                                    d="M9.88661 9.88668L6.11328 6.11334"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-red-500 stroke-red-500"
                                  />
                                </svg>
                                Reject
                              </ButtonComponent>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Confirm Action</DialogTitle>
                                <DialogDescription>
                                  <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px] my-5">
                                    Are you sure you want to reject this seller?
                                  </p>
                                </DialogDescription>
                              </DialogHeader>

                              <DialogFooter>
                                <DialogClose asChild>
                                  <ButtonComponent
                                    variant="secondary"
                                    onClick={() =>
                                      handleSellerAction("REJECTED")
                                    }
                                    className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-red-500 text-white hover:bg-red-400 hover:font-semibold hover:transition-none leading-[16px]"
                                  >
                                    Reject
                                  </ButtonComponent>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : sellerStatus === "REJECTED" ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <ButtonComponent className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-green-500 text-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="group-hover:stroke-green-500 "
                                >
                                  <path
                                    d="M8.00016 14.6667C11.6668 14.6667 14.6668 11.6667 14.6668 8.00001C14.6668 4.33334 11.6668 1.33334 8.00016 1.33334C4.3335 1.33334 1.3335 4.33334 1.3335 8.00001C1.3335 11.6667 4.3335 14.6667 8.00016 14.6667Z"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-green-500 stroke-white"
                                  />
                                  <path
                                    d="M7 10L10.7733 6"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-green-500 stroke-white"
                                  />
                                  <path
                                    d="M7 10L5 8"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="group-hover:stroke-green-500 stroke-white"
                                  />
                                </svg>
                                Approve
                              </ButtonComponent>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Confirm Action</DialogTitle>
                                <DialogDescription>
                                  <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px] my-5">
                                    Are you sure you want to approve this
                                    seller?
                                  </p>
                                </DialogDescription>
                              </DialogHeader>

                              <DialogFooter>
                                <DialogClose asChild>
                                  <ButtonComponent
                                    variant="secondary"
                                    onClick={() =>
                                      handleSellerAction("APPROVED")
                                    }
                                    className="rounded-[4px] flex gap-2 justify-center items-center w-max py-[6px] px-[18px] text-[12px] bg-green-500 text-white hover:bg-green-400 hover:font-semibold hover:transition-none leading-[16px]"
                                  >
                                    Approve
                                  </ButtonComponent>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
                <div className="flex text-black justify-start items-start gap-10 w-full overflow-auto px-5 pt-5">
                  {stepper.all.map((step, index, array) => (
                    <div
                      className="flex items-center justify-center flex-col min-w-[230px]"
                      key={step.id}
                    >
                      <Card
                        className={cn(
                          "relative flex flex-col gap-2 border border-transparent hover:border-[#e5e7eb] p-4 shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] transition-colors bg-white w-full group cursor-pointer",
                        )}
                        onClick={async () =>
                          handleStepChange(index, currentIndex, step)
                        }
                      >
                        <div className="flex gap-2 justify-start items-center">
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-full  w-[26.6px] h-[26.6px]",
                              index == currentIndex
                                ? "bg-[#EAEAEA]"
                                : stepCompleted[step.id]
                                  ? "bg-[#0D6ACE] completed-icon-color"
                                  : "bg-[#EAEAEA]",
                            )}
                          >
                            {index == currentIndex ? (
                              <step.icon className={"text-muted-foreground"} />
                            ) : stepCompleted[step.id] ? (
                              <step.completedIcon className={"text-white"} />
                            ) : (
                              <step.icon className={"text-muted-foreground"} />
                            )}
                          </div>
                          <div className="text-[#76828D] text-[12px]  font-semibold leading-[12px] tracking-[0.48px]">
                            Step {index + 1}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <div
                          className={cn(
                            " text-[12px] font-medium leading-[12px]  p-[10px] bg-[#eaeaea] rounded-[4px] w-fit",
                            index == currentIndex
                              ? "text-[#080808]"
                              : stepCompleted[step.id]
                                ? "text-white bg-[#0D6ACE]"
                                : "text-[#080808]",
                          )}
                        >
                          {index == currentIndex
                            ? "In-Progress"
                            : stepCompleted[step.id]
                              ? "Completed"
                              : "Pending"}
                        </div>
                      </Card>
                      {index !== stepper.all.length - 1 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="19"
                          viewBox="0 0 6 19"
                          fill="none"
                          className=""
                        >
                          <path
                            d="M3.5 5L5.88675 1.26184e-07L0.113249 -1.26184e-07L2.5 5L3.5 5ZM2.5 14L0.113248 19L5.88675 19L3.5 14L2.5 14ZM2.5 4.5L2.5 14.5L3.5 14.5L3.5 4.5L2.5 4.5Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Header toggleSidebar={toggleSidebar} title="Seller Onboarding" />
            )}

            {isPending || isPendingAdmin ? (
              <Loader />
            ) : (
              <div className="flex-1">
                {stepper.switch({
                  "general-info": () => (
                    <GeneralInformationForm
                      isEditing={isEditing}
                      completedSections={completedSections}
                      handleSectionComplete={handleSectionComplete}
                      companyInfoForm={companyInfoForm}
                      companyInfoEditForm={companyInfoEditForm}
                      companyVerificationForm={companyVerificationForm}
                      contactDetailsForm={contactDetailsForm}
                      readOnly={isReadOnly}
                    />
                  ),
                  documents: () => (
                    <DocumentsForm
                      initialData={{}}
                      completedSections={completedSections}
                      handleSectionComplete={handleSectionComplete}
                      ProductInformationForm={ProductInformationForm}
                      // ReachInformationForm={ReachInformationForm}
                      CertificatesFormOne={CertificatesFormOne}
                      finalDocumentsForm={finalDocumentsForm}
                      onFormCompletion={(isComplete: boolean) =>
                        updateFormCompletion("documents", isComplete)
                      }
                      readOnly={isReadOnly}
                    />
                  ),
                  location: () => (
                    <LocationForm
                      initialData={{}}
                      completedSections={completedSections}
                      handleSectionComplete={handleSectionComplete}
                      deliveryLocationsForm={deliveryLocationsForm}
                      storageLocationsForm={storageLocationsForm}
                      onFormCompletion={(isComplete: boolean) =>
                        updateFormCompletion("location", isComplete)
                      }
                      readOnly={isReadOnly}
                    />
                  ),
                })}
              </div>
            )}
          </main>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(val) => {
              router.replace(ROUTES.SELLER_DASHBOARD);
              setIsDialogOpen(val);
            }}
          >
            <DialogContent className="max-w-[599px]">
              <div className="flex items-center flex-col justify-center gap-6 p-5">
                <Image src={envelop} alt="envelop" />
                <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px]">
                  Your company&apos;s application is currently under review. We
                  will notify you as soon as it is approved. In the meantime,
                  please feel free to start adding products.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {!isReadOnly ? (
            <Dialog
              open={isDialogOpenForEdit}
              onOpenChange={(val) => {
                setIsDialogOpenForEdit(val);
              }}
            >
              <DialogContent className="max-w-[599px]">
                <div className="flex items-center flex-col justify-center gap-6 p-5">
                  <Image src={envelop} alt="envelop" />
                  <p className="text-[#333335] text-left text-[18px] font-normal leading-[28.8px]">
                    Your account will become unverified after changes and
                    require admin approval.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ) : null}
        </form>
      </Form>
    </>
  );
};

export default SellerOnboarding;
