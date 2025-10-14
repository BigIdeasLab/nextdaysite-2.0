'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { LogOut } from 'lucide-react'

import { useAuth } from '@/context/auth-context'
import type { NavSection } from '@/types/navigation'

type SidebarNavProps = {
  sections: NavSection[]
  onNavigate?: () => void
}

export function SidebarNav({ sections, onNavigate }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { client } = useAuth()

  async function handleLogout() {
    if (!client) return
    await client.auth.signOut()
    router.push('/login')
  }

  return (
    <nav aria-label='Primary' className='relative flex flex-1 flex-col gap-10'>
      {sections.map((section) => (
        <div key={section.label} className='flex flex-col gap-2'>
          <p className='px-3 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/50'>
            {section.label}
          </p>
          <ul className='space-y-1'>
            {section.items.map((item) => {
              const isActive =
                item.href === pathname || pathname.startsWith(`${item.href}/`)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={clsx(
                      'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground',
                    )}
                    prefetch
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noreferrer' : undefined}
                  >
                    {item.icon ? (
                      <item.icon className='h-4 w-4 flex-shrink-0 text-foreground/60 transition group-hover:text-foreground' />
                    ) : null}
                    <span className='flex-1 truncate'>{item.label}</span>
                    {item.badge ? (
                      <span className='ml-auto rounded-full bg-foreground/15 px-2 text-xs font-semibold text-foreground/80'>
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <div className='absolute bottom-0 w-full'>
        <button
          onClick={handleLogout}
          className='group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground'
        >
          <LogOut className='h-4 w-4 flex-shrink-0 text-foreground/60 transition group-hover:text-foreground' />
          <span className='flex-1 truncate'>Log Out</span>
        </button>
      </div>
    </nav>
  )
}
