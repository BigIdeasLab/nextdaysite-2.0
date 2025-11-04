'use client'

import { useAboutPageContent } from '@/hooks/use-about-content'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function CmsAboutPreviewPage() {
  const { data: aboutContent, isLoading } = useAboutPageContent()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!aboutContent) {
    return <div>Error: Could not load about page content.</div>
  }

  return (
    <div>
      <PageHeader
        title='About'
        subtitle='Preview of the About page content'
        action={
          <Link href='/dashboard/cms/about/edit'>
            <Button>Edit Page</Button>
          </Link>
        }
      />
      <div className='space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Main Headline:</strong> {aboutContent.hero_main_headline}
            </p>
            <div className='flex space-x-4 mt-4'>
              {aboutContent.hero_image_1_url && (
                <Image
                  src={aboutContent.hero_image_1_url}
                  alt={aboutContent.hero_image_1_alt || ''}
                  width={200}
                  height={200}
                />
              )}
              {aboutContent.hero_image_2_url && (
                <Image
                  src={aboutContent.hero_image_2_url}
                  alt={aboutContent.hero_image_2_alt || ''}
                  width={200}
                  height={200}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intro Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Headline:</strong> {aboutContent.intro_headline}
            </p>
            <p>
              <strong>Paragraph:</strong> {aboutContent.intro_paragraph}
            </p>
            {aboutContent.intro_image_url && (
              <Image
                src={aboutContent.intro_image_url}
                alt={aboutContent.intro_image_alt || ''}
                width={200}
                height={200}
                className='mt-4'
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promise Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Main Headline:</strong>{' '}
              {aboutContent.promise_main_headline}
            </p>
            <p>
              <strong>Who We Are Headline:</strong>{' '}
              {aboutContent.promise_who_we_are_headline}
            </p>
            <p>
              <strong>Description:</strong> {aboutContent.promise_description}
            </p>
            <div className='flex space-x-4 mt-4'>
              {aboutContent.promise_image_1_url && (
                <Image
                  src={aboutContent.promise_image_1_url}
                  alt={aboutContent.promise_image_1_alt || ''}
                  width={200}
                  height={200}
                />
              )}
              {aboutContent.promise_image_2_url && (
                <Image
                  src={aboutContent.promise_image_2_url}
                  alt={aboutContent.promise_image_2_alt || ''}
                  width={200}
                  height={200}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solution Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Main Headline:</strong>{' '}
              {aboutContent.solution_main_headline}
            </p>
            <p>
              <strong>Our Solution Headline:</strong>{' '}
              {aboutContent.solution_our_solution_headline}
            </p>
            <p>
              <strong>Paragraph:</strong> {aboutContent.solution_paragraph}
            </p>
            <div className='flex space-x-4 mt-4'>
              {aboutContent.solution_image_1_url && (
                <Image
                  src={aboutContent.solution_image_1_url}
                  alt={aboutContent.solution_image_1_alt || ''}
                  width={200}
                  height={200}
                />
              )}
              {aboutContent.solution_image_2_url && (
                <Image
                  src={aboutContent.solution_image_2_url}
                  alt={aboutContent.solution_image_2_alt || ''}
                  width={200}
                  height={200}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Process Section</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Headline:</strong> {aboutContent.process_headline}
            </p>
            <div className='mt-4'>
              {(aboutContent.process_steps as any[]).map((step, index) => (
                <div key={index} className='mb-2'>
                  <p>
                    <strong>
                      {step.number} {step.title}:
                    </strong>{' '}
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
