import { AboutHero } from '@/components/marketing/about-hero'
import { AboutIntro } from '@/components/marketing/about-intro'
import { AboutPromise } from '@/components/marketing/about-promise'
import { AboutSolution } from '@/components/marketing/about-solution'
import { AboutProcess } from '@/components/marketing/about-process'
import { CtaSection } from '@/components/marketing/cta-section'

export default function AboutPage() {
  return (
    <div className='lg-about-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <AboutHero />
        <AboutIntro />
        <AboutPromise />
        <AboutSolution />
        <AboutProcess />
        <CtaSection />
      </main>
    </div>
  )
}
