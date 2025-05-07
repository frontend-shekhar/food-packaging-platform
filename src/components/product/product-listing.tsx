"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Slim Fit Cotton T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Yoga Exercise Mat",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Sports & Outdoors",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Wireless Computer Mouse",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    rating: 4.1,
  },
  {
    id: 8,
    name: "Scented Soy Candle",
    price: 18.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home & Kitchen",
    rating: 4.8,
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

export default function ProductListing() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");

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

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <h2 className="text-3xl font-bold text-blue-800">Popular Products</h2>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] border-blue-200 focus:ring-blue-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            asChild
            className="ml-auto border-blue-800 text-blue-800 hover:bg-blue-50"
          >
            <Link href="/products">View All</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {sortedProducts.map((product) => (
          <motion.div key={product.id} variants={item}>
            <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 bg-gray-100">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
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

                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium">
                  ★ {product.rating}
                </div>
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
                <div className="mt-2">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
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
