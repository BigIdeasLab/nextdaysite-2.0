'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import Link from 'next/link'
import {
  MessageSquare,
  Newspaper,
  Image as ImageIcon,
  FolderKanban,
  Settings,
  Layers,
  Info,
  Film,
} from 'lucide-react'

export default function CmsDashboardPage() {
  const items = [
    {
      href: '/dashboard/cms/about',
      title: 'About',
      description: 'Manage the content on your about page.',
      icon: Info,
      cta: 'Manage Content',
    },
    {
      href: '/dashboard/cms/services',
      title: 'Services',
      description: 'Manage the services your business offers.',
      icon: Layers,
      cta: 'Manage Services',
    },
    {
      href: '/dashboard/cms/portfolio',
      title: 'Portfolio',
      description: 'Manage the projects in your portfolio.',
      icon: FolderKanban,
      cta: 'Manage Portfolio',
    },
    {
      href: '/dashboard/cms/testimonials',
      title: 'Testimonials',
      description: 'Add, edit, and delete customer quotes.',
      icon: MessageSquare,
    },
    // {
    //   href: '/dashboard/cms/pages',
    //   title: 'Pages',
    //   description: 'Create and update your pages.',
    //   icon: Newspaper,
    // },
    {
      href: '/dashboard/cms/logos',
      title: 'Logos',
      description: 'Manage client and partner logos.',
      icon: ImageIcon,
    },
    // {
    //   href: '/dashboard/cms/settings',
    //   title: 'Settings',
    //   description: 'Manage global site settings.',
    //   icon: Settings,
    //   cta: 'Manage Settings',
    // },
    {
      href: '/dashboard/cms/showreels',
      title: 'Showreels',
      description: 'Manage your showreel videos.',
      icon: Film,
      cta: 'Manage Showreels',
    },
  ]

  return (
    <div>
      <PageHeader title='CMS' subtitle='Select a content type to manage' />
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className='group'>
              <Card className='h-full cursor-pointer transition-all hover:shadow-md'>
                <CardHeader className='flex items-center gap-3'>
                  <span className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-foreground/80 dark:border-gray-800 dark:bg-gray-900'>
                    <Icon className='h-4 w-4' />
                  </span>
                  <h3 className='text-base font-semibold'>{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {item.description}
                  </p>
                  {item.cta ? (
                    <Button variant='outline'>{item.cta}</Button>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
