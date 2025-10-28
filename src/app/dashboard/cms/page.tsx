'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { MessageSquare, Newspaper } from 'lucide-react'

export default function CmsDashboardPage() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>CMS Dashboard</h1>
      <p>Select a content type to manage.</p>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>Manage the services your business offers.</p>
            <Link href='/dashboard/cms/services'>
              <Button>Manage Services</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>Manage the projects in your portfolio.</p>
            <Link href='/dashboard/cms/portfolio'>
              <Button>Manage Portfolio</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Link
              href='/dashboard/cms/testimonials'
              className='flex items-center gap-4'
            >
              <MessageSquare className='h-6 w-6' />
              <h3 className='text-lg font-semibold'>Testimonials</h3>
            </Link>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Manage your testimonials. Add, edit, and delete customer quotes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Link
              href='/dashboard/cms/pages'
              className='flex items-center gap-4'
            >
              <Newspaper className='h-6 w-6' />
              <h3 className='text-lg font-semibold'>Pages</h3>
            </Link>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Manage your pages. Add, edit, and delete pages.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>Manage global site settings.</p>
            <Link href='/dashboard/cms/settings'>
              <Button>Manage Settings</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Add other content types here later */}
      </div>
    </div>
  )
}
