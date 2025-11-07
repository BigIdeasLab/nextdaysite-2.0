'use client'

import { useState } from 'react'
import { Header } from '@/components/marketing/header'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'
import { CtaSection } from '@/components/marketing/cta-section'
import { OnboardingForm } from '@/components/forms/onboarding-form'
import { useParams } from 'next/navigation'
import { MobileMenu } from '@/components/marketing/mobile-menu'

export default function OnboardingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const params = useParams()
  const project_slug = params.project_slug as string

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <main className='flex flex-col items-center justify-center w-full px-4 md:px-8 py-26 md:py-30'>
        <OnboardingForm project_slug={project_slug} />
      </main>
      <CtaSection />
    </div>
  )
}
