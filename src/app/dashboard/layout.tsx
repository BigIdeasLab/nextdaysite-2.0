import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/api/supabase-server'

async function checkAuth() {
  const supabase = createServerSupabaseClient()
  if (!supabase) {
    return false
  }
  try {
    const { data } = await supabase.auth.admin.listUsers()
    return !!data?.users?.length
  } catch {
    return false
  }
}

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Invoices', href: '/dashboard/invoices' },
  { label: 'Pricing', href: '/dashboard/pricing' },
  { label: 'Portfolio', href: '/dashboard/cms/portfolio' },
  { label: 'Services', href: '/dashboard/cms/services' },
  { label: 'Testimonials', href: '/dashboard/cms/testimonials' },
  { label: 'Settings', href: '/dashboard/cms/settings' },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className='flex h-screen bg-background text-foreground'>
      <aside className='w-64 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 p-6'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-foreground'>
            Admin Dashboard
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Manage your application
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

        <div className='absolute bottom-6 left-6 right-6'>
          <Link
            href='/dashboard/logout'
            className='block w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 text-center'
          >
            Logout
          </Link>
        </div>
      </aside>

      <main className='flex-1 overflow-auto'>
        <div className='p-8'>{children}</div>
      </main>
    </div>
  )
}
