'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { MessageSquare, Newspaper, Image as ImageIcon } from 'lucide-react'

export default function CmsDashboardPage() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>CMS Dashboard</h1>
      <p>Select a content type to manage.</p>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Link href='/dashboard/cms/services'>
          <Card className='cursor-pointer'>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>Manage the services your business offers.</p>
              <Button>Manage Services</Button>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/cms/portfolio'>
          <Card className='cursor-pointer'>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>Manage the projects in your portfolio.</p>
              <Button>Manage Portfolio</Button>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/cms/testimonials'>
          <Card className='cursor-pointer'>
            <CardHeader className='flex items-center gap-4'>
              <MessageSquare className='h-6 w-6' />
              <h3 className='text-lg font-semibold'>Testimonials</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Manage your testimonials. Add, edit, and delete customer quotes.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/cms/pages'>
          <Card className='cursor-pointer'>
            <CardHeader className='flex items-center gap-4'>
              <Newspaper className='h-6 w-6' />
              <h3 className='text-lg font-semibold'>Pages</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Manage your pages. Add, edit, and delete pages.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/cms/logos'>
          <Card className='cursor-pointer'>
            <CardHeader className='flex items-center gap-4'>
              <ImageIcon className='h-6 w-6' />
              <h3 className='text-lg font-semibold'>Logos</h3>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Manage your client and partner logos.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/cms/settings'>
          <Card className='cursor-pointer'>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>Manage global site settings.</p>
              <Button>Manage Settings</Button>
            </CardContent>
          </Card>
        </Link>
        {/* Add other content types here later */}
      </div>
    </div>
  )
}
