'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Logo', href: '/logo' },
  { label: 'Service', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-black bg-black shadow-[0_2px_2px_0_rgba(167,167,167,0.12)]'>
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-8 px-5 py-4 lg:py-8'>
        <Link href='/' className='flex-shrink-0'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/7f4ba7b6782f45a1cb95f9f41afb7ed3c8358a89?width=256'
            alt='NextDaySite Logo'
            width={128}
            height={34}
            className='h-[34px] w-auto lg:h-11'
            priority
          />
        </Link>

        <nav className='hidden items-center gap-8 lg:flex'>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-normal transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-white/70'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='flex items-center gap-2'>
          <Link
            href='/#pricing'
            className='flex h-[34px] items-center justify-center rounded-[21px] bg-[#FF8C00] px-[14px] text-[11px] font-medium text-white transition-transform hover:scale-105 lg:h-12 lg:rounded-full lg:px-5 lg:text-base'
          >
            See Pricing
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='flex h-10 w-[35px] items-center justify-center rounded-lg lg:hidden'
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6 text-[#A6A6A6]' strokeWidth={2} />
            ) : (
              <Menu className='h-6 w-6 text-[#A6A6A6]' strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-40 bg-black/95 lg:hidden'>
          <nav className='flex h-full flex-col items-center justify-center gap-8 px-6'>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
