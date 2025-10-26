import { Header } from '@/components/marketing/header'
import { ContactHero } from '@/components/marketing/contact-hero'
import { ContactForm } from '@/components/marketing/contact-form'
import { CtaSection } from '@/components/marketing/cta-section'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'

export default function ContactPage() {
  return (
    <div className='lg-contact-grid-background min-h-screen bg-background text-foreground transition-colors duration-300'>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <CtaSection />
      </main>
      <RedesignedFooter />
    </div>
  )
}
