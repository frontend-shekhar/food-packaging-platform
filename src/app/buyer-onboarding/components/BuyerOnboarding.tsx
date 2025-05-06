"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { defineStepper } from "@stepperize/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import arrow from "../../../../public/images/arrow.svg";
import {
  CheckIcon,
  DocumentsIcon,
  FinancialIcon,
  GeneralInfoIcon,
  SubscriptionIcon,
} from "@/components/common/Icons";
import { ProfileCard } from "@/components/common/ProfileCard";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  UseGetBuyerOnboarding,
  UseGetBuyerOnboardingForAdmin,
  UseSaveBuyerCertificates,
  UseSaveBuyerContactInfo,
  UseSaveBuyerFinancialInfo,
} from "@/services/query-components/buyer.query-components.services";
import logo from "../../../../public/images/logo/logo-login.svg";
import ChoosePlan, {
  buyerSubscriptionSchema,
} from "@/components/forms/buyer-onboarding/ChoosePlan";
import DocumentsForm, {
  buyerDocumentsSchema,
} from "@/components/forms/buyer-onboarding/DocumentsForm";
import FinancialInformationForm, {
  buyerFinancialInfoSchema,
} from "@/components/forms/buyer-onboarding/FinancialInformationForm";
import BuyerGeneralInformationForm, {
  buyerContactDetailsSchema,
  buyerGeneralInfoEditSchema,
  buyerGeneralInfoSchema,
} from "@/components/forms/buyer-onboarding/GeneralForm";
import { getLocalStorage, saveLocalStorage } from "@/lib/useLocalStorage";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import { ROUTES } from "@/utils/route.utils";

const { useStepper, utils } = defineStepper(
  {
    id: "general-info",
    title: "General Information",
    icon: GeneralInfoIcon,
    completedIcon: CheckIcon,
    schema: buyerContactDetailsSchema,
  },
  {
    id: "documents-certificates",
    title: "Documents & Certificates",
    icon: DocumentsIcon,
    completedIcon: CheckIcon,
    schema: buyerDocumentsSchema,
  },
  {
    id: "financial-info",
    title: "Financial Information",
    icon: FinancialIcon,
    completedIcon: CheckIcon,
    schema: buyerFinancialInfoSchema,
  },
  {
    id: "choose-plan",
    title: "Choose Your Plan",
    icon: SubscriptionIcon,
    completedIcon: CheckIcon,
    schema: yup.object(),
  },
);

const BuyerOnboarding = ({
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const [stepCompleted, setStepCompleted] = useState<Record<string, boolean>>(
    stepper.all.reduce((acc: Record<string, boolean>, step) => {
      acc[step.id] = false;
      return acc;
    }, {}),
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Dynamic Stepper Forms
  const form = useForm<yup.InferType<typeof stepper.current.schema>>({
    mode: "onChange",
    resolver: yupResolver(stepper.current.schema),
    disabled: isReadOnly,
  });
  // General Form
  const generalForm = useForm<yup.InferType<typeof buyerGeneralInfoSchema>>({
    mode: "onChange",
    resolver: yupResolver(buyerGeneralInfoSchema),
    disabled: isReadOnly,
  });
  const generalEditForm = useForm<
    yup.InferType<typeof buyerGeneralInfoEditSchema>
  >({
    mode: "onChange",
    resolver: yupResolver(buyerGeneralInfoEditSchema),
    disabled: isReadOnly,
  });
  // Subcription Form
  const subscriptionForm = useForm<
    yup.InferType<typeof buyerSubscriptionSchema>
  >({
    mode: "onChange",
    resolver: yupResolver(buyerSubscriptionSchema),
    defaultValues: {
      type: "TRIAL",
    },
    disabled: isReadOnly,
  });
  const currentIndex = utils.getIndex(stepper.current.id);

  const populateData = (data: any) => {
    const {
      buyerDocumentAndCertificates,
      buyerGeneralInformation,
      buyerFinancialInfo,
      contactDetails,
      memberShipPlan,
      userResponse,
    } = data;

    form.reset({
      ...buyerDocumentAndCertificates,
      ...buyerFinancialInfo,
      ...contactDetails,
    });
    generalForm.reset({
      ...buyerGeneralInformation,
      email: userResponse.email,
      mobile: userResponse.mobile,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
    });
    generalEditForm.reset({
      ...buyerGeneralInformation,
      email: userResponse.email,
      mobile: userResponse.mobile,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
    });
    subscriptionForm.reset({
      type: memberShipPlan,
    });

    if (buyerGeneralInformation)
      setStepCompleted((prev) => ({ ...prev, "general-info": true }));
    if (buyerDocumentAndCertificates)
      setStepCompleted((prev) => ({
        ...prev,
        "documents-certificates": true,
      }));
    if (buyerFinancialInfo)
      setStepCompleted((prev) => ({ ...prev, "financial-info": true }));
    if (memberShipPlan) {
      saveLocalStorage("user", { ...userData, subscription: memberShipPlan });
      setStepCompleted((prev) => ({ ...prev, "choose-plan": true }));
    }
  };

  const successCallbackForGet = (data: any) => {
    if (data) {
      if (data.id) router.replace(`${pathname}?id=${data.id}`);
      populateData(data);
    }
  };

  const failureCallbackForGet = () => {};
  const { mutate: getBuyerInfoMutate, isPending } = UseGetBuyerOnboarding(
    successCallbackForGet,
    failureCallbackForGet,
  );

  const successCallbackForAdminGet = (data: any) => {
    populateData(data);
  };
  const failureCallbackForAdminGet = () => {};

  const { mutate: getBuyerInfoForAdminMutate, isPending: isPendingAdmin } =
    UseGetBuyerOnboardingForAdmin(
      successCallbackForAdminGet,
      failureCallbackForAdminGet,
    );

  const successCallback = (data: any) => {
    setStepCompleted((prev) => ({ ...prev, [stepper.current.id]: true }));
    stepper.next();
  };
  const failureCallback = () => {};

  const { mutate: saveBuyerContactInfoMutate } = UseSaveBuyerContactInfo(
    successCallback,
    failureCallback,
  );
  const { mutate: saveCertificatesMutate } = UseSaveBuyerCertificates(
    successCallback,
    failureCallback,
  );
  const { mutate: saveFinancialInfoMutate } = UseSaveBuyerFinancialInfo(
    successCallback,
    failureCallback,
  );

  useEffect(() => {
    const userDataLocal: any = getLocalStorage("user");
    generalForm.setValue("firstName", userDataLocal.firstName);
    generalForm.setValue("lastName", userDataLocal.lastName);
    generalForm.setValue("mobile", userDataLocal.mobile);
    generalForm.setValue("email", userDataLocal.email);
    // generalEditForm.setValue("firstName", userDataLocal.firstName);
    // generalEditForm.setValue("lastName", userDataLocal.lastName);
    // generalEditForm.setValue("mobile", userDataLocal.mobile);
    // generalEditForm.setValue("email", userDataLocal.email);
    setUserData(userDataLocal);

    if (isReadOnly && detailId) {
      getBuyerInfoForAdminMutate(detailId);
    } else {
      getBuyerInfoMutate(userDataLocal.id);
    }
  }, [
    isReadOnly,
    detailId,
    getBuyerInfoForAdminMutate,
    getBuyerInfoMutate,
    form,
    generalForm,
    // generalEditForm,
  ]);

  const progress =
    Object.values(stepCompleted).reduce(
      (acc, curr) => acc + (curr ? 1 : 0),
      0,
    ) *
    (100 / Object.values(stepCompleted).length);

  const onSubmit = (values: yup.InferType<typeof stepper.current.schema>) => {
    if (id) {
      if (stepper.current.id === "general-info") {
        const { mobile, faxNumber, website } = values as yup.InferType<
          typeof buyerContactDetailsSchema
        >;

        saveBuyerContactInfoMutate({
          data: {
            mobile,
            faxNumber,
            website,
          },
          id: id,
        });
      } else if (stepper.current.id === "documents-certificates") {
        const {
          certificates,
          licenses,
          awards,
          laborCertificates,
          letterOfCorporation,
          otherDocuments,
        } = values as yup.InferType<typeof buyerDocumentsSchema>;

        saveCertificatesMutate({
          data: {
            certificates,
            licenses,
            awards,
            laborCertificates,
            letterOfCorporation,
            otherDocuments,
          },
          id: id,
        });
      } else if (stepper.current.id === "financial-info") {
        const {
          listedOnStockExchange,
          auditors,
          capital,
          totalAssets,
          turnOverCurrent,
          turnOverLast,
        } = values as yup.InferType<typeof buyerFinancialInfoSchema>;

        saveFinancialInfoMutate({
          data: {
            auditors,
            capital,
            listedOnStockExchange,
            totalAssets,
            turnOverCurrent,
            turnOverLast,
          },
          id: id,
        });
      }
    }
  };

  const handleStepChange = async (
    index: number,
    currentIndex: number,
    step: (typeof stepper.all)[number],
  ) => {
    const isGeneralInfoStep = stepper.current.id === "general-info";

    // Handle backward steps
    if (index < currentIndex) {
      stepper.goTo(step.id);
      return;
    }

    // Handle forward steps
    if (index > currentIndex) {
      const validateForms = async () => {
        if (isGeneralInfoStep) {
          const validGeneralInfo = isEditing
            ? await generalEditForm.trigger()
            : await generalForm.trigger();
          const valid = await form.trigger();
          return valid && validGeneralInfo;
        }
        return await form.trigger();
      };

      if (await validateForms()) {
        stepper.goTo(step.id);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white min-h-screen lg:block"
      >
        {!isEditing && (
          <aside
            className={`${isSidebarOpen ? "show" : ""} z-[999] w-[253px] bg-[#F6F9FF] h-full text-white fixed top-0 bottom-0 `}
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
                            // onClick={async () =>
                            //   handleStepChange(index, currentIndex, step)
                            // }
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
                                <step.completedIcon className={"text-white"} />
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
        {/* Scrollable content area */}
        <main
          className={cn(
            "bg-white flex flex-col min-h-screen w-full",
            isEditing ? "" : " lg:ml-[253px] lg:w-[calc(100%-253px)]",
          )}
        >
          {isEditing ? (
            <>
              {isReadOnly && (
                <Link
                  href={ROUTES.BUYER_LISTING}
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
              )}
              <div className="flex text-black justify-start items-start gap-10 w-full overflow-auto px-5 pt-5 pb-5">
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
                    {/* {index !== stepper.all.length - 1 && (
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
                  )} */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Header toggleSidebar={toggleSidebar} title="Buyer Onboarding" />
          )}

          {isPending || isPendingAdmin ? (
            <>
              <Loader />
            </>
          ) : (
            <div
              className={cn(
                "grid gap-6 mb-6 p-5",
                stepper.current.id === "choose-plan"
                  ? "lg:grid-cols-auto"
                  : " lg:grid-cols-[1fr_279px]",
              )}
            >
              <div
                className={cn(
                  "lg:col-span-1",
                  stepper.current.id === "choose-plan"
                    ? "col-span-6"
                    : "col-span-5 order-2 lg:order-1",
                )}
              >
                {stepper.switch({
                  "general-info": () => (
                    <BuyerGeneralInformationForm
                      isEditing={isEditing}
                      generalForm={generalForm}
                      generalEditForm={generalEditForm}
                      schema={
                        stepper.current
                          .schema as typeof buyerContactDetailsSchema
                      }
                    />
                  ),
                  "documents-certificates": () => (
                    <Suspense>
                      <DocumentsForm
                        schema={
                          stepper.current.schema as typeof buyerDocumentsSchema
                        }
                      />
                    </Suspense>
                  ),
                  "financial-info": () => (
                    <Suspense>
                      <FinancialInformationForm
                        schema={
                          stepper.current
                            .schema as typeof buyerFinancialInfoSchema
                        }
                      />
                    </Suspense>
                  ),
                  "choose-plan": () => (
                    <Suspense>
                      <ChoosePlan
                        subscriptionForm={subscriptionForm}
                        schema={
                          stepper.current
                            .schema as typeof buyerSubscriptionSchema
                        }
                      />
                    </Suspense>
                  ),
                })}
              </div>

              <aside
                className={cn(
                  "h-full min-w-[279px] order-1 lg:order-2",
                  stepper.current.id === "choose-plan" ? "hidden" : "",
                )}
              >
                <ProfileCard progress={progress} />
              </aside>
            </div>
          )}
        </main>
      </form>
    </Form>
  );
};

export default BuyerOnboarding;
