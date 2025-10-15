'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { LogOut, Headphones } from 'lucide-react'

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
    <nav aria-label='Primary' className='flex flex-1 flex-col'>
      <div className='flex flex-1 flex-col gap-[450px]'>
        {sections.map((section) => (
          <div key={section.label} className='flex flex-col gap-2.5'>
            <p className='pl-3 text-xs font-medium uppercase tracking-wide text-[#9BA1A6]'>
              {section.label}
            </p>
            <ul className='flex flex-col gap-1.5'>
              {section.items.map((item) => {
                const isActive =
                  item.href === pathname || pathname.startsWith(`${item.href}/`)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={clsx(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
                        isActive
                          ? 'bg-[#261F1C] text-white'
                          : 'text-[#9BA1A6] hover:bg-white/5 hover:text-white',
                      )}
                      prefetch
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noreferrer' : undefined}
                    >
                      {item.icon ? (
                        <item.icon
                          className={clsx(
                            'h-5 w-5 flex-shrink-0 transition',
                            isActive ? 'text-[#FF8C00]' : 'text-[#9BA1A6]',
                          )}
                          strokeWidth={1.25}
                        />
                      ) : null}
                      <span className='flex-1 truncate'>{item.label}</span>
                      {item.badge ? (
                        <span className='ml-auto rounded-full bg-white/10 px-2 text-xs font-semibold text-white/80'>
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
      </div>
      <div className='flex flex-col gap-2.5'>
        <p className='pl-3 text-xs font-medium uppercase tracking-wide text-[#9BA1A6]'>
          OTHERS
        </p>
        <ul className='flex flex-col gap-1.5'>
          <li>
            <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9BA1A6] transition hover:bg-white/5 hover:text-white'>
              <Headphones
                className='h-5 w-5 flex-shrink-0 text-[#9BA1A6]'
                strokeWidth={1.25}
              />
              <span className='flex-1 truncate text-left'>Support</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9BA1A6] transition hover:bg-white/5 hover:text-white'
            >
              <LogOut
                className='h-5 w-5 flex-shrink-0 text-[#9BA1A6]'
                strokeWidth={1.25}
              />
              <span className='flex-1 truncate text-left'>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
