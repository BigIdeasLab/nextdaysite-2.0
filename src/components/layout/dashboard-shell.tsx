import { clsx } from 'clsx'
import Image from 'next/image'
import { Menu } from 'lucide-react'

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
    <div className='grid min-h-screen w-full grid-cols-[272px_1fr] bg-background text-foreground'>
      <aside className='hidden h-full flex-col border-r border-white/10 bg-black lg:flex'>
        <div className='flex items-center justify-between gap-[53px] px-5 py-[17px]'>
          <Image
            src='/NDS-Logo.png'
            alt='NextDaySite Logo'
            width={144}
            height={38}
            className='object-contain'
          />
          <button
            className='flex h-[35px] w-[35px] items-center justify-center rounded-[10px] bg-[#202020] transition hover:bg-[#303030]'
            aria-label='Toggle menu'
          >
            <Menu className='h-5 w-5 text-white/50' strokeWidth={1.5} />
          </button>
        </div>
        <div className='flex flex-1 flex-col px-5 py-5'>
          <SidebarNav sections={sections} />
        </div>
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
