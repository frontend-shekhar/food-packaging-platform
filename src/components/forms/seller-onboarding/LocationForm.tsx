"use client";

import * as yup from "yup";
import { Check } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Country, State } from "country-state-city";
import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, Form } from "@/components/ui/form";
import { showErrorToastMessage } from "@/utils/toast.utils";
import {
  UseSaveSellerLocationhDetails,
  UsesellerOnboardingLocationDetailsDelete,
} from "@/services/query-components/seller-onborading.query-components.services";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import usePopoverWidth from "@/components/common/usePopoverWidth";
import {
  UseGetGoogleLocation,
  UseGetGooglePlace,
} from "@/services/query-components/maps.query-components.services";
import { debounce } from "lodash";

// Main Page
export default function LocationForm({
  onFormCompletion,
  initialData,
  readOnly,
  storageLocationsForm,
  deliveryLocationsForm,
  completedSections,
  handleSectionComplete,
}: {
  onFormCompletion: any;
  initialData: any;
  readOnly: any;
  deliveryLocationsForm: UseFormReturn<deliveryLocationsData, any, undefined>;
  storageLocationsForm: UseFormReturn<
    StorageLocationSchemsData,
    any,
    undefined
  >;
  completedSections: any;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const hasProcessedFormCompletion = useRef(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formCompletion, setFormCompletion] = useState({
    StorageLocations: false,
    DeliveryLocations: false,
  });

  const isFormsComplete =
    (formCompletion.StorageLocations ||
      initialData?.storageLocations?.length > 0) &&
    (formCompletion.DeliveryLocations ||
      initialData?.deliveryLocations?.length > 0);

  useEffect(() => {
    if (initialData) {
      setFormCompletion({
        StorageLocations: initialData?.storageLocations?.length > 0,
        DeliveryLocations: initialData?.deliveryLocations?.length > 0,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (isFormsComplete && !hasProcessedFormCompletion.current) {
      onFormCompletion(isFormsComplete);
      hasProcessedFormCompletion.current = true;
    }
  }, [formCompletion, onFormCompletion, isFormsComplete]);

  useEffect(() => {
    const isAllFormsComplete =
      formCompletion.StorageLocations && formCompletion.DeliveryLocations;

    // Only call onFormCompletion if the status has changed
    if (isAllFormsComplete && !hasProcessedFormCompletion.current) {
      onFormCompletion(isAllFormsComplete);
      hasProcessedFormCompletion.current = true;
    }
  }, [formCompletion, onFormCompletion]);

  const handleFormCompletion = useCallback(
    (formType: keyof typeof formCompletion, isComplete: boolean) => {
      setFormCompletion((prev) => ({
        ...prev,
        [formType]: isComplete,
      }));
    },
    [],
  );

  return (
    <div className="w-full p-5">
      <div className="bg-white rounded-lg shadow-[0_0_13px_5px_rgba(0,0,0,0.02)] mb-6 sticky top-[60px] z-10">
        {/* Progress Steps */}
        <div className="flex justify-start overflow-x-auto w-full mb-6">
          <a
            className={`flex items-center pt-[14px] pb-[13px] pl-5 pe-[25px] border border-b-[5px] ${
              currentStep == 0
                ? "border-[#2B62DD]"
                : "border-transparent text-gray-600"
            } border-t-0 border-l-0 border-r-0 min-w-[224px] lg:max-w-full max-w-[350px]`}
            href="#delivery-location"
            onClick={() => setCurrentStep(0)}
          >
            <div
              className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                currentStep === 0 || completedSections["delivery"]
                  ? "bg-[#2B62DD] text-white"
                  : "bg-transparent text-[#122D4F] border border-[#122D4F]"
              } text-center text-[10px] font-normal leading-normal`}
            >
              01
            </div>
            <div className="ml-2">
              <p
                className={`text-[14px] font-semibold leading-[20px] ${
                  currentStep === 0 || completedSections["delivery"]
                    ? "text-[#2B62DD]"
                    : "text-gray-600"
                }`}
              >
                Delivery locations
              </p>
            </div>
          </a>
          <a
            className={`flex items-center pt-[14px] pb-[13px] px-[25px] border border-b-[5px] ${
              currentStep == 1
                ? "border-[#2B62DD]"
                : "border-transparent text-gray-600"
            } border-t-0 border-l-0 border-r-0 min-w-[224px]`}
            href="#storage-location"
            onClick={() => setCurrentStep(1)}
          >
            <div
              className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
                currentStep === 1 || completedSections["storage"]
                  ? "bg-[#2B62DD] text-white"
                  : "bg-transparent text-[#122D4F] border border-[#122D4F]"
              } text-center text-[10px] font-normal leading-normal`}
            >
              02
            </div>
            <div className="ml-2">
              <p
                className={`text-[14px] font-semibold leading-[20px] ${
                  currentStep === 1 || completedSections["storage"]
                    ? "text-[#2B62DD]"
                    : "text-gray-600"
                }`}
              >
                Storage locations
              </p>
            </div>
          </a>
        </div>
      </div>
      <DeliveryLocations
        isCompleted={completedSections["delivery"]}
        handleSectionComplete={handleSectionComplete}
        deliveryLocationsForm={deliveryLocationsForm}
        readOnly={readOnly}
        onFormCompletion={(isComplete) =>
          handleFormCompletion("DeliveryLocations", isComplete)
        }
      />

      <StorageLocations
        isCompleted={completedSections["storage"]}
        handleSectionComplete={handleSectionComplete}
        initialData={initialData}
        storageLocationsForm={storageLocationsForm}
        readOnly={readOnly}
        onFormCompletion={(isComplete) =>
          handleFormCompletion("StorageLocations", isComplete)
        }
      />

      <div className="flex justify-end px-5 py-4 mt-6">
        <Button
          disabled={readOnly}
          type="submit"
          // disabled={!isFormsComplete || isSaving || readOnly}
          className={`capitalize h-auto text-sm font-semibold leading-normal py-[9.5px] px-8 ${
            false
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#1B2B65] hover:bg-[#2B62DD]"
          } text-white font-semibold rounded-[8px]`}
        >
          {isSaving ? "Saving..." : "Save seller onbording"}
        </Button>
      </div>
    </div>
  );
}

// Delivery Location
export const deliveryLocationsSchem = yup.object({
  id: yup.string().optional(),
  yourName: yup.string().when({
    is: (value: string | undefined) => !!value, // Check if the field has a value
    then: (schema) => schema.max(40, "Maximum length is 40 characters"),
    otherwise: (schema) => schema, // No validation if empty
  }),
  consigneeName: yup.string().when({
    is: (value: string | undefined) => !!value, // Check if the field has a value
    then: (schema) => schema.max(40, "Maximum length is 40 characters"),
    otherwise: (schema) => schema, // No validation if empty
  }),
  fullLocation: yup.string().optional(),
  country: yup.string().optional(),
  state: yup.string().optional(),
  postalCode: yup.string().optional(),
});

export type deliveryLocationsData = yup.InferType<
  typeof deliveryLocationsSchem
>;

function DeliveryLocations({
  onFormCompletion,
  readOnly,
  deliveryLocationsForm,
  isCompleted,
  handleSectionComplete,
}: {
  onFormCompletion: (isComplete: boolean) => void;
  readOnly: any;
  deliveryLocationsForm: UseFormReturn<deliveryLocationsData, any, undefined>;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionResults, setPredictionResults] = useState<
    {
      description: string;
      place_id: string;
    }[]
  >([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const successCallbackForLocation = (data: any) => {
    setShowSuggestions(true);
    setPredictionResults(data);
  };
  const failureCallbackForLocation = () => {};
  const { mutate: getLocationMutate } = UseGetGoogleLocation(
    successCallbackForLocation,
    failureCallbackForLocation,
  );

  const successCallbackForPlace = (data: any) => {
    setShowSuggestions(false);
    deliveryLocationsForm.setValue(
      "fullLocation",
      data.name + " " + data.street_address + " " + data.city,
    );
    deliveryLocationsForm.setValue("postalCode", data.zip_code);

    if (countryList.findIndex((city) => city.name === data.country) !== -1) {
      deliveryLocationsForm.setValue("country", data.country);
      deliveryLocationsForm.clearErrors("country");

      if (
        State.getAllStates().findIndex((state) => state.name === data.state) !==
        -1
      ) {
        deliveryLocationsForm.setValue("state", data.state);
        deliveryLocationsForm.clearErrors("state");
      } else {
        deliveryLocationsForm.setValue("state", "");
      }
    } else {
      deliveryLocationsForm.setValue("country", "");
      deliveryLocationsForm.setValue("state", "");
    }
  };
  const failureCallbackForPlace = () => {};
  const { mutate: getPlaceMutate } = UseGetGooglePlace(
    successCallbackForPlace,
    failureCallbackForPlace,
  );

  const countryList = Country.getAllCountries();
  const countryIsoCode = countryList.find(
    (country) => country.name === deliveryLocationsForm.watch("country"),
  )?.isoCode;
  const stateList = State.getStatesOfCountry(countryIsoCode);

  const successCallback = (data: any) => {
    setShowSuggestions(false);
    handleSectionComplete("delivery", true);
  };
  const failureCallback = () => {};
  const { mutate: saveLocationMutation } = UseSaveSellerLocationhDetails(
    successCallback,
    failureCallback,
  );
  const { mutate: deleteLocationMutation } =
    UsesellerOnboardingLocationDetailsDelete(successCallback, failureCallback);

  const {
    formState: { errors },
  } = deliveryLocationsForm;

  useEffect(() => {
    const delivaryData = deliveryLocationsForm.getValues();
    if (delivaryData && Object.keys(delivaryData).length > 0) {
      const locationsArray = Object.values(delivaryData).filter(
        (location) => location,
      );
      setSavedLocations(locationsArray);
    }
  }, [deliveryLocationsForm]);

  const onSubmit = async (data: deliveryLocationsData) => {
    if (id) {
      const payload = editMode
        ? {
            data: {
              id: editingLocationId,
              name: data.yourName,
              consigneeName: data.consigneeName,
              location: data.fullLocation,
              zipCode: data.postalCode,
              state: data.state,
              country: data.country,
            },
            id: id,
            LocationType: "DELIVERY",
          }
        : {
            data: {
              name: data.yourName,
              consigneeName: data.consigneeName,
              location: data.fullLocation,
              zipCode: data.postalCode,
              state: data.state,
              country: data.country,
            },
            id: id,
            LocationType: "DELIVERY",
          };

      saveLocationMutation(payload, {
        onSuccess: ({ data }) => {
          if (editMode) {
            setSavedLocations((prev) =>
              prev.map((loc) =>
                loc.id === editingLocationId
                  ? {
                      ...loc,
                      name: data.name,
                      consigneeName: data.consigneeName,
                      location: data.location,
                      country: data.country,
                      state: data.state,
                      zipCode: data.zipCode,
                    }
                  : loc,
              ),
            );
          } else {
            const newLocation = {
              id: data.id,
              name: data.name,
              consigneeName: data.consigneeName,
              location: data.location,
              country: data.country,
              state: data.state,
              zipCode: data.zipCode,
              type: data.type,
            };
            setSavedLocations((prev) => [newLocation, ...prev]);
          }

          resetForm();
          setChangeText(true);
          onFormCompletion(true);
        },
      });
    }
  };

  const [changeText, setChangeText] = useState(false);

  const resetForm = () => {
    deliveryLocationsForm.reset({
      yourName: "",
      consigneeName: "",
      fullLocation: "",
      country: "",
      state: "",
      postalCode: "",
    });
    setEditMode(false);
    setEditingLocationId("");
  };

  const handleEdit = (location: any) => {
    setEditMode(true);
    setEditingLocationId(location.id);
    deliveryLocationsForm.reset({
      yourName: location.name,
      consigneeName: location.consigneeName,
      fullLocation: location.location,
      country: location.country,
      state: location.state,
      postalCode: location.zipCode,
    });
  };

  const handleDeleteLocation = (locationId: string) => {
    // if (savedLocations.length <= 1) {
    //   showErrorToastMessage("At least one location is required.");
    //   return;
    // }

    deleteLocationMutation(locationId, {
      onSuccess: () => {
        setSavedLocations((prev) =>
          prev.filter((location) => location.id !== locationId),
        );
      },
    });
  };

  const handleSuggestionClick = useCallback(
    (placeId?: string) => {
      if (placeId) {
        getPlaceMutate({ placeId });
      } else {
        setShowSuggestions(false);
      }
    },
    [getPlaceMutate],
  );

  // Debounced Search Logic
  const debouncedResults = useMemo(() => {
    return debounce((value: string) => {
      getLocationMutate({ place: value });
    }, 500);
  }, [getLocationMutate]);

  const { popoverRef, popoverWidth } = usePopoverWidth();
  // Add this ref to the component
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Add this useEffect hook to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <Form {...deliveryLocationsForm}>
        <div id="delivery-location">
          <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Delivery Locations</h2>
              <div className="flex gap-4">
                <div
                  className={`ml-2 text-[14px] font-semibold leading-normal ${
                    isCompleted ? "text-green-600" : "text-[#312C63]"
                  }`}
                >
                  {isCompleted ? "Completed" : "Incomplete"}
                </div>
                <p className="text-sm text-gray-500">
                  {savedLocations.length}/5 Locations
                </p>
              </div>
            </div>
            <div className="pt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={deliveryLocationsForm.control}
                  name="yourName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        placeholder="Your Name"
                        disabled={readOnly}
                        className={`h-[52px] ${
                          deliveryLocationsForm.formState.errors.yourName
                            ? "border-red-500"
                            : "bg-[#FBFBFB]"
                        }`}
                      />
                      {deliveryLocationsForm.formState.errors.yourName && (
                        <p className="text-red-500 text-xs">
                          {
                            deliveryLocationsForm.formState.errors.yourName
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />

                <FormField
                  control={deliveryLocationsForm.control}
                  name="consigneeName"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        placeholder="Consignee Name"
                        disabled={readOnly}
                        className={`h-[52px] ${
                          deliveryLocationsForm.formState.errors.consigneeName
                            ? "border-red-500"
                            : "bg-[#FBFBFB]"
                        }`}
                      />
                      {deliveryLocationsForm.formState.errors.consigneeName && (
                        <p className="text-red-500 text-xs">
                          {
                            deliveryLocationsForm.formState.errors.consigneeName
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />

                <FormField
                  control={deliveryLocationsForm.control}
                  name="fullLocation"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        onInput={(e) =>
                          debouncedResults((e.target as HTMLInputElement).value)
                        }
                        placeholder="Full Location"
                        disabled={readOnly}
                        className={`h-[52px] ${
                          deliveryLocationsForm.formState.errors.fullLocation
                            ? "border-red-500"
                            : "bg-[#FBFBFB]"
                        }`}
                      />
                      {deliveryLocationsForm.formState.errors.fullLocation && (
                        <p className="text-red-500 text-xs">
                          {
                            deliveryLocationsForm.formState.errors.fullLocation
                              .message
                          }
                        </p>
                      )}
                      {showSuggestions && predictionResults.length > 0 && (
                        <ul
                          ref={dropdownRef}
                          className="custom-list shadow-lg border border-[#efefef] p-3 flex-col justify-start rounded-lg"
                        >
                          {/* <li
                            className="custom-list-item cursor-pointer hover:bg-[#fbfbfb] text-[14px]"
                            onClick={() => handleSuggestionClick()}
                          >
                            {deliveryLocationsForm.watch("fullLocation")}
                          </li> */}
                          {predictionResults.map(
                            ({ place_id, description }) => {
                              return (
                                <li
                                  key={place_id}
                                  className="custom-list-item cursor-pointer hover:bg-[#fbfbfb] flex justify-start items-center gap-2 border-b py-2 text-[14px]"
                                  onClick={() =>
                                    handleSuggestionClick(place_id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="min-w-[14px] min-h-[14px]"
                                  >
                                    <g clip-path="url(#clip0_334_616)">
                                      <path
                                        opacity="0.5"
                                        d="M6.99984 3.5C6.53835 3.5 6.08722 3.63685 5.70351 3.89324C5.31979 4.14963 5.02072 4.51404 4.84412 4.94041C4.66751 5.36677 4.62131 5.83592 4.71134 6.28854C4.80137 6.74117 5.0236 7.15693 5.34992 7.48325C5.67625 7.80957 6.09201 8.0318 6.54463 8.12183C6.99725 8.21186 7.46641 8.16566 7.89277 7.98905C8.31913 7.81245 8.68354 7.51338 8.93993 7.12966C9.19632 6.74595 9.33317 6.29482 9.33317 5.83333C9.33317 5.21449 9.08734 4.621 8.64975 4.18342C8.21217 3.74583 7.61868 3.5 6.99984 3.5ZM6.99984 7C6.76909 7 6.54353 6.93158 6.35167 6.80338C6.15982 6.67519 6.01028 6.49298 5.92198 6.2798C5.83368 6.06662 5.81057 5.83204 5.85559 5.60573C5.90061 5.37942 6.01172 5.17154 6.17488 5.00838C6.33804 4.84521 6.54592 4.7341 6.77223 4.68908C6.99854 4.64407 7.23312 4.66717 7.4463 4.75547C7.65948 4.84378 7.84169 4.99331 7.96989 5.18517C8.09808 5.37703 8.16651 5.60259 8.16651 5.83333C8.16651 6.14275 8.04359 6.4395 7.8248 6.65829C7.606 6.87708 7.30926 7 6.99984 7Z"
                                        fill="#080808"
                                      />
                                      <path
                                        opacity="0.5"
                                        d="M7.00018 13.9999C6.50898 14.0025 6.02433 13.8873 5.5868 13.664C5.14928 13.4407 4.77161 13.1158 4.48543 12.7166C2.26235 9.65003 1.13477 7.3447 1.13477 5.8642C1.13477 4.30859 1.75273 2.8167 2.85271 1.71672C3.95269 0.616741 5.44458 -0.0012207 7.00018 -0.0012207C8.55579 -0.0012207 10.0477 0.616741 11.1477 1.71672C12.2476 2.8167 12.8656 4.30859 12.8656 5.8642C12.8656 7.3447 11.738 9.65003 9.51493 12.7166C9.22875 13.1158 8.85109 13.4407 8.41356 13.664C7.97604 13.8873 7.49138 14.0025 7.00018 13.9999ZM7.00018 1.2722C5.78243 1.27359 4.61494 1.75795 3.75386 2.61904C2.89277 3.48012 2.40841 4.64761 2.40702 5.86536C2.40702 7.03786 3.51127 9.20611 5.5156 11.9705C5.68575 12.2049 5.90898 12.3957 6.16702 12.5272C6.42505 12.6587 6.71056 12.7273 7.00018 12.7273C7.28981 12.7273 7.57532 12.6587 7.83335 12.5272C8.09138 12.3957 8.31461 12.2049 8.48477 11.9705C10.4891 9.20611 11.5934 7.03786 11.5934 5.86536C11.592 4.64761 11.1076 3.48012 10.2465 2.61904C9.38542 1.75795 8.21794 1.27359 7.00018 1.2722Z"
                                        fill="#080808"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_334_616">
                                        <rect
                                          width="14"
                                          height="14"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  {description}
                                </li>
                              );
                            },
                          )}
                        </ul>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={deliveryLocationsForm.control}
                  name="country"
                  render={({ field }) => (
                    <div className="space-y-2" ref={popoverRef}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={readOnly}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              countryList.find(
                                (country) => country.name === field.value,
                              )?.name
                            ) : (
                              <span className="text-[#122D4F99]">Country</span>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="7"
                              viewBox="0 0 13 7"
                              fill="none"
                              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                            >
                              <path
                                opacity="0.6"
                                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                                fill="#122D4F"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{ width: `${popoverWidth}px` }}
                        >
                          <Command>
                            <CommandInput placeholder="Search Country..." />
                            <CommandList>
                              <CommandEmpty>No Country found.</CommandEmpty>
                              <CommandGroup>
                                {countryList.map((country) => (
                                  <CommandItem
                                    value={country.name}
                                    key={country.isoCode}
                                    onSelect={(e) => {
                                      deliveryLocationsForm.setValue(
                                        "state",
                                        "",
                                      );
                                      return field.onChange(e);
                                    }}
                                  >
                                    {country.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        country.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {deliveryLocationsForm.formState.errors.country && (
                        <p className="text-red04/90 text-xs font-medium">
                          {
                            deliveryLocationsForm.formState.errors.country
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={deliveryLocationsForm.control}
                  name="state"
                  render={({ field }) => (
                    <div className="space-y-2" ref={popoverRef}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            disabled={readOnly}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              stateList.find(
                                (state) => state.name === field.value,
                              )?.name
                            ) : (
                              <span className="text-[#122D4F99]">State</span>
                            )}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="7"
                              viewBox="0 0 13 7"
                              fill="none"
                              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                            >
                              <path
                                opacity="0.6"
                                d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                                fill="#122D4F"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          style={{ width: `${popoverWidth}px` }}
                        >
                          <Command>
                            <CommandInput placeholder="search state" />
                            <CommandList>
                              <CommandEmpty>No State found.</CommandEmpty>
                              <CommandGroup>
                                {stateList.map((state) => (
                                  <CommandItem
                                    value={state.name}
                                    key={state.isoCode}
                                    onSelect={field.onChange}
                                  >
                                    {state.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        state.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {deliveryLocationsForm.formState.errors.state && (
                        <p className="text-red04/90 text-xs font-medium">
                          {deliveryLocationsForm.formState.errors.state.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={deliveryLocationsForm.control}
                  name="postalCode"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        {...field}
                        placeholder="Postal Code"
                        disabled={readOnly}
                        className={`h-[52px] ${
                          deliveryLocationsForm.formState.errors.postalCode
                            ? "border-red-500"
                            : "bg-[#FBFBFB]"
                        }`}
                      />
                      {deliveryLocationsForm.formState.errors.postalCode && (
                        <p className="text-red-500 text-xs">
                          {
                            deliveryLocationsForm.formState.errors.postalCode
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end mt-5 lg:mt-10">
              <Button
                variant="outlineHover"
                type="button"
                className="mr-2 capitalize text-sm font-semibold leading-normal px-8 py-[8.5px] h-auto max-w-[104px] w-full"
                onClick={resetForm}
                disabled={readOnly}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={deliveryLocationsForm.handleSubmit(onSubmit)}
                disabled={(!editMode && savedLocations.length >= 5) || readOnly}
                className={`capitalize text-sm font-semibold leading-normal px-8 py-[8.5px] h-auto max-w-[104px] w-full ${
                  !editMode && savedLocations.length >= 5
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#1B2B65] text-[#F7F9FC]"
                }`}
              >
                {editMode ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Form>

      {savedLocations.length > 0 && (
        <div className="mb-6 bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5">
          <div className="">
            <h3 className="text-lg font-semibold mb-5">
              Saved Delivery Locations
            </h3>
            {/* {savedLocations.map((location) => (
              <>
                <div
                  key={location.id}
                  className="grid grid-cols-1 md:grid-cols-2 border-b py-3 last:border-b-0 gap-6"
                >
                  <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                    {location.name}
                  </label>
                  <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                    {location.location}
                  </label>
                  <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                    {location.state}
                  </label>
                  <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                    {location.country}
                  </label>
                  <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                    {" "}
                    {location.zipCode}
                  </label>

                  <div className="flex justify-end px-5 pt-[5px] pb-5 col-span-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleEdit(location)}
                      disabled={
                        (editMode && editingLocationId !== location.id) ||
                        readOnly
                      }
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDeleteLocation(location.id)}
                      disabled={savedLocations.length <= 1 || readOnly}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            ))} */}
            <div className="no-scrollbar overflow-x-auto w-full">
              <table className="table-auto border-collapse w-full rounded-lg bg-[#F0F1F7]">
                <thead className="whitespace-nowrap">
                  <tr className="border-b">
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Name
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Consignee Name
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Full Location
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Country
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      State
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Postal Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedLocations.map((location) => (
                    <tr key={location.id} className="border-b last:border-b-0">
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.name}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.consigneeName}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.location}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.country}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.state}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.zipCode}
                        </label>
                      </td>
                      <td className="p-4">
                        {!readOnly && (
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => handleEdit(location)}
                              // disabled={
                              //   (editMode && editingLocationId !== location.id) ||
                              //   readOnly
                              // }
                              className="mr-2 p-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M1.8668 14.4048C1.47061 14.0314 1.28013 13.4676 1.3487 12.8581L1.63061 10.3895C1.68394 9.92477 1.96584 9.30762 2.29346 8.97238L8.5487 2.35143C10.1106 0.698099 11.7411 0.652385 13.3944 2.21429C15.0477 3.77619 15.0935 5.40667 13.5316 7.06L7.27632 13.681C6.95632 14.0238 6.36203 14.3438 5.89727 14.42L3.44394 14.8391C3.31441 14.8467 3.20013 14.8619 3.07822 14.8619C2.61346 14.8619 2.17918 14.7019 1.8668 14.4048ZM9.37918 3.12096L3.12394 9.74953C2.97156 9.90953 2.79632 10.2905 2.76584 10.5114L2.48394 12.98C2.45346 13.2314 2.51442 13.4371 2.65156 13.5667C2.7887 13.6962 2.99442 13.7419 3.24584 13.7038L5.69918 13.2848C5.92013 13.2467 6.28584 13.0486 6.43822 12.8886L12.6935 6.26762C13.6382 5.26191 13.9811 4.33238 12.602 3.03715C11.9925 2.45048 11.4668 2.20667 10.9944 2.20667C10.4077 2.20667 9.89727 2.57238 9.37918 3.12096Z"
                                  fill="#87919F"
                                />
                                <path
                                  d="M12.0154 8.33279C9.63826 8.0966 7.72588 6.29089 7.36017 3.92898C7.31445 3.6166 7.52779 3.32708 7.84017 3.27374C8.15255 3.22803 8.44207 3.44136 8.49541 3.75374C8.78493 5.59755 10.2783 7.0147 12.1373 7.19755C12.4497 7.22803 12.6783 7.50993 12.6478 7.82231C12.6097 8.11184 12.3583 8.33279 12.0687 8.33279C12.0535 8.33279 12.0306 8.33279 12.0154 8.33279Z"
                                  fill="#87919F"
                                />
                              </svg>
                            </Button>
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => handleDeleteLocation(location.id)}
                              disabled={editingLocationId === location.id}
                              className="p-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                  fill="#FF5C5C"
                                />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Storage Location
export const StorageLocationSchem = yup.object().shape({
  yourName: yup.string().when({
    is: (value: string | undefined) => !!value, // Check if the field has a value
    then: (schema) => schema.max(40, "Maximum length is 40 characters"),
    otherwise: (schema) => schema, // No validation if empty
  }),
  consigneeName: yup.string().when({
    is: (value: string | undefined) => !!value, // Check if the field has a value
    then: (schema) => schema.max(40, "Maximum length is 40 characters"),
    otherwise: (schema) => schema, // No validation if empty
  }),
  location: yup.string().optional(),
  to: yup.string().optional(),
  country: yup.string().optional(),
  state: yup.string().optional(),
  postalCode: yup.string().optional(),
});

export type StorageLocationSchemsData = yup.InferType<
  typeof StorageLocationSchem
>;

function StorageLocations({
  onFormCompletion,
  initialData,
  readOnly,
  storageLocationsForm,
  isCompleted,
  handleSectionComplete,
}: {
  onFormCompletion: (isComplete: boolean) => void;
  initialData: any;
  readOnly: any;
  storageLocationsForm: UseFormReturn<
    StorageLocationSchemsData,
    any,
    undefined
  >;
  isCompleted: boolean;
  handleSectionComplete: (section: string, value: boolean) => void;
}) {
  const [savedLocations, setSavedLocations] = useState<any>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictionResults, setPredictionResults] = useState<
    {
      description: string;
      place_id: string;
    }[]
  >([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const successCallbackForLocation = (data: any) => {
    setShowSuggestions(true);
    setPredictionResults(data);
  };
  const failureCallbackForLocation = () => {};
  const { mutate: getLocationMutate } = UseGetGoogleLocation(
    successCallbackForLocation,
    failureCallbackForLocation,
  );

  const successCallbackForPlace = (data: any) => {
    setShowSuggestions(false);
    storageLocationsForm.setValue(
      "location",
      data.name + " " + data.street_address + " " + data.city,
    );
    storageLocationsForm.setValue("postalCode", data.zip_code);

    if (countryList.findIndex((city) => city.name === data.country) !== -1) {
      storageLocationsForm.setValue("country", data.country);
      storageLocationsForm.clearErrors("country");

      if (
        State.getAllStates().findIndex((state) => state.name === data.state) !==
        -1
      ) {
        storageLocationsForm.setValue("state", data.state);
        storageLocationsForm.clearErrors("state");
      } else {
        storageLocationsForm.setValue("state", "");
      }
    } else {
      storageLocationsForm.setValue("country", "");
      storageLocationsForm.setValue("state", "");
    }
  };
  const failureCallbackForPlace = () => {};
  const { mutate: getPlaceMutate } = UseGetGooglePlace(
    successCallbackForPlace,
    failureCallbackForPlace,
  );

  const countryList = Country.getAllCountries();
  const countryIsoCode = countryList.find(
    (country) => country.name === storageLocationsForm.watch("country"),
  )?.isoCode;
  const stateList = State.getStatesOfCountry(countryIsoCode);

  const successCallback = (data: any) => {
    setShowSuggestions(false);
    handleSectionComplete("storage", true);
  };
  const failureCallback = () => {};
  const { mutate: saveLocationMutation } = UseSaveSellerLocationhDetails(
    successCallback,
    failureCallback,
  );

  const successCallbackForDelete = (data: any) => {};
  const failureCallbackForDelete = () => {};
  const { mutate: deleteLocationMutation } =
    UsesellerOnboardingLocationDetailsDelete(
      successCallbackForDelete,
      failureCallbackForDelete,
    );

  const {
    formState: { errors },
  } = storageLocationsForm;

  useEffect(() => {
    const storageData = storageLocationsForm.getValues();
    if (storageData && Object.keys(storageData).length > 0) {
      const locationsArray = Object.values(storageData).filter(
        (location) => location,
      );
      setSavedLocations(locationsArray);
    }
  }, [storageLocationsForm]);

  const [changeText, setChangeText] = useState(false);

  const resetForm = () => {
    storageLocationsForm.reset({
      yourName: "",
      consigneeName: "",
      location: "",
      to: "",
      country: "",
      state: "",
      postalCode: "",
    });
    setEditMode(false);
    setEditingLocationId("");
  };

  const handleEdit = (location: any) => {
    setEditMode(true);
    setEditingLocationId(location.id);

    storageLocationsForm.reset({
      yourName: location.name,
      consigneeName: location.consigneeName || "",
      location: location.location,
      to: "",
      country: location.country,
      state: location.state,
      postalCode: location.zipCode,
    });
  };

  const onSubmit = async (data: StorageLocationSchemsData) => {
    if (id) {
      const payload = editMode
        ? {
            data: {
              id: editingLocationId,
              name: data.yourName,
              consigneeName: data.consigneeName,
              location: data.location,
              zipCode: data.postalCode,
              state: data.state,
              country: data.country,
              to: data.to,
            },
            id: id,
            LocationType: "STORAGE",
          }
        : {
            data: {
              name: data.yourName,
              consigneeName: data.consigneeName,
              location: data.location,
              zipCode: data.postalCode,
              state: data.state,
              country: data.country,
              to: data.to,
            },
            id: id,
            LocationType: "STORAGE",
          };

      saveLocationMutation(payload, {
        onSuccess: ({ data }) => {
          if (editMode) {
            setSavedLocations((prev: any) =>
              prev.map((loc: any) =>
                loc.id === editingLocationId
                  ? {
                      ...loc,
                      name: data.name,
                      consigneeName: data.consigneeName,
                      location: data.location,
                      country: data.country,
                      state: data.state,
                      zipCode: data.zipCode,
                      to: data.to,
                    }
                  : loc,
              ),
            );
          } else {
            const newLocation = {
              id: data.id,
              name: data.name,
              consigneeName: data.consigneeName,
              location: data.location,
              country: data.country,
              state: data.state,
              zipCode: data.zipCode,
              type: data.type,
              to: data.to,
            };
            setSavedLocations((prev: any) => [newLocation, ...prev]);
          }

          resetForm();
          setChangeText(true);
          onFormCompletion(true);
        },
      });
    }
  };

  const handleDeleteLocation = (locationId: string) => {
    // if (savedLocations.length <= 1) {
    //   showErrorToastMessage("At least one location is required.");
    //   return;
    // }

    deleteLocationMutation(locationId, {
      onSuccess: () => {
        setSavedLocations((prev: any) =>
          prev.filter((location: any) => location.id !== locationId),
        );
      },
    });
  };

  const handleSuggestionClick = useCallback(
    (placeId?: string) => {
      if (placeId) {
        getPlaceMutate({ placeId });
      } else {
        setShowSuggestions(false);
      }
    },
    [getPlaceMutate],
  );

  // Debounced Search Logic
  const debouncedResults = useMemo(() => {
    return debounce((value: string) => {
      getLocationMutate({ place: value });
    }, 500);
  }, [getLocationMutate]);

  const { popoverRef, popoverWidth } = usePopoverWidth();
  // Add this ref to the component
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Add this useEffect hook to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <Form {...storageLocationsForm}>
        <div id="storage-location">
          <div className="bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] mb-6 p-5">
            <div className="flex justify-between items-center pb-5">
              <h2 className="text-xl font-semibold">Storage Location</h2>
              <div className="flex gap-4">
                <div
                  className={`ml-2 text-[14px] font-semibold leading-normal ${
                    isCompleted ? "text-green-600" : "text-[#312C63]"
                  }`}
                >
                  {isCompleted ? "Completed" : "Incomplete"}
                </div>
                <p className="text-sm text-gray-500">
                  {savedLocations.length}/5 Locations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={storageLocationsForm.control}
                name="yourName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Your Name"
                      disabled={readOnly}
                      className={`h-[52px] ${
                        storageLocationsForm.formState.errors.yourName
                          ? "border-red-500"
                          : "bg-[#FBFBFB]"
                      }`}
                    />
                    {storageLocationsForm.formState.errors.yourName && (
                      <p className="text-red-500 text-xs">
                        {storageLocationsForm.formState.errors.yourName.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={storageLocationsForm.control}
                name="consigneeName"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Consignee Name"
                      disabled={readOnly}
                      className={`h-[52px] ${
                        storageLocationsForm.formState.errors.consigneeName
                          ? "border-red-500"
                          : "bg-[#FBFBFB]"
                      }`}
                    />
                    {storageLocationsForm.formState.errors.consigneeName && (
                      <p className="text-red-500 text-xs">
                        {
                          storageLocationsForm.formState.errors.consigneeName
                            .message
                        }
                      </p>
                    )}
                  </div>
                )}
              />

              <FormField
                control={storageLocationsForm.control}
                name="location"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      onInput={(e) =>
                        debouncedResults((e.target as HTMLInputElement).value)
                      }
                      placeholder="Enter Location"
                      disabled={readOnly}
                      className={`h-[52px] ${
                        storageLocationsForm.formState.errors.location
                          ? "border-red-500"
                          : "bg-[#FBFBFB]"
                      }`}
                    />
                    {storageLocationsForm.formState.errors.location && (
                      <p className="text-red-500 text-xs">
                        {storageLocationsForm.formState.errors.location.message}
                      </p>
                    )}
                    {showSuggestions && predictionResults.length > 0 && (
                      <ul
                        ref={dropdownRef}
                        className="custom-list shadow-lg border border-[#efefef] p-3 flex-col justify-start rounded-lg"
                      >
                        {/* <li
                          className="custom-list-item cursor-pointer hover:bg-[#fbfbfb]  text-[14px]"
                          onClick={() => handleSuggestionClick()}
                        >
                          {storageLocationsForm.watch("location")}
                        </li> */}
                        {predictionResults.map(({ place_id, description }) => {
                          return (
                            <li
                              key={place_id}
                              className="custom-list-item cursor-pointer hover:bg-[#fbfbfb] flex justify-start items-center gap-2 border-b py-2 text-[14px]"
                              onClick={() => handleSuggestionClick(place_id)}
                            >
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_334_616)">
                                  <path
                                    opacity="0.5"
                                    d="M6.99984 3.5C6.53835 3.5 6.08722 3.63685 5.70351 3.89324C5.31979 4.14963 5.02072 4.51404 4.84412 4.94041C4.66751 5.36677 4.62131 5.83592 4.71134 6.28854C4.80137 6.74117 5.0236 7.15693 5.34992 7.48325C5.67625 7.80957 6.09201 8.0318 6.54463 8.12183C6.99725 8.21186 7.46641 8.16566 7.89277 7.98905C8.31913 7.81245 8.68354 7.51338 8.93993 7.12966C9.19632 6.74595 9.33317 6.29482 9.33317 5.83333C9.33317 5.21449 9.08734 4.621 8.64975 4.18342C8.21217 3.74583 7.61868 3.5 6.99984 3.5ZM6.99984 7C6.76909 7 6.54353 6.93158 6.35167 6.80338C6.15982 6.67519 6.01028 6.49298 5.92198 6.2798C5.83368 6.06662 5.81057 5.83204 5.85559 5.60573C5.90061 5.37942 6.01172 5.17154 6.17488 5.00838C6.33804 4.84521 6.54592 4.7341 6.77223 4.68908C6.99854 4.64407 7.23312 4.66717 7.4463 4.75547C7.65948 4.84378 7.84169 4.99331 7.96989 5.18517C8.09808 5.37703 8.16651 5.60259 8.16651 5.83333C8.16651 6.14275 8.04359 6.4395 7.8248 6.65829C7.606 6.87708 7.30926 7 6.99984 7Z"
                                    fill="#080808"
                                  />
                                  <path
                                    opacity="0.5"
                                    d="M7.00018 13.9999C6.50898 14.0025 6.02433 13.8873 5.5868 13.664C5.14928 13.4407 4.77161 13.1158 4.48543 12.7166C2.26235 9.65003 1.13477 7.3447 1.13477 5.8642C1.13477 4.30859 1.75273 2.8167 2.85271 1.71672C3.95269 0.616741 5.44458 -0.0012207 7.00018 -0.0012207C8.55579 -0.0012207 10.0477 0.616741 11.1477 1.71672C12.2476 2.8167 12.8656 4.30859 12.8656 5.8642C12.8656 7.3447 11.738 9.65003 9.51493 12.7166C9.22875 13.1158 8.85109 13.4407 8.41356 13.664C7.97604 13.8873 7.49138 14.0025 7.00018 13.9999ZM7.00018 1.2722C5.78243 1.27359 4.61494 1.75795 3.75386 2.61904C2.89277 3.48012 2.40841 4.64761 2.40702 5.86536C2.40702 7.03786 3.51127 9.20611 5.5156 11.9705C5.68575 12.2049 5.90898 12.3957 6.16702 12.5272C6.42505 12.6587 6.71056 12.7273 7.00018 12.7273C7.28981 12.7273 7.57532 12.6587 7.83335 12.5272C8.09138 12.3957 8.31461 12.2049 8.48477 11.9705C10.4891 9.20611 11.5934 7.03786 11.5934 5.86536C11.592 4.64761 11.1076 3.48012 10.2465 2.61904C9.38542 1.75795 8.21794 1.27359 7.00018 1.2722Z"
                                    fill="#080808"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_334_616">
                                    <rect width="14" height="14" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              {description}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              />
              {/* <FormField
                control={storageLocationsForm.control}
                name="to"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Enter Full Location"
                      disabled={readOnly}
                      className={`h-[52px] bg-[#FBFBFB] ${
                        storageLocationsForm.formState.errors.location
                          ? "border-red04"
                          : ""
                      }`}
                    />
                    {storageLocationsForm.formState.errors.location && (
                      <p className="text-red-500 text-xs">
                        {storageLocationsForm.formState.errors.location.message}
                      </p>
                    )}
                  </div>
                )}
              /> */}
              <FormField
                control={storageLocationsForm.control}
                name="postalCode"
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Postal code / Zip code"
                      disabled={readOnly}
                      className={`h-[52px] ${
                        storageLocationsForm.formState.errors.postalCode
                          ? "border-red-500"
                          : "bg-[#FBFBFB]"
                      }`}
                    />
                    {storageLocationsForm.formState.errors.postalCode && (
                      <p className="text-red-500 text-xs">
                        {
                          storageLocationsForm.formState.errors.postalCode
                            .message
                        }
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={storageLocationsForm.control}
                name="country"
                render={({ field }) => (
                  <div className="space-y-2" ref={popoverRef}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={readOnly}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            countryList.find(
                              (country) => country.name === field.value,
                            )?.name
                          ) : (
                            <span className="text-[#122D4F99]">Country</span>
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="7"
                            viewBox="0 0 13 7"
                            fill="none"
                            className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                          >
                            <path
                              opacity="0.6"
                              d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                              fill="#122D4F"
                            />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        style={{ width: `${popoverWidth}px` }}
                      >
                        <Command>
                          <CommandInput placeholder="Search Country..." />
                          <CommandList>
                            <CommandEmpty>No Country found.</CommandEmpty>
                            <CommandGroup>
                              {countryList.map((country) => (
                                <CommandItem
                                  value={country.name}
                                  key={country.isoCode}
                                  onSelect={(e) => {
                                    storageLocationsForm.setValue("state", "");
                                    return field.onChange(e);
                                  }}
                                >
                                  {country.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      country.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {storageLocationsForm.formState.errors.country && (
                      <p className="text-red04/90 text-xs font-medium">
                        {storageLocationsForm.formState.errors.country.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={storageLocationsForm.control}
                name="state"
                render={({ field }) => (
                  <div className="space-y-2" ref={popoverRef}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={readOnly}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "h-[52px] w-full items-center justify-between whitespace-nowrap rounded-md border border-[rgba(18,45,79,0.06)] bg-[#FBFBFB] px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-[#122D4F99] focus:outline-none focus:ring-0 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-[#122D4F] font-medium hover:border-blueDark4F/[6%] focus:!outline-0 hover:text-blueDark4F group",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            stateList.find(
                              (state) => state.name === field.value,
                            )?.name
                          ) : (
                            <span className="text-[#122D4F99]">State</span>
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="7"
                            viewBox="0 0 13 7"
                            fill="none"
                            className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                          >
                            <path
                              opacity="0.6"
                              d="M12.73 0.861058C12.6437 0.782894 12.541 0.720854 12.4279 0.678516C12.3147 0.636177 12.1934 0.61438 12.0708 0.61438C11.9482 0.61438 11.8269 0.636177 11.7137 0.678516C11.6006 0.720854 11.4979 0.782894 11.4116 0.861058L7.15921 4.68051C7.0729 4.75867 6.97021 4.82071 6.85707 4.86305C6.74392 4.90539 6.62257 4.92719 6.5 4.92719C6.37743 4.92719 6.25608 4.90539 6.14293 4.86305C6.02979 4.82071 5.9271 4.75867 5.84079 4.68051L1.58841 0.861058C1.5021 0.782894 1.39941 0.720854 1.28627 0.678516C1.17313 0.636177 1.05177 0.61438 0.929202 0.61438C0.806633 0.61438 0.685278 0.636177 0.572136 0.678516C0.458993 0.720854 0.356304 0.782894 0.269991 0.861058C0.0970633 1.01731 0 1.22867 0 1.44899C0 1.6693 0.0970633 1.88067 0.269991 2.03692L4.53165 5.86471C5.05392 6.33322 5.76187 6.59637 6.5 6.59637C7.23813 6.59637 7.94608 6.33322 8.46835 5.86471L12.73 2.03692C12.9029 1.88067 13 1.6693 13 1.44899C13 1.22867 12.9029 1.01731 12.73 0.861058Z"
                              fill="#122D4F"
                            />
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        style={{ width: `${popoverWidth}px` }}
                      >
                        <Command>
                          <CommandInput placeholder="search state" />
                          <CommandList>
                            <CommandEmpty>No State found.</CommandEmpty>
                            <CommandGroup>
                              {stateList.map((state) => (
                                <CommandItem
                                  value={state.name}
                                  key={state.isoCode}
                                  onSelect={field.onChange}
                                >
                                  {state.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      state.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {storageLocationsForm.formState.errors.state && (
                      <p className="text-red04/90 text-xs font-medium">
                        {storageLocationsForm.formState.errors.state.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex justify-end mt-5 lg:mt-10">
              <Button
                disabled={readOnly}
                type="button"
                variant="outlineHover"
                className="mr-2 capitalize text-sm font-semibold leading-normal px-8 py-[8.5px] h-auto max-w-[104px] w-full"
                onClick={resetForm}
                // disabled={readOnly}
              >
                Cancel
              </Button>
              <Button
                disabled={readOnly}
                type="button"
                variant="primary"
                onClick={storageLocationsForm.handleSubmit(onSubmit)}
                // disabled={(!editMode && savedLocations.length >= 5) || readOnly}
                className={`capitalize text-sm font-semibold leading-normal px-8 py-[8.5px] h-auto max-w-[104px] w-full ${
                  !editMode && savedLocations.length >= 5
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#1B2B65] text-[#F7F9FC]"
                }`}
              >
                {editMode ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
      {savedLocations.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-[0px_0px_13px_5px_rgba(0,0,0,0.05)] p-5">
          <div className="">
            <h3 className="text-lg font-semibold mb-5">
              Saved Storage Locations
            </h3>
            {/* {savedLocations.map((location: any) => (
              <div
                key={location.id}
                className="grid grid-cols-1 md:grid-cols-2 border-b py-3 last:border-b-0 gap-6"
              >
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {location.name}
                </label>
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {location.location}
                </label>
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {location.state}
                </label>
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {location.country}
                </label>
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {" "}
                  {location.consigneeName}
                </label>
                <label className="bg-[#fbfbfb] h-[52px] justify-center items-center flex w-full rounded-md border border-[#122D4F0F] bg-transparent px-3 py-1  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                  {" "}
                  {location.to && `To: ${location.to}`}, {location.zipCode}
                </label>

                <div className="flex justify-end px-5 pt-[5px] pb-5 col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleEdit(location)}
                    disabled={
                      (editMode && editingLocationId !== location.id) ||
                      readOnly
                    }
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteLocation(location.id as string)}
                    disabled={savedLocations.length <= 1 || readOnly}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))} */}

            <div className="no-scrollbar overflow-x-auto w-full">
              <table className="table-auto border-collapse w-full rounded-lg bg-[#F0F1F7]">
                <thead className="whitespace-nowrap">
                  <tr className="border-b">
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Name
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Consignee Name
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Full Location
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Country
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      State
                    </th>
                    <th className="text-left p-4 text-[#000] text-base font-bold leading-normal">
                      Postal Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedLocations.map((location: any) => (
                    <tr key={location.id} className="border-b last:border-b-0">
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.name}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.consigneeName}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.location}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.country}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.state}
                        </label>
                      </td>
                      <td className="p-4">
                        <label className="w-full p-1 bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-blueDark4F/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[#122D4F] text-[16px] font-medium leading-normal form-control">
                          {location.zipCode}
                        </label>
                      </td>
                      <td className="p-4">
                        {!readOnly && (
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => handleEdit(location)}
                              // disabled={
                              //   (editMode && editingLocationId !== location.id) ||
                              //   readOnly
                              // }
                              className="mr-2 p-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M1.8668 14.4048C1.47061 14.0314 1.28013 13.4676 1.3487 12.8581L1.63061 10.3895C1.68394 9.92477 1.96584 9.30762 2.29346 8.97238L8.5487 2.35143C10.1106 0.698099 11.7411 0.652385 13.3944 2.21429C15.0477 3.77619 15.0935 5.40667 13.5316 7.06L7.27632 13.681C6.95632 14.0238 6.36203 14.3438 5.89727 14.42L3.44394 14.8391C3.31441 14.8467 3.20013 14.8619 3.07822 14.8619C2.61346 14.8619 2.17918 14.7019 1.8668 14.4048ZM9.37918 3.12096L3.12394 9.74953C2.97156 9.90953 2.79632 10.2905 2.76584 10.5114L2.48394 12.98C2.45346 13.2314 2.51442 13.4371 2.65156 13.5667C2.7887 13.6962 2.99442 13.7419 3.24584 13.7038L5.69918 13.2848C5.92013 13.2467 6.28584 13.0486 6.43822 12.8886L12.6935 6.26762C13.6382 5.26191 13.9811 4.33238 12.602 3.03715C11.9925 2.45048 11.4668 2.20667 10.9944 2.20667C10.4077 2.20667 9.89727 2.57238 9.37918 3.12096Z"
                                  fill="#333"
                                />
                                <path
                                  d="M12.0154 8.33279C9.63826 8.0966 7.72588 6.29089 7.36017 3.92898C7.31445 3.6166 7.52779 3.32708 7.84017 3.27374C8.15255 3.22803 8.44207 3.44136 8.49541 3.75374C8.78493 5.59755 10.2783 7.0147 12.1373 7.19755C12.4497 7.22803 12.6783 7.50993 12.6478 7.82231C12.6097 8.11184 12.3583 8.33279 12.0687 8.33279C12.0535 8.33279 12.0306 8.33279 12.0154 8.33279Z"
                                  fill="#333"
                                />
                              </svg>
                            </Button>
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => handleDeleteLocation(location.id)}
                              disabled={editingLocationId === location.id}
                              className="p-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="cursor-pointer"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                  fill="#FF5C5C"
                                />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
