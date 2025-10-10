import type { Metadata } from "next";

import { CtaSection } from "@/components/marketing/cta-section";
import { Header } from "@/components/marketing/header";
import { RedesignedFooter } from "@/components/marketing/redesigned-footer";
import { ServicesHero } from "@/components/marketing/services-hero";
import { ServicesList } from "@/components/marketing/services-list";

export const metadata: Metadata = {
  title: "Our Services - NextDaySite 2.0",
  description:
    "Everything you need to build and grow online - web design, mobile apps, branding, CMS integration, and more.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground">
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
        <CtaSection />
      </main>
      <RedesignedFooter />
    </div>
  );
}
