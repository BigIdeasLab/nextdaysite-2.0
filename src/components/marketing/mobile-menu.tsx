'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Logo', href: '/logo' },
  { label: 'Service', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay fixed inset-0 bg-black/50 dark:bg-black/70 z-30 transition-opacity duration-300 ease-in-out backdrop-blur-sm ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      <aside
        className={`mobile-panel fixed top-0 bottom-0 right-0 w-full max-w-sm bg-background/95 dark:bg-dark-section/95 z-50 transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className='flex items-center justify-between px-6 pt-4 border-b border-gray-200 dark:border-gray-800 pb-4'>
          <Link href='/' onClick={() => setMobileMenuOpen(false)}>
            <Image
              src='/NDS-Logo.png'
              alt='NextDaySite Logo'
              width={120}
              height={32}
            />
          </Link>
          <div className='flex items-center'>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className='mobile-close-btn flex h-10 w-10 items-center justify-center rounded-lg ml-2'
              aria-label='Close menu'
            >
              <X className='h-6 w-6 text-foreground' strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav className='mobile-nav flex-grow flex flex-col items-center justify-center gap-4 px-6'>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link block w-full text-center text-2xl font-medium transition-colors py-3 rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='text-center py-4 border-t border-gray-200 dark:border-gray-800'>
          <p className='text-sm text-foreground/60'>
            &copy; {new Date().getFullYear()} NextDaySite. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  )
}
