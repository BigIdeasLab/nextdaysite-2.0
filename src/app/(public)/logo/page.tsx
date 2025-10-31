import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/cta-section'
import { BrandGrid } from '@/components/marketing/brand-grid'
import { BrandHero } from '@/components/marketing/brand-hero'

export const metadata: Metadata = {
  title: 'Brand Identity - NextDaySite 2.0',
  description:
    'We design brands that stand out - logos, visual identity, and brand guidelines that make an impact.',
}

export default function BrandIdentityPage() {
  return (
    <div className='lg-portfolio-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <BrandHero />
        <BrandGrid />
        <CtaSection />
      </main>
    </div>
  )
}
