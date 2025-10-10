import type { ReactNode } from 'react'
import { BarChart3 } from 'lucide-react'

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
