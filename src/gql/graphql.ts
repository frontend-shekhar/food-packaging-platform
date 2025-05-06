/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  DestinationPlaceDynamicZoneDynamicZoneInput: { input: any; output: any };
  HotelDynamicZoneDynamicZoneInput: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  NavbarDynamicZoneDynamicZoneInput: { input: any; output: any };
  PackageDynamicZoneDynamicZoneInput: { input: any; output: any };
  PackageItineraryDynamicZoneDynamicZoneInput: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]["input"]>;
  containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
  gt?: InputMaybe<Scalars["Boolean"]["input"]>;
  gte?: InputMaybe<Scalars["Boolean"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]["input"]>;
  lte?: InputMaybe<Scalars["Boolean"]["input"]>;
  ne?: InputMaybe<Scalars["Boolean"]["input"]>;
  nei?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ComponentCommonFaqAccordionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCommonFaqAccordionFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentCommonFaqAccordionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCommonFaqAccordionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentCommonWhyUsDetailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCommonWhyUsDetailFiltersInput>>>;
  not?: InputMaybe<ComponentCommonWhyUsDetailFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCommonWhyUsDetailFiltersInput>>>;
  subTitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentDestinationComponentActivityDetailFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentActivityDetailFiltersInput>>
  >;
  buttonLink?: InputMaybe<StringFilterInput>;
  buttonText?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  fromText?: InputMaybe<StringFilterInput>;
  isHorizontalCards?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentDestinationComponentActivityDetailFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentActivityDetailFiltersInput>>
  >;
  price?: InputMaybe<StringFilterInput>;
  subTitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentDestinationComponentClientTestimonialCardFiltersInput = {
  and?: InputMaybe<
    Array<
      InputMaybe<ComponentDestinationComponentClientTestimonialCardFiltersInput>
    >
  >;
  clientName?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDestinationComponentClientTestimonialCardFiltersInput>;
  or?: InputMaybe<
    Array<
      InputMaybe<ComponentDestinationComponentClientTestimonialCardFiltersInput>
    >
  >;
  rattingNumbers?: InputMaybe<StringFilterInput>;
};

export type ComponentDestinationComponentVisitDetailsFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentVisitDetailsFiltersInput>>
  >;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDestinationComponentVisitDetailsFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentVisitDetailsFiltersInput>>
  >;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentDestinationComponentVisitGuideCardsFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentVisitGuideCardsFiltersInput>>
  >;
  buttonLink?: InputMaybe<StringFilterInput>;
  buttonText?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDestinationComponentVisitGuideCardsFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentDestinationComponentVisitGuideCardsFiltersInput>>
  >;
  visitMonth?: InputMaybe<StringFilterInput>;
};

export type ComponentElementActivityInformationFiltersInput = {
  activityDescription?: InputMaybe<StringFilterInput>;
  activityLocation?: InputMaybe<StringFilterInput>;
  activityTitle?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementActivityInformationFiltersInput>>
  >;
  not?: InputMaybe<ComponentElementActivityInformationFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementActivityInformationFiltersInput>>
  >;
};

export type ComponentElementBreadcrumbItemFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementBreadcrumbItemFiltersInput>>
  >;
  not?: InputMaybe<ComponentElementBreadcrumbItemFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementBreadcrumbItemFiltersInput>>
  >;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentElementImageComponentFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementImageComponentFiltersInput>>
  >;
  not?: InputMaybe<ComponentElementImageComponentFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementImageComponentFiltersInput>>
  >;
};

export type ComponentElementOfferItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentElementOfferItemFiltersInput>>>;
  not?: InputMaybe<ComponentElementOfferItemFiltersInput>;
  offerInformation?: InputMaybe<StringFilterInput>;
  offerTitle?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentElementOfferItemFiltersInput>>>;
};

export type ComponentElementVisitTimingGuideFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentElementVisitTimingGuideFiltersInput>>
  >;
  month?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentElementVisitTimingGuideFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentElementVisitTimingGuideFiltersInput>>
  >;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentFooterComponentFooterCopyFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentFooterCopyFiltersInput>>
  >;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentFooterComponentFooterCopyFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentFooterCopyFiltersInput>>
  >;
};

export type ComponentFooterComponentFooterCopyInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  link?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentHolidayPlacesInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  placesName?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentPlacesNameInput>>
  >;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentLinksDetailInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  links?: InputMaybe<Array<InputMaybe<ComponentFooterComponentLinksInput>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentLinksFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentLinksFiltersInput>>
  >;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentFooterComponentLinksFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentFooterComponentLinksFiltersInput>>>;
};

export type ComponentFooterComponentLinksInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  link?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentNewsletterInput = {
  buttonLink?: InputMaybe<Scalars["String"]["input"]>;
  buttonText?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  subTitle?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentPlacesNameFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentPlacesNameFiltersInput>>
  >;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentFooterComponentPlacesNameFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentPlacesNameFiltersInput>>
  >;
};

export type ComponentFooterComponentPlacesNameInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  link?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentSocialIconsFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentSocialIconsFiltersInput>>
  >;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentFooterComponentSocialIconsFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentSocialIconsFiltersInput>>
  >;
};

export type ComponentFooterComponentSocialIconsInput = {
  icon?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  link?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentFooterComponentSocialLinksInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  socialIcons?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentSocialIconsInput>>
  >;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentNavbarComponentDetinationCountryFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentNavbarComponentDetinationCountryFiltersInput>>
  >;
  countryLink?: InputMaybe<StringFilterInput>;
  countryName?: InputMaybe<StringFilterInput>;
  ctaButtonLink?: InputMaybe<StringFilterInput>;
  ctaButtonText?: InputMaybe<StringFilterInput>;
  ctaDescription?: InputMaybe<StringFilterInput>;
  ctaTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentNavbarComponentDetinationCountryFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentNavbarComponentDetinationCountryFiltersInput>>
  >;
};

export type ComponentNavbarComponentHolidayTypesDetailFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentNavbarComponentHolidayTypesDetailFiltersInput>>
  >;
  holidays_types_details?: InputMaybe<HolidaysTypesDetailFiltersInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentNavbarComponentHolidayTypesDetailFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentNavbarComponentHolidayTypesDetailFiltersInput>>
  >;
};

export type ComponentPackageElementActivityDataFiltersInput = {
  activity?: InputMaybe<ComponentElementActivityInformationFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentPackageElementActivityDataFiltersInput>>
  >;
  not?: InputMaybe<ComponentPackageElementActivityDataFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentPackageElementActivityDataFiltersInput>>
  >;
  subTitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPackageElementPackageInformationFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentPackageElementPackageInformationFiltersInput>>
  >;
  information?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPackageElementPackageInformationFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentPackageElementPackageInformationFiltersInput>>
  >;
};

export type ComponentPriceGuideElementPackagePricingFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentPriceGuideElementPackagePricingFiltersInput>>
  >;
  buttonLink?: InputMaybe<StringFilterInput>;
  buttonText?: InputMaybe<StringFilterInput>;
  deposit?: InputMaybe<StringFilterInput>;
  month?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPriceGuideElementPackagePricingFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentPriceGuideElementPackagePricingFiltersInput>>
  >;
  price?: InputMaybe<StringFilterInput>;
};

export type ComponentSharedMetaSocialFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSharedMetaSocialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialFiltersInput>>>;
  socialNetwork?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSharedMetaSocialInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  image?: InputMaybe<Scalars["ID"]["input"]>;
  socialNetwork?: InputMaybe<Enum_Componentsharedmetasocial_Socialnetwork>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentSharedScriptElementFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSharedScriptElementFiltersInput>>>;
  not?: InputMaybe<ComponentSharedScriptElementFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSharedScriptElementFiltersInput>>>;
  scriptInformation?: InputMaybe<StringFilterInput>;
  scriptTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentSharedScriptElementInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  scriptInformation?: InputMaybe<Scalars["String"]["input"]>;
  scriptTitle?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentSharedSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSharedSeoFiltersInput>>>;
  canonicalURL?: InputMaybe<StringFilterInput>;
  keywords?: InputMaybe<StringFilterInput>;
  metaDescription?: InputMaybe<StringFilterInput>;
  metaRobots?: InputMaybe<StringFilterInput>;
  metaSocial?: InputMaybe<ComponentSharedMetaSocialFiltersInput>;
  metaTitle?: InputMaybe<StringFilterInput>;
  metaViewport?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSharedSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSharedSeoFiltersInput>>>;
  scripts?: InputMaybe<ComponentSharedScriptElementFiltersInput>;
};

export type ComponentSharedSeoInput = {
  canonicalURL?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  keywords?: InputMaybe<Scalars["String"]["input"]>;
  metaDescription?: InputMaybe<Scalars["String"]["input"]>;
  metaImage?: InputMaybe<Scalars["ID"]["input"]>;
  metaRobots?: InputMaybe<Scalars["String"]["input"]>;
  metaSocial?: InputMaybe<Array<InputMaybe<ComponentSharedMetaSocialInput>>>;
  metaTitle?: InputMaybe<Scalars["String"]["input"]>;
  metaViewport?: InputMaybe<Scalars["String"]["input"]>;
  scripts?: InputMaybe<Array<InputMaybe<ComponentSharedScriptElementInput>>>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  ne?: InputMaybe<Scalars["DateTime"]["input"]>;
  nei?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DestinationAreaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DestinationAreaFiltersInput>>>;
  areaName?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  destination?: InputMaybe<DestinationPlaceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DestinationAreaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DestinationAreaFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DestinationAreaInput = {
  areaName?: InputMaybe<Scalars["String"]["input"]>;
  destination?: InputMaybe<Scalars["ID"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DestinationPlaceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DestinationPlaceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  destinationTitle?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DestinationPlaceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DestinationPlaceFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DestinationPlaceInput = {
  destinationTitle?: InputMaybe<Scalars["String"]["input"]>;
  dynamicZone?: InputMaybe<
    Array<Scalars["DestinationPlaceDynamicZoneDynamicZoneInput"]["input"]>
  >;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type DestinationTabFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DestinationTabFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<DestinationTabFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DestinationTabFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DestinationTabInput = {
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Enum_Componentelementvisittimingguide_Type {
  Average = "Average",
  Best = "Best",
  Good = "Good",
}

export enum Enum_Componentsharedmetasocial_Socialnetwork {
  Facebook = "Facebook",
  Twitter = "Twitter",
}

export enum Enum_Pagetype_Pagetype {
  Destination = "Destination",
  Hotel = "Hotel",
  Package = "Package",
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  contains?: InputMaybe<Scalars["Float"]["input"]>;
  containsi?: InputMaybe<Scalars["Float"]["input"]>;
  endsWith?: InputMaybe<Scalars["Float"]["input"]>;
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  eqi?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  ne?: InputMaybe<Scalars["Float"]["input"]>;
  nei?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type FooterInput = {
  companyLogo?: InputMaybe<Scalars["ID"]["input"]>;
  copyrightText?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  footerCopy?: InputMaybe<
    Array<InputMaybe<ComponentFooterComponentFooterCopyInput>>
  >;
  holidayPlaces?: InputMaybe<ComponentFooterComponentHolidayPlacesInput>;
  linkDetail?: InputMaybe<ComponentFooterComponentLinksDetailInput>;
  newsletter?: InputMaybe<ComponentFooterComponentNewsletterInput>;
  socialLinks?: InputMaybe<ComponentFooterComponentSocialLinksInput>;
};

export type HolidaysTypesDetailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HolidaysTypesDetailFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<HolidaysTypesDetailFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HolidaysTypesDetailFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HolidaysTypesDetailInput = {
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type HotelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HotelFiltersInput>>>;
  area?: InputMaybe<DestinationAreaFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  destination?: InputMaybe<DestinationPlaceFiltersInput>;
  hotelGrades?: InputMaybe<HotelGradeFiltersInput>;
  hotelTypes?: InputMaybe<HotelTypeFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<StringFilterInput>;
  longitude?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<HotelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HotelFiltersInput>>>;
  ppActualPrice?: InputMaybe<IntFilterInput>;
  ppOfferedPrice?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seoData?: InputMaybe<ComponentSharedSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HotelGradeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HotelGradeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  grade?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<HotelGradeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HotelGradeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HotelGradeInput = {
  grade?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type HotelInput = {
  area?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  destination?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  dynamicZone?: InputMaybe<
    Array<Scalars["HotelDynamicZoneDynamicZoneInput"]["input"]>
  >;
  hotelGrades?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  hotelTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  latitude?: InputMaybe<Scalars["String"]["input"]>;
  longitude?: InputMaybe<Scalars["String"]["input"]>;
  ppActualPrice?: InputMaybe<Scalars["Int"]["input"]>;
  ppOfferedPrice?: InputMaybe<Scalars["Int"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  seoData?: InputMaybe<ComponentSharedSeoInput>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailImage?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type HotelTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HotelTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<HotelTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HotelTypeFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HotelTypeInput = {
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  containsi?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  eqi?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  ne?: InputMaybe<Scalars["ID"]["input"]>;
  nei?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]["input"]>;
  notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  containsi?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  eqi?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  nei?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  contains?: InputMaybe<Scalars["JSON"]["input"]>;
  containsi?: InputMaybe<Scalars["JSON"]["input"]>;
  endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
  eq?: InputMaybe<Scalars["JSON"]["input"]>;
  eqi?: InputMaybe<Scalars["JSON"]["input"]>;
  gt?: InputMaybe<Scalars["JSON"]["input"]>;
  gte?: InputMaybe<Scalars["JSON"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  lt?: InputMaybe<Scalars["JSON"]["input"]>;
  lte?: InputMaybe<Scalars["JSON"]["input"]>;
  ne?: InputMaybe<Scalars["JSON"]["input"]>;
  nei?: InputMaybe<Scalars["JSON"]["input"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]["input"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type NavbarInput = {
  companyLogo?: InputMaybe<Scalars["ID"]["input"]>;
  dynamicZone?: InputMaybe<
    Array<Scalars["NavbarDynamicZoneDynamicZoneInput"]["input"]>
  >;
  quoteRequestLink?: InputMaybe<Scalars["String"]["input"]>;
  quoteRequestLogo?: InputMaybe<Scalars["ID"]["input"]>;
  quoteRequestText?: InputMaybe<Scalars["String"]["input"]>;
};

export type NewsletterSubscriptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NewsletterSubscriptionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<NewsletterSubscriptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewsletterSubscriptionFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NewsletterSubscriptionInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type PackageCategorieFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PackageCategorieFiltersInput>>>;
  categoryTitle?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PackageCategorieFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PackageCategorieFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PackageCategorieInput = {
  categoryTitle?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type PackageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PackageFiltersInput>>>;
  area?: InputMaybe<DestinationAreaFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  daysDuration?: InputMaybe<IntFilterInput>;
  destination?: InputMaybe<DestinationPlaceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  nightsDuration?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<PackageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PackageFiltersInput>>>;
  package_categories?: InputMaybe<PackageCategorieFiltersInput>;
  ppActualPrice?: InputMaybe<IntFilterInput>;
  ppOfferedPrice?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seoData?: InputMaybe<ComponentSharedSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PackageInput = {
  area?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  daysDuration?: InputMaybe<Scalars["Int"]["input"]>;
  destination?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  dynamicZone?: InputMaybe<
    Array<Scalars["PackageDynamicZoneDynamicZoneInput"]["input"]>
  >;
  nightsDuration?: InputMaybe<Scalars["Int"]["input"]>;
  package_categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  ppActualPrice?: InputMaybe<Scalars["Int"]["input"]>;
  ppOfferedPrice?: InputMaybe<Scalars["Int"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  seoData?: InputMaybe<ComponentSharedSeoInput>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailImage?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type PackageItineraryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PackageItineraryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PackageItineraryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PackageItineraryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PackageItineraryInput = {
  dynamicZone?: InputMaybe<
    Array<Scalars["PackageItineraryDynamicZoneDynamicZoneInput"]["input"]>
  >;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type PageTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PageTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageTypeFiltersInput>>>;
  pageType?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageTypeInput = {
  pageType?: InputMaybe<Enum_Pagetype_Pagetype>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type RegionTabFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RegionTabFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<RegionTabFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RegionTabFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RegionTabInput = {
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  containsi?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  eqi?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  nei?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]["input"]>;
  notContainsi?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  ext?: InputMaybe<Scalars["String"]["input"]>;
  folder?: InputMaybe<Scalars["ID"]["input"]>;
  folderPath?: InputMaybe<Scalars["String"]["input"]>;
  formats?: InputMaybe<Scalars["JSON"]["input"]>;
  hash?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  mime?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  previewUrl?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  size?: InputMaybe<Scalars["Float"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  parent?: InputMaybe<Scalars["ID"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  pathId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  provider?: Scalars["String"]["input"];
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  confirmationToken?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["ID"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type PageTypeQueryVariables = Exact<{
  slug?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type PageTypeQuery = {
  __typename?: "Query";
  pageTypes?: {
    __typename?: "PageTypeEntityResponseCollection";
    data: Array<{
      __typename?: "PageTypeEntity";
      attributes?: {
        __typename?: "PageType";
        slug?: string | null;
        pageType?: Enum_Pagetype_Pagetype | null;
      } | null;
    }>;
  } | null;
};

export const PageTypeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "pageType" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pageTypes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "slug" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "slug" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attributes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "slug" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pageType" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PageTypeQuery, PageTypeQueryVariables>;
