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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        show || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${addBackground ? 'bg-background dark:bg-[var(--dark-section)]' : 'bg-transparent'}`}
    >
      <div className='mx-auto flex max-w-6xl items-center px-6 md:px-16 justify-between gap-8 py-4 lg:py-8'>
        <Link href='/' className='flex-shrink-0'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/27cc49b97a9c74f01837ce911b65317dee61528b?width=338'
            alt='NextDaySite Logo'
            width={169}
            height={45}
            className='h-11 w-auto'
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
                className={`text-sm font-normal leading-5 transition-colors hover:text-foreground ${
                  isActive ? 'text-foreground' : 'text-foreground/70'
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
            className='flex h-12 items-center justify-center bg-[#FF8C00] text-[16px] font-medium text-[#F7F6FF] leading-5 transition-transform hover:scale-105 rounded-full px-5'
          >
            See Pricing
          </Link>

          <ThemeToggle />
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='flex h-10 w-[35px] items-center justify-center rounded-lg lg:hidden'
          aria-label='Toggle menu'
          aria-expanded={mobileMenuOpen}
        >
          {!mobileMenuOpen && (
            <Menu className='h-6 w-6 text-foreground' strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-black/50 dark:bg-black/70 z-30 transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 bottom-0 right-0 w-full max-w-sm bg-background/95 dark:bg-black/95 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className='absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg'
          aria-label='Close menu'
        >
          <X className='h-6 w-6 text-foreground' strokeWidth={2} />
        </button>
        <nav className='flex h-full flex-col items-center justify-start gap-8 px-6 pt-20'>
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
                  isActive
                    ? 'text-foreground dark:text-white'
                    : 'text-foreground/70 dark:text-white/70'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
