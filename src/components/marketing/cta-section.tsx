import Link from "next/link";

export function CtaSection() {
  return (
    <section className="w-full px-6 py-16 md:px-12 lg:px-52">
      <div className="relative mx-auto flex h-[555px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[50px] bg-[#161616]">
        <svg
          width="1022"
          height="526"
          viewBox="0 0 1022 526"
          fill="none"
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        >
          <defs>
            <filter id="filter0_f" x="-24.5" y="0.5" width="1071" height="1071" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="67.75" />
            </filter>
            <filter id="filter1_f" x="124.2" y="149.2" width="773.6" height="773.6" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="67.75" />
            </filter>
          </defs>
          <g filter="url(#filter0_f)">
            <path
              d="M511 136L561.912 485.088L911 536L561.912 586.912L511 936L460.088 586.912L111 536L460.088 485.088L511 136Z"
              fill="#FF7700"
            />
          </g>
          <g filter="url(#filter1_f)">
            <path
              d="M511 284.729L542.981 504.019L762.272 536.001L542.981 567.982L511 787.273L479.018 567.982L259.728 536.001L479.018 504.019L511 284.729Z"
              fill="white"
              fillOpacity="0.6"
            />
          </g>
        </svg>

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center gap-12 px-6">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-balance text-5xl font-medium capitalize leading-[1.08] text-[#F7F6FF] md:text-6xl">
              From Concept to Clicks Your product Live in Days, Not Months
            </h2>
            <p className="max-w-xl text-balance text-center text-xl leading-7 text-[#B9B9B9]">
              Start your subscription today and let our team design, host, and manage your website.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/checkout"
              className="flex h-14 items-center justify-center rounded-full border border-[#FF8C00] bg-[#FF8C00] px-8 text-lg font-medium text-white transition-transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="#portfolio"
              className="flex h-14 items-center justify-center rounded-full bg-[#090808] px-7 text-lg font-medium text-white transition-transform hover:scale-105"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
