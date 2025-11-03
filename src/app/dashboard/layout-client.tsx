'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/auth/logout-button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Receipt,
  Tags,
  Library,
  Search,
  MessageSquare,
} from 'lucide-react'
import { Fragment, useMemo, type ComponentType } from 'react'

type MenuItem = { label: string; href: string; icon: ComponentType<any> }

const dashboardMenu: MenuItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Contacts', href: '/dashboard/contact', icon: MessageSquare },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
  { label: 'Pricing', href: '/dashboard/pricing', icon: Tags },
  { label: 'CMS', href: '/dashboard/cms', icon: Library },
]

const cmsMenu: MenuItem[] = [
  { label: 'Back', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Logos', href: '/dashboard/cms/logos', icon: Tags },
  { label: 'Portfolio', href: '/dashboard/cms/portfolio', icon: FolderKanban },
  { label: 'Services', href: '/dashboard/cms/services', icon: Library },
  { label: 'Testimonials', href: '/dashboard/cms/testimonials', icon: Users },
  { label: 'Showreel', href: '/dashboard/cms/showreels', icon: Receipt },
  { label: 'About', href: '/dashboard/cms/about', icon: Tags },
  { label: 'Pages', href: '/dashboard/cms/pages', icon: Library },
  { label: 'Settings', href: '/dashboard/cms/settings', icon: Receipt },
]

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isCms = pathname?.startsWith('/dashboard/cms')
  const menu = isCms ? cmsMenu : dashboardMenu

  const breadcrumbs = useMemo(() => {
    const parts = pathname?.split('/').filter(Boolean) || []
    const startIndex = parts.findIndex((p) => p === 'dashboard')
    const sliced = startIndex >= 0 ? parts.slice(startIndex) : parts
    return sliced
  }, [pathname])

  return (
    <div className='flex min-h-screen bg-background text-foreground'>
      {/* Sidebar */}
      <aside className='hidden md:flex md:w-64 md:flex-col md:border-r md:border-gray-200 md:bg-gray-50 md:dark:border-gray-800 md:dark:bg-gray-900/60'>
        <div className='px-5 py-5 border-b border-gray-200/70 dark:border-gray-800/70'>
          <div className='text-lg font-semibold tracking-tight'>
            {isCms ? 'CMS' : 'Dashboard'}
          </div>
          <p className='text-xs text-muted-foreground/80 mt-1'>
            {isCms ? 'Manage your site content' : 'Manage your application'}
          </p>
        </div>
        <nav className='flex-1 px-3 py-4 space-y-1'>
          {menu.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800/80 ${
                  isActive
                    ? 'bg-gray-100 text-foreground dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700'
                    : 'text-foreground/80'
                }`}
              >
                <Icon className='h-4 w-4' strokeWidth={1.75} />
                <span>{item.label}</span>
                {isActive ? (
                  <span className='absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded bg-primary' />
                ) : null}
              </Link>
            )
          })}
        </nav>
        <div className='mt-auto px-4 py-4 border-t border-gray-200/70 dark:border-gray-800/70 flex items-center justify-between'>
          <ThemeToggle />
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <div className='flex-1 flex flex-col'>
        {/* Topbar */}
        <header className='sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-800'>
          <nav className='hidden md:flex items-center gap-2 text-sm text-muted-foreground/80'>
            {breadcrumbs.map((crumb, i) => (
              <Fragment key={`${crumb}-${i}`}>
                <span
                  className={
                    i === breadcrumbs.length - 1
                      ? 'text-foreground font-medium'
                      : 'hover:text-foreground/90'
                  }
                >
                  {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                </span>
                {i < breadcrumbs.length - 1 ? (
                  <span className='text-muted-foreground/50'>/</span>
                ) : null}
              </Fragment>
            ))}
          </nav>
          <div className='ml-auto flex items-center gap-2 md:hidden'>
            <ThemeToggle />
            <LogoutButton />
          </div>
          <div className='ml-auto hidden md:flex items-center gap-3'>
            <div className='relative'>
              <Search className='pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60' />
              <input
                type='search'
                placeholder='Search...'
                className='h-9 w-64 rounded-md border border-gray-200 bg-background pl-8 pr-3 text-sm outline-none ring-0 placeholder:text-muted-foreground/60 focus:border-gray-300 dark:border-gray-800'
              />
            </div>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <main className='flex-1'>
          <div className='mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
