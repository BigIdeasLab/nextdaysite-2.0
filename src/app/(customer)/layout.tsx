import type { ReactNode } from 'react'
import { LayoutDashboard } from 'lucide-react'

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
