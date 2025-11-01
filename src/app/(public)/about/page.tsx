'use client'

import { AboutHero } from '@/components/marketing/about-hero'
import { AboutIntro } from '@/components/marketing/about-intro'
import { AboutPromise } from '@/components/marketing/about-promise'
import { AboutSolution } from '@/components/marketing/about-solution'
import { AboutProcess } from '@/components/marketing/about-process'
import { CtaSection } from '@/components/marketing/cta-section'
import { useAboutPageContent } from '@/hooks/use-about-content'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AboutPageContent, ProcessStep } from '@/types/models'

const fallbackAboutContent: AboutPageContent = {
  id: 'fallback-id',
  hero_main_headline:
    'We develop visually-appealing websites loaded with lead generation and conversion features',
  hero_image_1_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
  hero_image_1_alt: 'Portfolio showcase 1',
  hero_image_2_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
  hero_image_2_alt: 'Portfolio showcase 2',
  intro_headline: 'About Us',
  intro_paragraph:
    "Nextdaysite was founded in 1999 with a mission to empower brands with functional websites that add significant value to any project. In today's digital age, this is needed to set apart any brand from its rivals, while solidifying their digital footprints.",
  intro_image_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/e36e2b43c3d28ca7d538dff4c6098a33ca0bf71e',
  intro_image_alt: 'About NextDaySite',
  promise_main_headline:
    'We promise to work hand in hand with you to deliver results you truly deserve.',
  promise_who_we_are_headline: 'Who we Are',
  promise_description:
    "Your vision, combined with our expertise in creating excellent web solutions is guaranteed to create an exceptional website or mobile app that suits your brand and business needs. You can also be assured of innovations that stand out from the norm. This is because we don't create plain platforms at NDS. We create online experiences that keep our clients satisfied and their customers coming back for more.",
  promise_clients_value: '100+',
  promise_clients_label: 'Clients',
  promise_websites_value: '250+',
  promise_websites_label: 'Website Developed',
  promise_satisfaction_value: '95%',
  promise_satisfaction_label: 'Satisfaction Rate',
  promise_image_1_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
  promise_image_1_alt: 'Portfolio showcase 1',
  promise_image_2_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
  promise_image_2_alt: 'Portfolio showcase 2',
  solution_main_headline:
    'Delivering Digital Solutions Fast, Reliable, and Exceptional',
  solution_our_solution_headline: 'Our Solution',
  solution_paragraph:
    'At NextDaySite, we pride in providing high-quality solutions through a seamless development process and a proven record of timely delivery. With us, you can be confident in getting aesthetically impressive, user-friendly, and secure websites and mobile apps — built to perform and designed to stand out.',
  solution_image_1_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576',
  solution_image_1_alt: 'Portfolio showcase 1',
  solution_image_2_url:
    'https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598',
  solution_image_2_alt: 'Portfolio showcase 2',
  process_headline: 'Our Process',
  process_steps: [
    {
      number: '1.',
      title: 'Consultation',
      description:
        "Our process begins with a free consultation to understand clients' needs and expectations. We also offer advice based on technical expertise at this stage.",
    },
    {
      number: '2.',
      title: 'Implementation',
      description:
        'We design and execute the demands of our clients in a timely fashion, paying attention to even the smallest details.',
    },
    {
      number: '3.',
      title: 'Development',
      description:
        'From 3D graphics to mobile app solutions, we provide the final touches to the requests of the clients. Our primary target here is utter perfection.',
    },
    {
      number: '4.',
      title: 'Delivery',
      description:
        "The unveiling stage. We look forward to the smiles and the 'Wow!' exclamation our clients give when they see our results.",
    },
  ],
}

export default function AboutPage() {
  const { data: aboutContent, isLoading } = useAboutPageContent()

  const contentToDisplay = isLoading ? fallbackAboutContent : aboutContent

  if (!contentToDisplay) {
    return <div>Error: Could not load about page content.</div>
  }

  return (
    <div className='lg-about-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <AboutHero
          headline={contentToDisplay.hero_main_headline}
          image1={contentToDisplay.hero_image_1_url || ''}
          image2={contentToDisplay.hero_image_2_url || ''}
        />
        <AboutIntro
          headline={contentToDisplay.intro_headline}
          body={contentToDisplay.intro_paragraph}
          image={contentToDisplay.intro_image_url || ''}
        />
        <AboutPromise
          headline={contentToDisplay.promise_main_headline}
          subHeadline={contentToDisplay.promise_who_we_are_headline}
          body={contentToDisplay.promise_description}
          clients={contentToDisplay.promise_clients_value}
          websites={contentToDisplay.promise_websites_value}
          satisfaction={contentToDisplay.promise_satisfaction_value}
          image1={contentToDisplay.promise_image_1_url || ''}
          image2={contentToDisplay.promise_image_2_url || ''}
        />
        <AboutSolution
          headline={contentToDisplay.solution_main_headline}
          body={contentToDisplay.solution_paragraph}
          image1={contentToDisplay.solution_image_1_url || ''}
          image2={contentToDisplay.solution_image_2_url || ''}
        />
        <AboutProcess
          step1Title={
            (contentToDisplay.process_steps as ProcessStep[])[0].title
          }
          step1Description={
            (contentToDisplay.process_steps as ProcessStep[])[0].description
          }
          step2Title={
            (contentToDisplay.process_steps as ProcessStep[])[1].title
          }
          step2Description={
            (contentToDisplay.process_steps as ProcessStep[])[1].description
          }
          step3Title={
            (contentToDisplay.process_steps as ProcessStep[])[2].title
          }
          step3Description={
            (contentToDisplay.process_steps as ProcessStep[])[2].description
          }
          step4Title={
            (contentToDisplay.process_steps as ProcessStep[])[3].title
          }
          step4Description={
            (contentToDisplay.process_steps as ProcessStep[])[3].description
          }
        />
        <CtaSection />
      </main>
    </div>
  )
}
