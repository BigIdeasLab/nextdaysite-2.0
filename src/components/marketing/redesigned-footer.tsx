import Image from 'next/image'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Mobile App', href: '/services/mobile-app' },
      { label: 'Branding', href: '/services/branding' },
      { label: 'CMS Integration', href: '/services/cms-integration' },
      { label: 'UI Kit', href: '/services/ui-kit', underline: true },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@nextdaysite.com', href: 'mailto:hello@nextdaysite.com' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Telegram', href: 'https://telegram.org' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Career', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

export function RedesignedFooter() {
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
