"use client";

import * as yup from "yup";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import {
  UseSaveBuyerMembershipPlan,
  UseSaveBuyerOnboardingInfo,
} from "@/services/query-components/buyer.query-components.services";
import { ButtonComponent } from "@/components/common/ButtonComponent";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/route.utils";
import { getLocalStorage } from "@/lib/useLocalStorage";
import { useState } from "react";

const subscriptionPlans = [
  {
    key: "TRIAL",
    title: "Free Trial",
    subtitle: "Scale your business",
    price: "0,00",
    isRecommended: false,
    features: [
      {
        name: "Trial Duration",
        description: "45-day free trial with access to create one RFQ.",
      },
      {
        name: "RFQ Limit",
        description:
          "Only one RFQ can be created during the trial; additional RFQs require an upgrade.",
      },
      {
        name: "Upgrade Option",
        description:
          "Upgrade anytime to unlock full access and create more RFQs.",
      },
    ],
  },
  {
    key: "STANDARD",
    title: "Standard",
    subtitle: "Scale your business",
    price: "1,500",
    isRecommended: true,
    features: [
      {
        name: "Standard Plan Duration",
        description: "Access to create three RFQs.",
      },
      {
        name: "RFQ Limit",
        description:
          "Only one RFQ can be created during the trial; additional RFQs require an upgrade.",
      },
      {
        name: "Upgrade Option",
        description:
          "Upgrade anytime to unlock full access and create more RFQs.",
      },
    ],
  },
  {
    key: "VIP",
    title: "VIP",
    subtitle: "Scale your business",
    price: "2,000",
    isRecommended: false,
    features: [
      {
        name: "VIP Plan Duration",
        description: "Unlimited access to create RFQs.",
      },
      {
        name: "RFQ Limit",
        description:
          "Only one RFQ can be created during the trial; additional RFQs require an upgrade.",
      },
      {
        name: "Upgrade Option",
        description:
          "Upgrade anytime to unlock full access and create more RFQs.",
      },
    ],
  },
];

export const buyerSubscriptionSchema = yup.object({
  type: yup.string().required(),
});

function ChoosePlan({
  subscriptionForm,
  schema,
}: {
  subscriptionForm: UseFormReturn<
    yup.InferType<typeof buyerSubscriptionSchema>,
    any,
    undefined
  >;
  schema: typeof buyerSubscriptionSchema;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState<any>(() => getLocalStorage("user"));

  const successCallbackForOnboarding = (data: any) => {
    router.replace(ROUTES.BUYER_DASHBOARD);
  };
  const failureCallbackForOnboarding = () => {};
  const { mutate: saveOnboardingInfoMutate } = UseSaveBuyerOnboardingInfo(
    successCallbackForOnboarding,
    failureCallbackForOnboarding,
  );

  const successCallback = (data: any) => {
    if (id) saveOnboardingInfoMutate(id);
  };
  const failureCallback = () => {};
  const { mutate: saveFinancialInfoMutate } = UseSaveBuyerMembershipPlan(
    successCallback,
    failureCallback,
  );

  function onSubmit(value: yup.InferType<typeof schema>) {
    if (id) saveFinancialInfoMutate({ type: value.type, id });
  }

  return (
    <Form {...subscriptionForm}>
      <div className="w-full bg-[#E1EFFF] rounded-lg min-h-[calc(100vh_-_126px)]">
        <div className="flex items-center justify-center h-full">
          <main className="lg:p-[60px] p-5 relative w-full">
            <div className="mx-auto max-w-6xl text-center relative">
              <h2 className="text-[#122D4F] text-[32px] font-semibold leading-[28.8px]">
                Find the right plan for you
              </h2>
              <p className="text-[#122D4F99] mt-6 mb-10 text-[20px] font-medium leading-[20px]">
                Select your preferred plan and choose a plan when you&apos;re
                ready.
              </p>
              <FormField
                control={subscriptionForm.control}
                name="type"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={field.disabled}
                  >
                    <div className="grid gap-7 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                      {subscriptionPlans.map((item) => {
                        return (
                          <div className="flex" key={item.key}>
                            <RadioGroupItem
                              className="hidden"
                              value={item.key}
                              id={item.key}
                              disabled={item.key !== "TRIAL"}
                            />
                            <label
                              htmlFor={item.key}
                              className={cn(
                                "block rounded-lg p-5 text-left bg-white hover:border hover:border-[#0C8CE9] border border-transparent",
                                field.value == item.key &&
                                  "border-[#0C8CE9] cursor-pointer",
                                item.key !== "TRIAL" &&
                                  "hover:border-transparent cursor-not-allowed",
                              )}
                            >
                              <div className="flex justify-between items-center">
                                <h3 className="text-[#122D4F] text-[20px] font-semibold leading-[28.8px] mb-1">
                                  {item.title}
                                </h3>

                                {item.isRecommended && (
                                  <label className="bg-[#DFF994] py-[3px] px-3 text-[#122D4F] text-[10px] font-semibold leading-[20px] rounded-[4px]">
                                    Recommended
                                  </label>
                                )}
                              </div>
                              <p className="text-[#122D4F99] text-[14px] font-medium leading-[20px]">
                                {item.subtitle}
                              </p>
                              <div className="mt-[30px]">
                                <span
                                  className="text-[#396CE8] text-[29px] font-bold leading-[28.8px]
  "
                                >
                                  ${item.price}/mo
                                </span>
                                <span className="text-[#396CE8] text-[16px] font-bold leading-[28.8px]"></span>
                              </div>

                              <ul className="mt-[30px] space-y-4">
                                {item.features.map((feature) => {
                                  return (
                                    <li
                                      key={feature.name}
                                      className="flex items-start gap-2 w-full justify-start"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="11"
                                        height="8"
                                        viewBox="0 0 11 8"
                                        fill="none"
                                        className="min-w-[11px] min-h-[8px] mt-[5px]"
                                      >
                                        <path
                                          d="M3.94796 8C3.76863 8.00008 3.59106 7.96303 3.4254 7.89098C3.25974 7.81892 3.10925 7.71328 2.98255 7.58009L0 4.45161L1.1381 3.25775L3.94796 6.20667L9.8619 5.25172e-05L11 1.19392L4.91336 7.58009C4.78666 7.71328 4.63617 7.81892 4.47051 7.89098C4.30485 7.96303 4.12728 8.00008 3.94796 8Z"
                                          fill="#3EA56B"
                                        />
                                      </svg>
                                      <p className="text-[#122D4F] text-[12px] font-bold leading-[20px] break-all">
                                        {feature.name}:&nbsp;
                                        <span className="text-[#122D4F] text-[12px] font-medium leading-[20px]">
                                          {feature.description}
                                        </span>
                                      </p>
                                    </li>
                                  );
                                })}
                              </ul>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                )}
              />
              <div className="flex justify-center items-center">
                <p className="text-[#122D4F99] text-center text-[16px] font-medium leading-[28px] mt-10 lg:w-4/5 w-full">
                  Prices do not include VAT, which is determined based on the
                  user&apos;s billing country. The final price can be seen on
                  the purchase page, before payment is completed. The Ad
                  Vouchers are third party services and products and therefore
                  are subject to the Terms of Use of such providers.
                </p>
              </div>

              {!subscriptionForm.formState.disabled && (
                <div className="flex justify-center items-center mt-6">
                  <ButtonComponent
                    type="button"
                    variant="primary"
                    className="w-fit"
                    onClick={subscriptionForm.handleSubmit(onSubmit)}
                    disabled={
                      subscriptionForm.watch("type") === userData.subscription
                    }
                  >
                    Start for free
                  </ButtonComponent>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Form>
  );
}

export default ChoosePlan;
