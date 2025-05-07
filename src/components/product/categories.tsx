"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 124,
    link: "/category/electronics",
  },
  {
    id: 2,
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 237,
    link: "/category/clothing",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 156,
    link: "/category/home-kitchen",
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 98,
    link: "/category/beauty-personal-care",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 112,
    link: "/category/sports-outdoors",
  },
  {
    id: 6,
    name: "Toys & Games",
    image: "/placeholder.svg?height=300&width=300",
    itemCount: 87,
    link: "/category/toys-games",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Categories() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="py-16"
    >
      <motion.div
        variants={item}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-blue-800">Shop by Category</h2>
        <Button
          variant="outline"
          asChild
          className="border-blue-800 text-blue-800 hover:bg-blue-50"
        >
          <Link href="/categories">View All</Link>
        </Button>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link href={category.link} className="group block">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-blue-700/30 flex flex-col items-center justify-center text-white p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm">{category.itemCount} items</p>
                </div>
              </div>
              <h3 className="mt-2 font-medium text-center md:text-left">
                {category.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
