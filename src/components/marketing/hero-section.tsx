type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type HeroSectionProps = {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaAction;
  secondaryCta: CtaAction;
};

export function HeroSection({ badge, headline, subheadline, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-24">
      <div className="flex flex-col gap-4 text-center">
        <span className="mx-auto rounded-full bg-foreground/5 px-4 py-1 text-sm font-medium uppercase tracking-wide text-foreground/80">
          {badge}
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{headline}</h1>
        <p className="text-balance text-base leading-relaxed text-foreground/70 sm:text-lg">{subheadline}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href={primaryCta.href}
        >
          {primaryCta.label}
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href={secondaryCta.href}
        >
          {secondaryCta.label}
        </a>
      </div>
    </header>
  );
}
