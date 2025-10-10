import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/cta-section'
import { Header } from '@/components/marketing/header'
import { PortfolioGrid } from '@/components/marketing/portfolio-grid'
import { PortfolioHero } from '@/components/marketing/portfolio-hero'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'

export const metadata: Metadata = {
  title: 'Our Works - NextDaySite 2.0',
  description:
    "See what we've built for our clients - portfolio of websites, apps, and digital experiences.",
}

export default function PortfolioPage() {
  return (
    <div className='min-h-screen bg-[#0a0a0a] text-foreground'>
      <Header />
      <main>
        <PortfolioHero />
        <PortfolioGrid />
        <CtaSection />
      </main>
      <RedesignedFooter />
    </div>
  )
}
