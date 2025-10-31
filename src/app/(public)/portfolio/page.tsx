import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/cta-section'
import { PortfolioGrid } from '@/components/marketing/portfolio-grid'
import { PortfolioHero } from '@/components/marketing/portfolio-hero'

export const metadata: Metadata = {
  title: 'Our Works - NextDaySite 2.0',
  description:
    "See what we've built for our clients - portfolio of websites, apps, and digital experiences.",
}

export default function PortfolioPage() {
  return (
    <div className='lg-portfolio-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <PortfolioHero />
        <PortfolioGrid />
        <CtaSection />
      </main>
    </div>
  )
}
