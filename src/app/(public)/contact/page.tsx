import { Header } from '@/components/marketing/header'
import { ContactHero } from '@/components/marketing/contact-hero'
import { ContactForm } from '@/components/marketing/contact-form'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-[#0a0a0a] text-foreground'>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <RedesignedFooter />
    </div>
  )
}
