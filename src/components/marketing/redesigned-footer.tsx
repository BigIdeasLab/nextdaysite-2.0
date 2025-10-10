import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Web Dsign", href: "/services/web-design" },
      { label: "Mobile App", href: "/services/mobile-app" },
      { label: "Branding", href: "/services/branding" },
      { label: "CMS Integration", href: "/services/cms-integration" },
      { label: "UI Kit", href: "/services/ui-kit", underline: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@nextdaysite.com", href: "mailto:hello@nextdaysite.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Linkendin", href: "https://linkedin.com" },
      { label: "Twitter", href: "https://twitter.com" },
      { label: "Discord", href: "https://discord.com" },
      { label: "Telegram", href: "https://telegram.org" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Career", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function RedesignedFooter() {
  return (
    <footer className="w-full bg-[#0a0a0a] px-6 py-12 md:px-12 lg:px-52">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:items-start md:gap-24">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/6164a0033f06e2201d7b9b69ec859e1f37431dee?width=534"
            alt="NextDaySite Logo"
            width={267}
            height={71}
            className="h-auto w-64"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-12 md:flex-row md:gap-20">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xl font-medium leading-[50px] tracking-tight text-[#B5A29F]">{section.title}</h3>
              <div className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xl leading-6 text-white transition-colors hover:text-white/80 ${
                      link.underline ? "underline" : ""
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
  );
}
