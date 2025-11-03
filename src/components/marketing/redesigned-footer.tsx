'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const footerSections = [
  {
    title: 'Services',
    links: [
      { label: 'Web Dev', href: '/services#website-development' },
      { label: 'Mobile App', href: '/services#mobile-app' },
      { label: 'Branding', href: '/services#branding' },
      { label: 'CMS Integration', href: '/services#cms-integration' },
      {
        label: 'Visual Identity',
        href: '/services#visual-identity-design',
      },
      {
        label: 'Brand Guide',
        href: '/services#brand-guidelines',
        underline: false,
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'wow@nextdaysite.com', href: 'mailto:wow@nextdaysite.com' },
      // { label: 'Privacy Policy', href: '/privacy' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/nextdaysite.com/',
      },
      { label: 'Twitter', href: 'https://x.com/Web_Nextdaysite' },
      // { label: 'Discord', href: 'https://discord.com' },
      { label: 'Instagram', href: 'https://www.instagram.com/nextdaysite/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Logo', href: '/logo' },
      { label: 'Contact', href: '/contact' },
      { label: 'Service', href: '/services' },
    ],
  },
]

export function RedesignedFooter() {
  const router = useRouter()
  const pathname = usePathname()

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('/services#')) {
      e.preventDefault()
      const [path, hash] = href.split('#')
      if (pathname === path) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        router.push(href)
      }
    }
  }

  useEffect(() => {
    if (pathname.includes('/services#')) {
      const hash = pathname.split('#')[1]
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [pathname])

  return (
    <footer className='w-full bg-background px-4 py-8 transition-colors duration-300 sm:px-6 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:gap-16 lg:gap-24'>
        <Link href='/' className='flex-shrink-0'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/6164a0033f06e2201d7b9b69ec859e1f37431dee?width=534'
            alt='NextDaySite Logo'
            width={267}
            height={71}
            className='h-auto w-48 md:w-56 lg:w-64'
          />
        </Link>

        <div className='grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12 lg:gap-16'>
          {footerSections.map((section) => (
            <div key={section.title} className='flex flex-col gap-4'>
              <h3 className='text-base font-medium tracking-tight text-[#B5A29F] md:text-lg lg:text-xl'>
                {section.title}
              </h3>
              <div className='flex flex-col gap-3'>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`text-sm text-primary transition-colors hover:text-primary/80 md:text-base lg:text-lg ${
                      link.underline ? 'underline' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
