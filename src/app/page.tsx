import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/cta-section'
import { FeaturedWorksSection } from '@/components/marketing/featured-works'
import { Header } from '@/components/marketing/header'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'
import { RedesignedHero } from '@/components/marketing/redesigned-hero'
import { RedesignedPricing } from '@/components/marketing/redesigned-pricing'
import { ServicesSection } from '@/components/marketing/services-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'

export const metadata: Metadata = {
  title: 'NextDaySite 2.0',
  description:
    'AI-powered website and brand creation delivered in 24–48 hours with unified customer and admin experiences.',
}

export default async function MarketingHomePage() {
  return (
    <div className='bg-black text-foreground lg-grid-background'>
      <Header />
      <main>
        <RedesignedHero />
        <FeaturedWorksSection />
        <ServicesSection />
        <TestimonialsSection />
        <RedesignedPricing />
        <CtaSection />
      </main>
      <RedesignedFooter />
    </div>
  )
}
