import type { Metadata } from "next";

import { HeroSection } from "@/components/marketing/hero-section";
import { MetricsSection } from "@/components/marketing/metrics-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { WorkflowSection } from "@/components/marketing/workflow-section";
import { createServerSupabaseClient, fetchPlans } from "@/lib/api";

export const metadata: Metadata = {
  title: "NextDaySite 2.0",
  description:
    "AI-powered website and brand creation delivered in 24–48 hours with unified customer and admin experiences.",
};

const workflowBullets = [
  "AI-guided marketing site with pricing, testimonials, and portfolio.",
  "Customer dashboard for project tracking, chat, billing, and file management.",
  "Admin command center with analytics, approvals, and team assignments.",
];

const workflowCards = [
  {
    title: "Marketing Site",
    description: "Tailored landing pages with AI chat, pricing, and testimonials to convert leads fast.",
  },
  {
    title: "Customer Portal",
    description: "Track milestones, share files, and manage billing with real-time updates powered by Supabase.",
  },
  {
    title: "Admin Dashboard",
    description: "Monitor revenue, assign work, and approve deliverables, all from a single control center.",
  },
];

const metrics = [
  {
    value: "24h",
    label: "from signup to launch-ready assets",
  },
  {
    value: "+38%",
    label: "average conversion lift from AI chat onboarding",
  },
  {
    value: "95%",
    label: "of admins report faster approvals",
  },
  {
    value: "4.9/5",
    label: "average customer satisfaction rating",
  },
];

export default async function MarketingHomePage() {
  const supabase = createServerSupabaseClient();
  const plans = await fetchPlans(supabase);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection
        badge="Launch-ready in 48 hours"
        headline="Build your brand, website, and customer portal overnight."
        subheadline="NextDaySite 2.0 unifies marketing, delivery, and operations into a single Next.js + Supabase platform so you can scale fast without switching tools."
        primaryCta={{ label: "Explore plans", href: "#plans" }}
        secondaryCta={{ label: "See how it works", href: "#workflow" }}
      />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <WorkflowSection
          id="workflow"
          headline="Unified flow from lead to launch."
          description="Capture visitors with conversational onboarding, convert with instant checkout, and deliver with customer and admin dashboards. One codebase handles the entire journey."
          bullets={workflowBullets.map((label) => ({ label }))}
          cards={workflowCards}
        />
        <PricingSection plans={plans} />
        <MetricsSection
          headline="One platform, zero handoffs."
          description="Marketing site, customer portal, admin hub, Stripe checkout, and Supabase backend all live in one Next.js app. Every team works from the same source of truth."
          metrics={metrics}
        />
      </main>
      <footer className="border-t border-foreground/10 bg-background/80 py-8 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} NextDaySite Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a className="transition hover:text-foreground" href="/checkout">
              Get started
            </a>
            <a className="transition hover:text-foreground" href="/privacy">
              Privacy policy
            </a>
            <a className="transition hover:text-foreground" href="/terms">
              Terms of service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
