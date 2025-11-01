'use client'

import { useAboutPageContent } from '@/hooks/use-about-content'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AboutPageContentForm } from '@/components/forms/about-page-content-form'

export default function CmsAboutPage() {
  const { data: aboutContent, isLoading } = useAboutPageContent()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!aboutContent) {
    return <div>Error: Could not load about page content.</div>
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6'>Edit About Page Content</h1>
      <AboutPageContentForm initialData={aboutContent} />
    </div>
  )
}
