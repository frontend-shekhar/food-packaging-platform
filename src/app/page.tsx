import { ButtonComponent } from "@/components/common/ButtonComponent";
import Container from "@/components/common/Container";
import { CategorySection } from "@/components/landing/category-section";
import { Header } from "@/components/landing/header";
import { LatestProductCard } from "@/components/landing/latest-product-card";
import { LatestRFQs } from "@/components/landing/latest-rfqs";
import { MarketActivity } from "@/components/landing/market-activity";
import { ProductCard } from "@/components/landing/product-card";
import { QuoteForm } from "@/components/landing/quote-form";
import Categories from "@/components/product/categories";
import FeaturedProducts from "@/components/product/featured-products";
import Footer from "@/components/product/Footer";
import HeroSlider from "@/components/product/hero-slider";
import Navbar from "@/components/product/navbar";
import ProductListing from "@/components/product/product-listing";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen">
        <Navbar />
        <HeroSlider />
        <div className="container mx-auto px-4 py-12 space-y-8">
          <FeaturedProducts />
          <Categories />
          <ProductListing />
        </div>
        {/* <Toaster /> */}
        <Footer />
      </div>
    </div>
  );
}
