import { ContactHero } from '@/components/marketing/contact-hero'
import { ContactForm } from '@/components/marketing/contact-form'
import { CtaSection } from '@/components/marketing/cta-section'

export default function ContactPage() {
  return (
    <div className='lg-contact-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='pt-24 lg:pt-32'>
        <ContactHero />
        <ContactForm />
        <CtaSection />
      </main>
    </div>
  )
}
