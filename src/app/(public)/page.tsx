import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextDaySite 2.0",
  description:
    "AI-powered website and brand creation delivered in 24–48 hours with unified customer and admin experiences.",
};

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-24">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto rounded-full bg-foreground/5 px-4 py-1 text-sm font-medium uppercase tracking-wide text-foreground/80">
            Launch-ready in 48 hours
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Build your brand, website, and customer portal overnight.
          </h1>
          <p className="text-balance text-base leading-relaxed text-foreground/70 sm:text-lg">
            NextDaySite 2.0 unifies marketing, delivery, and operations into a single Next.js + Supabase platform so you can scale fast without switching tools.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="#plans"
          >
            Explore plans
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="#workflow"
          >
            See how it works
          </a>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <section id="workflow" className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Unified flow from lead to launch.
            </h2>
            <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
              Capture visitors with conversational onboarding, convert with instant checkout, and deliver with customer and admin dashboards. One codebase handles the entire journey.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 sm:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-foreground/80" aria-hidden />
                AI-guided marketing site with pricing, testimonials, and portfolio.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-foreground/80" aria-hidden />
                Customer dashboard for project tracking, chat, billing, and file management.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-foreground/80" aria-hidden />
                Admin command center with analytics, approvals, and team assignments.
              </li>
            </ul>
          </div>
          <div className="grid gap-6 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 sm:p-10">
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <h3 className="text-lg font-semibold">Marketing Site</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Tailored landing pages with AI chat, pricing, and testimonials to convert leads fast.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <h3 className="text-lg font-semibold">Customer Portal</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Track milestones, share files, and manage billing with real-time updates powered by Supabase.
              </p>
            </div>
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <h3 className="text-lg font-semibold">Admin Dashboard</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Monitor revenue, assign work, and approve deliverables, all from a single control center.
              </p>
            </div>
          </div>
        </section>
        <section id="plans" className="grid gap-8">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Plans built for launch velocity.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Choose a plan that fits your timeline and ambition. Every plan includes project orchestration, AI-assisted copy, and a dedicated launch team.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Web Launch</h3>
                <p className="text-sm text-foreground/70">AI-guided single-page site, brand guide, and launch checklist.</p>
              </div>
              <p className="text-3xl font-semibold">$499</p>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li>24-hour delivery window</li>
                <li>Copy, design, and hosting setup</li>
                <li>Starter analytics and SEO baseline</li>
              </ul>
              <a
                className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="/checkout"
              >
                Start Web Launch
              </a>
            </article>
            <article className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-foreground text-background p-6 shadow-sm shadow-foreground/10">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Identity Suite</h3>
                <p className="text-sm text-background/80">Multi-page site, full brand identity, and asset library.</p>
              </div>
              <p className="text-3xl font-semibold">$1,499</p>
              <ul className="space-y-3 text-sm text-background/80">
                <li>48-hour delivery window</li>
                <li>Complete brand system and logo options</li>
                <li>Supabase customer portal setup</li>
              </ul>
              <a
                className="inline-flex items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                href="/checkout"
              >
                Explore Identity Suite
              </a>
            </article>
            <article className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Complete Launch</h3>
                <p className="text-sm text-foreground/70">Full-stack experience with automation, dashboards, and support.</p>
              </div>
              <p className="text-3xl font-semibold">$2,999</p>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li>Custom automations and AI workflows</li>
                <li>Admin analytics and KPI dashboards</li>
                <li>Ongoing optimization support</li>
              </ul>
              <a
                className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="/checkout"
              >
                Launch Complete Package
              </a>
            </article>
          </div>
        </section>
        <section className="grid gap-6 rounded-3xl border border-foreground/10 bg-foreground/5 p-8">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              One platform, zero handoffs.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Marketing site, customer portal, admin hub, Stripe checkout, and Supabase backend all live in one Next.js app. Every team works from the same source of truth.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <p className="text-4xl font-semibold">24h</p>
              <p className="mt-2 text-sm text-foreground/70">from signup to launch-ready assets</p>
            </div>
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <p className="text-4xl font-semibold">+38%</p>
              <p className="mt-2 text-sm text-foreground/70">average conversion lift from AI chat onboarding</p>
            </div>
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <p className="text-4xl font-semibold">95%</p>
              <p className="mt-2 text-sm text-foreground/70">of admins report faster approvals</p>
            </div>
            <div className="rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10">
              <p className="text-4xl font-semibold">4.9/5</p>
              <p className="mt-2 text-sm text-foreground/70">average customer satisfaction rating</p>
            </div>
          </div>
        </section>
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
