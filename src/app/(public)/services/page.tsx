import type { Metadata } from 'next'
import { CtaSection } from '@/components/marketing/cta-section'
import { ServicesHero } from '@/components/marketing/services-hero'
import { ServicesList } from '@/components/marketing/services-list'
import { Showreel } from '@/components/marketing/showreel'

export const metadata: Metadata = {
  title: 'Our Services - NextDaySite 2.0',
  description:
    'Everything you need to build and grow online - web design, mobile apps, branding, CMS integration, and more.',
}

export default function ServicesPage() {
  return (
    <div className='lg-service-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <ServicesHero>
          <Showreel />
        </ServicesHero>
        <ServicesList />
        <CtaSection />
      </main>
    </div>
  )
}
