import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { faqSection } from "@/lib/content/onboarding";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Villeto",
      url: "https://villeto.com",
    },
    {
      "@type": "Organization",
      name: "Villeto",
      url: "https://villeto.com",
      logo: "https://villeto.com/images/villeto-v.png",
      sameAs: ["https://x.com/villeto_hq"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-706-000-1234",
        email: "info@villeto.com",
        contactType: "customer support",
      },
      areaServed: ["NG", "GH", "KE", "GB", "US"],
    },
    {
      "@type": "SoftwareApplication",
      name: "Villeto",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://villeto.com",
      description:
        "Spend management, procurement, employee expenses, bill pay, vendor management, and AP subledger platform for multi-entity businesses.",
      featureList: [
        "3-stage Spend Programs and pre-commitment budget checks",
        "Automated Expense Policies and receipt verification",
        "Automated 3-way matching (PO, goods receipt, supplier invoice)",
        "B2B Vendor Portal with CAC and TIN bank verification",
        "Multi-entity AP subledger supporting NGN, USD, GBP, EUR, KES, and GHS",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqSection.items.slice(0, 5).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

