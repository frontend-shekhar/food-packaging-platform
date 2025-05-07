"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "AirPods Pro",
    subtitle: "Future Of Sound",
    description: "Trusted by 750,000+ customers",
    buttonText: "Shop Now",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/collections/audio",
  },
  {
    id: 2,
    title: "Smart Watches",
    subtitle: "Track Your Fitness",
    description: "The perfect companion for your active lifestyle",
    buttonText: "Explore",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/collections/watches",
  },
  {
    id: 3,
    title: "Premium Headphones",
    subtitle: "Immersive Audio",
    description: "Experience crystal clear sound quality",
    buttonText: "View Collection",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/collections/headphones",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAutoPlaying]);

  const handleSliderHover = (isHovering: boolean) => {
    setIsAutoPlaying(!isHovering);
  };

  return (
    <div
      className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700"
      onMouseEnter={() => handleSliderHover(true)}
      onMouseLeave={() => handleSliderHover(false)}
    >
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80 z-10" />
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <motion.div
                  className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-1 mb-4"
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-orange-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </motion.div>
                  <motion.p
                    className="text-sm md:text-base mb-2 opacity-90"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.h2
                    className="text-3xl md:text-5xl font-bold mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {slide.subtitle}
                  </motion.h2>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-blue-900 hover:bg-white/90 text-lg px-8 rounded-full"
                    >
                      <Link href={slide.link}>{slide.buttonText}</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-orange-500 w-16"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* <div
        className="absolute bottom-0 w-full h-16 bg-white"
        style={{
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
        }}
      /> */}
    </div>
  );
}
