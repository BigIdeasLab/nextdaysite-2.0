import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/cta-section'
import { FeaturedWorksSection } from '@/components/marketing/featured-works'
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
    <div className='bg-background text-foreground transition-colors duration-300 lg-grid-background'>
      <main className='pt-24 lg:pt-32'>
        <RedesignedHero />
        <FeaturedWorksSection />
        <ServicesSection />
        <TestimonialsSection />
        <RedesignedPricing />
        <CtaSection />
      </main>
    </div>
  )
}
