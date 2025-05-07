"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import product from "./images/product-image.png";
// import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "/images/forgot.png",
    category: "Electronics",
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    price: 89.99,
    originalPrice: 129.99,
    image: "/images/forgot.png",
    category: "Accessories",
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "/images/forgot.png",
    category: "Electronics",
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    image: "/images/forgot.png",
    category: "Clothing",
    isNew: false,
    isSale: false,
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

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
      // toast({
      //   description: "Removed from wishlist",
      // })
    } else {
      setWishlist([...wishlist, id]);
      // toast({
      //   description: "Added to wishlist",
      // })
    }
  };

  const addToCart = (name: string) => {
    // toast({
    //   description: `${name} added to cart`,
    // })
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <motion.div
        variants={item}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-blue-800">Featured Products</h2>
        <Button
          variant="outline"
          asChild
          className="border-blue-800 text-blue-800 hover:bg-blue-50"
        >
          <Link href="/products">View All</Link>
        </Button>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {featuredProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 bg-gray-100">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 transform hover:scale-110 duration-200"
                  aria-label={
                    wishlist.includes(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-orange-500 text-orange-500" : "text-gray-600"}`}
                  />
                </button>

                {product.isNew && (
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                    New
                  </Badge>
                )}

                {product.isSale && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                    Sale
                  </Badge>
                )}
              </div>

              <CardContent className="pt-4">
                <div className="text-sm text-blue-600 mb-1">
                  {product.category}
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="hover:underline"
                >
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-500 line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  onClick={() => addToCart(product.name)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-105 duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
