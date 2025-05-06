"use client";

import React, { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Slash, Star, Shield, MapPin, Building2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  arrow,
  diamond,
  map,
  product,
  returnBack,
  seller,
} from "../../../public/images";
import { ButtonComponent } from "../common/ButtonComponent";
import Link from "next/link";

const productImages = [product, diamond, product, diamond, product, diamond];

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  active?: boolean;
  seller: {
    name: string;
    rating: number;
    totalRatings: number;
    isCertified: boolean;
  };
  images: ProductImage[];
}

function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageHover = (event: MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      setZoomPosition({ x, y });
    }
  };
  return (
    <>
      <section className="bg-white py-4 px-10 border-b border-r border-[#F6F6F6] rounded-b-xl">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity transition-all duration-500 hover:opacity-100"
                  href="/"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity transition-all duration-500 hover:opacity-100"
                  href="/"
                >
                  loreume
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity transition-all duration-500 hover:opacity-100"
                  href="/"
                >
                  ipsum
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="text-xs font-medium text-[#1E1E1E] leading-normal opacity-50 mix-blend-luminosity" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-medium text-[#1E1E1E] leading-normal mix-blend-luminosity">
                  loreume
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
            <div className="lg:col-span-9 col-span-1">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-5">
                {/* Image Gallery */}
                <div className="md:col-span-6 col-span-1">
                  <div className="flex md:flex-row flex-col gap-5">
                    <div className="flex md:flex-col flex-row md:justify-start justify-center gap-3">
                      {productImages.map((image, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`rounded mix-blend-luminosity flex items-center justify-center w-[50px] h-[50px] bg-[#f2f2f2] overflow-hidden border border-transparent transition-all duration-500 ${
                            selectedImage === i
                              ? "border-black/50"
                              : "hover:opacity-60"
                          }`}
                        >
                          <Image
                            src={image || product}
                            alt={`Product view ${i + 1}`}
                            width={40}
                            height={40}
                            className="aspect-square object-cover max-w-10 max-h-10 rounded-[4px]"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                      <div
                        className="flex-1 relative bg-white rounded-[8px] shadow-[0_2px_8px_0_rgba(0, 0, 0, 0.05)] border border-[#F0F2F8] p-6 h-full flex justify-center items-center"
                        onMouseEnter={() => setShowZoom(true)}
                        onMouseLeave={() => setShowZoom(false)}
                        onMouseMove={handleImageHover}
                        ref={imageRef}
                      >
                        <div className="max-h-[303px] max-w-[319px] w-full">
                          <Image
                            src={productImages[selectedImage] || diamond}
                            alt="Main product image"
                            width={319}
                            height={303}
                            className="w-full aspect-square object-cover max-h-[303px]"
                            priority
                          />
                        </div>
                        {showZoom && (
                          <div
                            className="absolute left-0 top-0 w-full h-full rounded-[8px] overflow-hidden border border-black/20 shadow-lg z-[2]"
                            style={{
                              backgroundImage: `url(${productImages[selectedImage]})`,
                              backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                              backgroundSize: "200%",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        )}
                      </div>
                      <ButtonComponent
                        variant="primary"
                        className="w-full bg-[#2D2D2D] rounded text-sm leading-normal"
                      >
                        Inquire Now
                      </ButtonComponent>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:col-span-6 col-span-1">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[#1E1E1E] md:text-base text-sm font-semibold md:leading-normal opacity-50 mix-blend-luminosity">
                        Certified Seller
                      </h4>
                      <div className="flex flex-col gap-[2px]">
                        <h3 className="text-[#1E1E1E] md:text-xl text-base font-semibold md:leading-normal">
                          loruume ipsum - loruime ipsun
                        </h3>
                        <span className="block text-xs font-medium leading-normal text-[#979797] opacity-70">
                          Lead Time 30 - 45 Days
                        </span>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <div className="flex items-center gap-[2px]">
                          <h6 className="text-[#7E859B] text-[8px] font-bold leading-3">
                            5.0
                          </h6>
                          <div className="flex">
                            <Star className="w-3 h-3 fill-[#7E859B] stroke-none" />
                            {/* <Star className="w-3 h-3 fill-[#7E859B] stroke-none" />
                            <Star className="w-3 h-3 fill-[#7E859B] stroke-none" />
                            <Star className="w-3 h-3 fill-[#7E859B] stroke-none" />
                            <Star className="w-3 h-3 fill-[#7E859B] stroke-none" /> */}
                          </div>
                        </div>
                        <span className="text-sm text-[#9BA0B1]">(1)</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pb-3 border-b border-[#F6F6F6]">
                      <div className="bg-[#F6F6F6] rounded p-3 flex flex-col gap-[2px]">
                        <h4 className="md:text-xl text-base md:leading-normal font-semibold text-[#1E1E1E]">
                          US$ 1000{" "}
                          <span className="text-xs font-medium leading-normal opacity-30">
                            /&nbsp;1&nbsp;kg
                          </span>
                        </h4>
                        <span className="block text-xs text-[#979797] opacity-70 font-medium leading-normal">
                          500 Kg Minimum Order
                        </span>
                      </div>
                      <p className="text-[#1E1E1E] text-xs font-medium leading-normal">
                        We offer samples, with sample costs, shipping and taxes
                        paid by the buyer.
                      </p>
                    </div>
                    <div className="max-w-[435px] w-full mix-blend-luminosity pt-1">
                      <Image
                        src={map}
                        alt="map"
                        className="max-h-[105px] mix-blend-luminosity"
                      />
                    </div>
                    {/* <Card className="py-3 px-[14px] border-0 shadow-none">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">Mineramix warehouse</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">You</span>
                        </div>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1/2 bg-primary rounded-full" />
                      </div>
                    </Card> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 col-span-1">
              <div className="lg:border-l lg:border-t-0 border-t border-[#F0F2F8] h-full flex flex-col gap-2 lg:pl-3 lg:pt-0 pt-3">
                <div className="flex items-center gap-3">
                  <em className="min-w-6 inline-block leading-[0]">
                    <Image
                      src={returnBack}
                      alt="return"
                      className="mix-blend-luminosity"
                    />
                  </em>
                  <p className="text-xs font-medium leading-normal mix-blend-luminosity text-[#979797] opacity-70 max-w-[188px] w-full">
                    This item cannot be exchanged or returned
                  </p>
                </div>
                <div className="p-3 rounded bg-[#F6F6F6] flex items-center gap-2">
                  <em className="flex items-center justify-center w-[37px] h-[37px] rounded-full bg-[#F0F2F8] leading-[0]">
                    <Image
                      src={seller}
                      alt="seller"
                      className="mix-blend-luminosity"
                    />
                  </em>
                  <div className="flex items-center justify-between gap-[9px] max-w-[calc(100%-45px)] w-full">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-medium leading-normal text-[#1E1E1E]">
                        Sold by{" "}
                        <Link
                          href={"/"}
                          className="font-bold underline transition-all duration-500 hover:text-black"
                        >
                          Mineremix
                        </Link>
                      </h4>
                      <p className="text-[#1E1E1E] text-[10px] font-medium leading-normal mix-blend-luminosity opacity-60">
                        55 Buyer rated Mineramix
                      </p>
                    </div>
                    <button className="border-0 bg-transparent transition-all duration-500 hover:opacity-60">
                      <Image src={arrow} alt="arrow" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-[#F6F6F6]">
                  <p className="text-[#1E1E1E] text-[10px] font-medium leading-normal mix-blend-luminosity opacity-60">
                    Great Recent Rating
                  </p>
                  <button className="border-0 bg-transparent transition-all duration-500 hover:opacity-60">
                    <Image src={arrow} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductInfo;
