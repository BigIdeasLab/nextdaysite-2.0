'use client'

import { type ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Folder,
  Lightbulb,
  CreditCard,
  User,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import type { NavSection } from '@/types/navigation'

const customerSections: NavSection[] = [
  {
    label: 'Workspace',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'Projects',
        href: '/project',
        icon: Folder,
      },
      {
        label: 'Idea Vault',
        href: '/idea-vault',
        icon: Lightbulb,
      },
      {
        label: 'Billing',
        href: '/billing',
        icon: CreditCard,
      },
      {
        label: 'Account',
        href: '/account',
        icon: User,
      },
    ],
  },
]

type CustomerLayoutProps = {
  children: ReactNode
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push('/login')
    } else if (user.user_metadata.role === 'admin') {
      router.push('/admin/overview')
    } else if (user.user_metadata.role !== 'customer') {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user || user.user_metadata.role !== 'customer') {
    return null // Or a loading spinner
  }

  return (
    <DashboardShell
      sections={customerSections}
      topbar={<p className='text-sm text-foreground/60'>Welcome back</p>}
      sidebarFooter={<p>Need help? Email support@nextdaysite.com</p>}
    >
      {children}
    </DashboardShell>
  )
}
