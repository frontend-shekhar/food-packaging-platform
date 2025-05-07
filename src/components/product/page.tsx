// import { Toaster } from "@/components/ui/toaster"
import Navbar from "./navbar";
import { HeroSlider } from "@/components/landing/hero-slider";
import FeaturedProducts from "./featured-products";
import Categories from "./categories";
import ProductListing from "./product-listing";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <div className="container mx-auto px-4 py-12 space-y-8">
        <FeaturedProducts />
        <Categories />
        <ProductListing />
      </div>
      {/* <Toaster /> */}
    </div>
  );
}
