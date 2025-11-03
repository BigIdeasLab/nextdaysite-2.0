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

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const pathname = usePathname()
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
      className={`header-root fixed top-0 z-40 w-full transition-all ${
        show || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${
        addBackground
          ? 'bg-background dark:bg-[var(--dark-section)]'
          : 'bg-transparent'
      }`}
    >
      <div className='header-inner mx-auto flex max-w-6xl items-center px-6 md:px-16 justify-between gap-2 py-4 lg:py-8'>
        <Link href='/' className='brand-link flex-shrink-0'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/27cc49b97a9c74f01837ce911b65317dee61528b?width=338'
            alt='NextDaySite Logo'
            width={169}
            height={45}
            className={`brand-logo h-11 w-auto transition-all duration-300 ${
              mobileMenuOpen ? 'blur-sm' : ''
            }`}
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

        <div className='header-actions flex items-center gap-2'>
          <Link
            href='/#pricing'
            className='cta-pricing flex h-9 lg:h-12 items-center justify-center bg-[#FF8C00] text-[11px] lg:text-[16px] font-medium text-[#F7F6FF] leading-5 transition-transform hover:scale-105 rounded-full px-4 lg:px-5'
          >
            See Pricing
          </Link>

          <div className='hidden lg:block'>
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
      </div>
    </header>
  )
}
