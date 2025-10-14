import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ProductShowcase />
      <WhyChooseUs />
    </>
  );
}
