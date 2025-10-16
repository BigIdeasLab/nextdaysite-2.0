'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import type { ReactNode } from 'react'

import { SidebarNav } from '@/components/layout/sidebar-nav'
import type { NavSection } from '@/types/navigation'

type DashboardShellProps = {
  sections: NavSection[]
  children: ReactNode
  topbar?: ReactNode
}

export function DashboardShell({
  sections,
  children,
  topbar,
}: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='grid min-h-screen w-full bg-background text-foreground lg:grid-cols-[272px_1fr]'>
      {/* Desktop Sidebar */}
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

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          'fixed inset-0 z-50 h-full w-full bg-black/80 transition-opacity duration-300 lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex h-full w-[272px] flex-col border-r border-white/10 bg-black transition-transform duration-300 ease-in-out lg:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className='flex items-center justify-between gap-4 px-5 py-[17px]'>
          <Image
            src='/NDS-Logo.png'
            alt='NextDaySite Logo'
            width={144}
            height={38}
            className='object-contain'
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition hover:bg-white/10'
            aria-label='Close menu'
          >
            <X className='h-5 w-5 text-white/80' />
          </button>
        </div>
        <div className='flex flex-1 flex-col px-5 py-5'>
          <SidebarNav
            sections={sections}
            onNavigate={() => setIsSidebarOpen(false)}
          />
        </div>
      </aside>

      <div className='flex min-h-screen flex-col bg-black'>
        {topbar ? (
          <header className='flex h-16 items-center justify-between border-b border-foreground/10 bg-background/90 px-6 backdrop-blur'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='-ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition hover:bg-white/10 lg:hidden'
              aria-label='Open menu'
            >
              <Menu className='h-6 w-6 text-white' />
            </button>
            <div className='flex-1'>{topbar}</div>
          </header>
        ) : null}
        <main className='flex-1 overflow-y-auto px-6 py-8 sm:px-8 md:px-12'>
          <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
