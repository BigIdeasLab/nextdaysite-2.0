'use client'

import { type ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Folder, Users, CreditCard, Settings } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import type { NavSection } from '@/types/navigation'

const adminSections: NavSection[] = [
  {
    label: 'MAIN',
    items: [
      {
        label: 'Overview',
        href: '/admin/overview',
        icon: BarChart3,
      },
      {
        label: 'Projects',
        href: '/admin/projects',
        icon: Folder,
      },
      {
        label: 'Customers',
        href: '/admin/customers',
        icon: Users,
      },
      {
        label: 'Billing',
        href: '/admin/billing',
        icon: CreditCard,
      },
      {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
]

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push('/login')
    } else if (user.user_metadata.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading || !user || user.user_metadata.role !== 'admin') {
    return null // Or a loading spinner
  }

  return (
    <DashboardShell
      sections={adminSections}
      topbar={<p className='text-sm text-foreground/60'>Admin controls</p>}
    >
      {children}
    </DashboardShell>
  )
}
