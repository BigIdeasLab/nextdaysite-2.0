import type { Metadata } from "next";

import { BrandCta } from "@/components/marketing/brand-cta";
import { BrandGrid } from "@/components/marketing/brand-grid";
import { BrandHero } from "@/components/marketing/brand-hero";
import { Header } from "@/components/marketing/header";
import { RedesignedFooter } from "@/components/marketing/redesigned-footer";

export const metadata: Metadata = {
  title: "Brand Identity - NextDaySite 2.0",
  description: "We design brands that stand out - logos, visual identity, and brand guidelines that make an impact.",
};

export default function BrandIdentityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground">
      <Header />
      <main>
        <BrandHero />
        <BrandGrid />
        <BrandCta />
      </main>
      <RedesignedFooter />
    </div>
  );
}
