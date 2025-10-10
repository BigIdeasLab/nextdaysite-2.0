import Link from "next/link";

export function RedesignedHero() {
  return (
    <section className="relative flex min-h-[600px] w-full flex-col items-center gap-24 px-6 py-16 md:px-12 lg:px-52">
      <div className="flex w-full max-w-3xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-balance text-5xl font-medium leading-tight text-[#F7F6FF] md:text-6xl md:leading-[1.08]">
            Own a Stunning Website Without Lifting a Finger
          </h1>
          <p className="max-w-xl text-balance text-xl leading-7 text-[#B5A29F]">
            NextDaySite builds, hosts, and manages your business website for a simple monthly fee. No hidden costs. No
            stress. Just results.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/checkout"
            className="flex h-14 items-center justify-center rounded-full border border-[#3E3E3E] bg-[#FF8C00] px-5 text-lg font-medium text-white transition-transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="#pricing"
            className="flex h-14 items-center justify-center rounded-full border border-[#3E3E3E] bg-[#090808] px-7 text-lg font-medium text-white transition-transform hover:scale-105"
          >
            See Pricing
          </Link>
        </div>
      </div>

      <div className="h-[500px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-[#1A1A1A]" />
    </section>
  );
}
