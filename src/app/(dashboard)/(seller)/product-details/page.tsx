import Container from "@/components/common/Container";
import { Header } from "@/components/landing/header";
import ProductComparisonInfo from "@/components/product-comparison/ProductComparisonInfo";
import ProductComparisonList from "@/components/product-comparison/ProductComparisonList";
import ProductInfo from "@/components/product-comparison/ProductInfo";

function ProductComparison() {
  return (
    <>
      <div className="min-h-screen bg-[#D9D9D9] 2xl:pb-[55px] pb-[50px]">
        <Header />
        <Container>
          <ProductInfo />
          <ProductComparisonList />
          <ProductComparisonInfo />
        </Container>
      </div>
    </>
  );
}

export default ProductComparison;
