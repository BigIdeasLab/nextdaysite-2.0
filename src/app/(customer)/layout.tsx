'use client'

import { type ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'

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
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
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
