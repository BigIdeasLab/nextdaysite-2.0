import { clsx } from 'clsx'

import type { ReactNode } from 'react'

import { SidebarNav } from '@/components/layout/sidebar-nav'
import type { NavSection } from '@/types/navigation'

type DashboardShellProps = {
  sections: NavSection[]
  children: ReactNode
  topbar?: ReactNode
  sidebarFooter?: ReactNode
}

export function DashboardShell({
  sections,
  children,
  topbar,
  sidebarFooter,
}: DashboardShellProps) {
  return (
    <div className='grid min-h-screen w-full grid-cols-[260px_1fr] bg-background text-foreground lg:grid-cols-[280px_1fr]'>
      <aside className='hidden h-full flex-col border-r border-foreground/10 bg-background px-4 py-8 lg:flex'>
        <div className='flex items-center gap-2 px-3 text-base font-semibold'>
          <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background'>
            ND
          </span>
          NextDaySite
        </div>
        <div className='mt-8 flex h-full flex-1 flex-col'>
          <SidebarNav sections={sections} />
        </div>
        {sidebarFooter ? (
          <div className='mt-8 px-3 text-sm text-foreground/50'>
            {sidebarFooter}
          </div>
        ) : null}
      </aside>
      <div className='flex min-h-screen flex-col'>
        <header
          className={clsx(
            'flex h-16 items-center border-b border-foreground/10 bg-background/90 px-6 backdrop-blur',
            topbar ? 'justify-between' : 'justify-end',
          )}
        >
          {topbar ?? null}
        </header>
        <main className='flex-1 overflow-y-auto bg-foreground/[0.02] px-6 py-10'>
          <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
