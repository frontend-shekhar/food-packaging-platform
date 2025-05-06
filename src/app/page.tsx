import { ButtonComponent } from "@/components/common/ButtonComponent";
import Container from "@/components/common/Container";
import { CategorySection } from "@/components/landing/category-section";
import { Header } from "@/components/landing/header";
import { HeroSlider } from "@/components/landing/hero-slider";
import { LatestProductCard } from "@/components/landing/latest-product-card";
import { LatestRFQs } from "@/components/landing/latest-rfqs";
import { MarketActivity } from "@/components/landing/market-activity";
import { ProductCard } from "@/components/landing/product-card";
import { QuoteForm } from "@/components/landing/quote-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-white 2xl:pb-[100px] pb-[50px]">
      <Header />
      <Container>
        <HeroSlider />
        <CategorySection />
        <MarketActivity />
        <LatestRFQs />

        {/* Our Products */}
        <div className="container mx-auto p-5 sm:p-7 mt-10 sm:mt-20 bg-[#FBFBFB] shadow-[0_1.595px_0_0_rgba(10, 10, 10, 0.04)] rounded-[8px]">
          <div className="flex justify-between sm:flex-row flex-col sm:items-center gap-1 mb-5 sm:mb-7">
            <h2 className="text-xl sm:text-[28px] leading-normal text-[#1E1E1E] font-semibold">
              Our Products
            </h2>
            <ButtonComponent
              variant="link"
              element="link"
              className="text-sm sm:text-lg font-semibold leading-normal text-blueDark4F"
            >
              View All
            </ButtonComponent>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>

        {/* Latest Products */}
        <div className="container mx-auto p-5 sm:p-7 bg-[#FBFBFB] rounded-[8px] shadow-[0_1.595px_0_0_rgba(10, 10, 10, 0.04)] mt-10 sm:mt-20">
          <div className="flex justify-between sm:flex-row flex-col sm:items-center gap-1 mb-5 sm:mb-7">
            <h2 className="text-xl sm:text-[28px] leading-normal text-[#1E1E1E] font-semibold">
              Latest Products
            </h2>
            <ButtonComponent
              variant="link"
              element="link"
              className="text-sm sm:text-lg font-semibold leading-normal text-blueDark4F"
            >
              View All
            </ButtonComponent>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <LatestProductCard key={i} />
            ))}
          </div>
        </div>

        <QuoteForm />
      </Container>
    </div>
  );
}
