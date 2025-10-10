import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Logo", href: "#logo" },
  { label: "Service", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="w-full px-6 py-8 md:px-12 lg:px-52">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/e4cb6b0baf53dfff22d686bf7774e439e4c3f8f7?width=338"
            alt="NextDaySite Logo"
            width={169}
            height={45}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-normal text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#pricing"
          className="flex h-12 items-center justify-center rounded-full bg-[#FF8C00] px-5 text-center text-base font-medium text-white transition-transform hover:scale-105"
        >
          See Pricing
        </Link>
      </div>
    </header>
  );
}
