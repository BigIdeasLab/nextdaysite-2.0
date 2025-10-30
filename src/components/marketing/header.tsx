'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

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
  const [show, setShow] = useState(true)
  const [addBackground, setAddBackground] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setShow(false)
      } else {
        setShow(true)
      }
      lastScrollY.current = currentScrollY

      setAddBackground(currentScrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`header-root sticky top-0 z-40 w-full transition-all duration-300 ${
        show || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${addBackground ? 'bg-background dark:bg-[var(--dark-section)]' : 'bg-transparent'}`}
    >
      <div className='header-inner mx-auto flex max-w-6xl items-center px-6 md:px-16 justify-between gap-8 py-4 lg:py-8'>
        <Link href='/' className='brand-link flex-shrink-0'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/27cc49b97a9c74f01837ce911b65317dee61528b?width=338'
            alt='NextDaySite Logo'
            width={169}
            height={45}
            className='brand-logo h-11 w-auto'
            priority
          />
        </Link>

        <nav className='nav-desktop hidden items-center gap-8 lg:flex'>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm font-normal leading-5 transition-colors hover:text-foreground ${
                  isActive ? 'text-foreground' : 'text-foreground/70'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='actions-desktop hidden lg:flex items-center gap-2'>
          <Link
            href='/#pricing'
            className='cta-pricing flex h-12 items-center justify-center bg-[#FF8C00] text-[16px] font-medium text-[#F7F6FF] leading-5 transition-transform hover:scale-105 rounded-full px-5'
          >
            See Pricing
          </Link>

          <ThemeToggle />
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='mobile-toggle-btn flex h-10 w-[35px] items-center justify-center rounded-lg lg:hidden'
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {!mobileMenuOpen ? (
            <Menu className='h-6 w-6 text-foreground' strokeWidth={2} />
          ) : (
            <X className='h-6 w-6 text-foreground' strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay fixed inset-0 bg-black/50 dark:bg-black/70 z-30 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      <aside
        className={`mobile-panel fixed top-0 bottom-0 right-0 w-full max-w-sm bg-background/95 dark:bg-black/95 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className='mobile-close-btn absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg'
          aria-label='Close menu'
        >
          <X className='h-6 w-6 text-foreground' strokeWidth={2} />
        </button>

        <nav className='mobile-nav flex h-full flex-col items-center justify-start gap-6 px-6 pt-20'>
          <div className='mobile-nav-links w-full flex flex-col items-start gap-4'>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link block w-full text-2xl font-medium transition-colors py-3 ${
                    isActive
                      ? 'text-foreground dark:text-white'
                      : 'text-foreground/70 dark:text-white/70'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className='mobile-cta w-full pt-4 border-t border-[var(--dark-section)]/40 mt-auto flex flex-col gap-4 pb-8'>
            <Link
              href='/#pricing'
              className='mobile-cta-button mx-4 flex w-auto items-center justify-center bg-[#FF8C00] text-[16px] font-medium text-[#F7F6FF] leading-5 transition-transform hover:scale-105 rounded-full px-6 py-3'
              onClick={() => setMobileMenuOpen(false)}
            >
              See Pricing
            </Link>

            <div className='mobile-theme-toggle mx-4'>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </aside>
    </header>
  )
}
