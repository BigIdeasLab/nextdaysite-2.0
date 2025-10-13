'use client'

import { type ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3 } from 'lucide-react'

import { useAuth } from '@/context/auth-context'
import { useUser } from '@/hooks/use-user'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import type { NavSection } from '@/types/navigation'

const adminSections: NavSection[] = [
  {
    label: 'Operations',
    items: [
      {
        label: 'Overview',
        href: '/admin/overview',
        icon: BarChart3,
      },
    ],
  },
]

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading: authLoading } = useAuth()
  const { data: userProfile, isLoading: userLoading } = useUser(user?.id)
  const router = useRouter()

  useEffect(() => {
    const isAuth = !authLoading && user
    const isAuthz = !userLoading && userProfile?.role === 'admin'

    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (isAuth && !userLoading && !isAuthz) {
      router.push('/dashboard')
    }
  }, [user, userProfile, authLoading, userLoading, router])

  if (
    authLoading ||
    userLoading ||
    !userProfile ||
    userProfile.role !== 'admin'
  ) {
    return null // Or a loading spinner
  }

  return (
    <DashboardShell
      sections={adminSections}
      topbar={<p className='text-sm text-foreground/60'>Admin controls</p>}
      sidebarFooter={<p>Operational status: All systems running</p>}
    >
      {children}
    </DashboardShell>
  )
}
