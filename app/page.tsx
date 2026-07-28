import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Lazy load below-the-fold components for performance
const StatsBar = dynamic(() => import("@/components/sections/StatsBar").then(mod => mod.StatsBar));
const FeatureSuite = dynamic(() => import("@/components/sections/FeatureSuite").then(mod => mod.FeatureSuite));
const ProductExplorer = dynamic(() => import("@/components/sections/ProductExplorer").then(mod => mod.ProductExplorer));
const AudienceGrid = dynamic(() => import("@/components/sections/AudienceGrid").then(mod => mod.AudienceGrid));
const TestimonialBand = dynamic(() => import("@/components/sections/TestimonialBand").then(mod => mod.TestimonialBand));
const TrustGrid = dynamic(() => import("@/components/sections/TrustGrid").then(mod => mod.TrustGrid));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then(mod => mod.FinalCta));

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeatureSuite />
      <ProductExplorer />
      <AudienceGrid />
      <TrustGrid />
      <TestimonialBand />
      <FinalCta />
    </>
  );
}
