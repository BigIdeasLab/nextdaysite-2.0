import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AppProviders } from '@/lib/providers/app-providers'
import { MainLayout } from '@/components/marketing/main-layout'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nextdaysite.app'),
  title: {
    default: 'NextDaySite 2.0',
    template: '%s · NextDaySite 2.0',
  },
  description:
    'All-in-one Next.js + Supabase platform for launching AI-powered websites, branding, and customer portals in under 48 hours.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning data-scroll-behavior='smooth'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
