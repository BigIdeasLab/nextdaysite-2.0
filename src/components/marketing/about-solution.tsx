import Image from "next/image";

export function AboutSolution() {
  return (
    <section className="w-full px-6 py-16 md:px-12 lg:px-52">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <h2 className="max-w-[752px] text-balance text-5xl font-medium leading-tight text-[#F7F6FF] md:text-6xl md:leading-[1.08]">
          Delivering Digital Solutions Fast, Reliable, and Exceptional
        </h2>

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">
          <h3 className="text-3xl font-medium leading-tight text-[#F7F6FF] md:text-[32px]">
            Our Solution
          </h3>
          <p className="max-w-[481px] text-lg leading-relaxed text-[#9BA1A6]">
            At NextDaySite, we take pride in providing high-quality solutions
            through a seamless development process and a proven record of timely
            delivery. With us, you can be confident in getting aesthetically
            impressive, user-friendly, and secure websites and mobile apps —
            built to perform and designed to stand out.
          </p>
        </div>

        <div className="relative flex h-[705px] w-full items-center justify-center">
          <div className="absolute left-0 top-0 flex h-[575px] w-full max-w-[486px] items-center justify-center overflow-hidden rounded-[50px] bg-[#545454]">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f"
              alt="Solution showcase 1"
              width={788}
              height={591}
              className="h-auto w-full max-w-[788px] object-cover"
            />
          </div>
          <div className="absolute right-0 top-[130px] flex h-[575px] w-full max-w-[501px] items-center justify-center overflow-hidden rounded-[50px] bg-[#545454]">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1"
              alt="Solution showcase 2"
              width={799}
              height={599}
              className="h-auto w-full max-w-[799px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
