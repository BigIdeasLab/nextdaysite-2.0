'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/marketing/header'
import { MobileMenu } from '@/components/marketing/mobile-menu'
import { RedesignedFooter } from '@/components/marketing/redesigned-footer'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [mobileMenuOpen])

  return (
    <div className='flex flex-col min-h-screen'>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className='flex-grow'>{children}</main>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <RedesignedFooter />
    </div>
  )
}
