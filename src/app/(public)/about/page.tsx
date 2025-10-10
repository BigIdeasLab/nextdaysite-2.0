import { Header } from "@/components/marketing/header";
import { AboutHero } from "@/components/marketing/about-hero";
import { AboutIntro } from "@/components/marketing/about-intro";
import { AboutPromise } from "@/components/marketing/about-promise";
import { AboutSolution } from "@/components/marketing/about-solution";
import { AboutProcess } from "@/components/marketing/about-process";
import { RedesignedFooter } from "@/components/marketing/redesigned-footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground">
      <Header />
      <main>
        <AboutHero />
        <AboutIntro />
        <AboutPromise />
        <AboutSolution />
        <AboutProcess />
      </main>
      <RedesignedFooter />
    </div>
  );
}
