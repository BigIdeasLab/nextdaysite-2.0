import { Header } from '@/components/marketing/header'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'
import { CtaSection } from '@/components/marketing/cta-section'
import { OnboardingForm } from '@/components/forms/onboarding-form'

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ project_slug: string }>
}) {
  const { project_slug } = await params

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="onboarding-page-main">
        <div className="onboarding-page-container">
          <OnboardingForm />
        </div>
      </main>
      <CtaSection />
      <RedesignedFooter />
    </div>
  )
}
