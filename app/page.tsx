import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Lazy load below-the-fold sections for performance
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection").then(mod => mod.ProblemSection));
const ComparisonSection = dynamic(() => import("@/components/sections/ComparisonSection").then(mod => mod.ComparisonSection));
const WorkflowChain = dynamic(() => import("@/components/sections/WorkflowChain").then(mod => mod.WorkflowChain));
const ProductExplorer = dynamic(() => import("@/components/sections/ProductExplorer").then(mod => mod.ProductExplorer));
const CollaborationSection = dynamic(() => import("@/components/sections/CollaborationSection").then(mod => mod.CollaborationSection));
const VendorPortalSection = dynamic(() => import("@/components/sections/VendorPortalSection").then(mod => mod.VendorPortalSection));
const MultiEntitySection = dynamic(() => import("@/components/sections/MultiEntitySection").then(mod => mod.MultiEntitySection));
const TrustGrid = dynamic(() => import("@/components/sections/TrustGrid").then(mod => mod.TrustGrid));
const TestimonialBand = dynamic(() => import("@/components/sections/TestimonialBand").then(mod => mod.TestimonialBand));
const AudienceGrid = dynamic(() => import("@/components/sections/AudienceGrid").then(mod => mod.AudienceGrid));
const GettingStarted = dynamic(() => import("@/components/sections/GettingStarted").then(mod => mod.GettingStarted));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection").then(mod => mod.FaqSection));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then(mod => mod.FinalCta));

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — what is this? */}
      <Hero />

      {/* 2. Problem — do they understand my mess? */}
      <ProblemSection />

      {/* 3. Why Villeto — why not Ramp / Oracle / what I already use? */}
      <ComparisonSection />

      {/* 4. How it works — the connected ecosystem chain */}
      <WorkflowChain />

      {/* 6. Product explorer — tabbed deep-dive with screenshots */}
      <ProductExplorer />

      {/* 7. Collaboration — where do conversations happen? */}
      <CollaborationSection />

      {/* 8. Vendor portal — what about my suppliers? */}
      <VendorPortalSection />

      {/* 9. Multi-entity — does it handle subsidiaries? */}
      <MultiEntitySection />

      {/* 10. Controls & trust — can auditors trust it? */}
      <TrustGrid />

      {/* 11. Operational proof — proof lives in the record (decision trace) */}
      <TestimonialBand />

      {/* 12. By role — is it for my team? */}
      <AudienceGrid />

      {/* 13. Getting started — how painful is setup? */}
      <GettingStarted />

      {/* 14. FAQ — last objections */}
      <FaqSection />

      {/* 15. Final CTA — get started & walkthrough demo request */}
      <FinalCta />
    </>
  );
}

