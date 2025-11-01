'use client'

import { AboutHero } from '@/components/marketing/about-hero'
import { AboutIntro } from '@/components/marketing/about-intro'
import { AboutPromise } from '@/components/marketing/about-promise'
import { AboutSolution } from '@/components/marketing/about-solution'
import { AboutProcess } from '@/components/marketing/about-process'
import { CtaSection } from '@/components/marketing/cta-section'
import { useAboutPageContent } from '@/hooks/use-about-content'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ProcessStep } from '@/types/models'

export default function AboutPage() {
  const { data: aboutContent, isLoading } = useAboutPageContent()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!aboutContent) {
    return <div>Error: Could not load about page content.</div>
  }

  return (
    <div className='lg-about-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <AboutHero
          headline={aboutContent.hero_main_headline}
          image1={aboutContent.hero_image_1_url || ''}
          image2={aboutContent.hero_image_2_url || ''}
        />
        <AboutIntro
          headline={aboutContent.intro_headline}
          body={aboutContent.intro_paragraph}
          image={aboutContent.intro_image_url || ''}
        />
        <AboutPromise
          headline={aboutContent.promise_main_headline}
          subHeadline={aboutContent.promise_who_we_are_headline}
          body={aboutContent.promise_description}
          clients={aboutContent.promise_clients_value}
          websites={aboutContent.promise_websites_value}
          satisfaction={aboutContent.promise_satisfaction_value}
          image1={aboutContent.promise_image_1_url || ''}
          image2={aboutContent.promise_image_2_url || ''}
        />
        <AboutSolution
          headline={aboutContent.solution_main_headline}
          body={aboutContent.solution_paragraph}
          image1={aboutContent.solution_image_1_url || ''}
          image2={aboutContent.solution_image_2_url || ''}
        />
        <AboutProcess
          step1Title={(aboutContent.process_steps as ProcessStep[])[0].title}
          step1Description={
            (aboutContent.process_steps as ProcessStep[])[0].description
          }
          step2Title={(aboutContent.process_steps as ProcessStep[])[1].title}
          step2Description={
            (aboutContent.process_steps as ProcessStep[])[1].description
          }
          step3Title={(aboutContent.process_steps as ProcessStep[])[2].title}
          step3Description={
            (aboutContent.process_steps as ProcessStep[])[2].description
          }
          step4Title={(aboutContent.process_steps as ProcessStep[])[3].title}
          step4Description={
            (aboutContent.process_steps as ProcessStep[])[3].description
          }
        />
        <CtaSection />
      </main>
    </div>
  )
}
