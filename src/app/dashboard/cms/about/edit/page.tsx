'use client'

import { useAboutPageContent } from '@/hooks/use-about-content'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AboutPageContentForm } from '@/components/forms/about-page-content-form'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'

export default function CmsAboutEditPage() {
  const { data: aboutContent, isLoading } = useAboutPageContent()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!aboutContent) {
    return <div>Error: Could not load about page content.</div>
  }

  return (
    <div>
      <PageHeader title='About' subtitle='Edit About page content' />
      <Card>
        <CardContent className='pt-6'>
          <AboutPageContentForm initialData={aboutContent} />
        </CardContent>
      </Card>
    </div>
  )
}
