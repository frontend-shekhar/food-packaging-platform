"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";

const slides = [
  {
    image: "/images/slide1.png",
    title: "Your mining hub:",
    subtitle: "All in one platform for every need!",
  },
  {
    image: "/images/slide1.png",
    title: "Your mining hub:",
    subtitle: "All in one platform for every need!",
  },
  {
    image: "/images/slide1.png",
    title: "Your mining hub:",
    subtitle: "All in one platform for every need!",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-[310px] w-full overflow-hidden  py-8 mt-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover brightness-80"
            />
            <div className="absolute bottom-[65px] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-2xl text-white">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-[40px] left-8 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-[5px] w-[36px]   rounded-[40px] opacity-90  ${
                currentSlide === index ? "bg-[#FF4D01] " : "bg-[#fff]"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
