'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/auth/logout-button'

const dashboardMenuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Invoices', href: '/dashboard/invoices' },
  { label: 'Pricing', href: '/dashboard/pricing' },
  { label: 'CMS', href: '/dashboard/cms' },
]

const cmsMenuItems = [
  { label: 'BACK', href: '/dashboard' },
  { label: 'Logos', href: '/dashboard/cms/logos' },
  { label: 'Portfolio', href: '/dashboard/cms/portfolio' },
  { label: 'Services', href: '/dashboard/cms/services' },
  { label: 'Testimonials', href: '/dashboard/cms/testimonials' },
  { label: 'Showreel', href: '/dashboard/cms/showreels' },
  { label: 'About', href: '/dashboard/cms/about' },
]

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCms = pathname?.startsWith('/dashboard/cms')
  const menuItems = isCms ? cmsMenuItems : dashboardMenuItems

  return (
    <div className='flex h-screen bg-background text-foreground'>
      <aside className='w-64 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 p-6'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-foreground dark:text-white'>
            {isCms ? 'CMS' : 'Admin Dashboard'}
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            {isCms ? 'Manage your site content' : 'Manage your application'}
          </p>
        </div>

        <nav className='space-y-2'>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='mt-auto'>
          <LogoutButton />
        </div>
      </aside>

      <main className='flex-1 overflow-auto'>
        <div className='p-8'>{children}</div>
      </main>
    </div>
  )
}
