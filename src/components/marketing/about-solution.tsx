import Image from 'next/image'

export function AboutSolution() {
  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-5xl flex-col gap-10 md:gap-[60px]'>
        <div className='flex flex-col gap-8 md:gap-20'>
          <h2 className='max-w-[752px] text-[30px] font-medium leading-snug text-foreground sm:text-[40px] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'>
            Delivering Digital Solutions Fast, Reliable, and Exceptional
          </h2>

          <div className='flex w-full flex-col items-start gap-5 md:flex-row md:justify-between md:gap-0'>
            <h3 className='text-2xl font-medium leading-snug text-foreground md:text-[32px] md:leading-[31.5px]'>
              Our Solution
            </h3>
            <p className='max-w-[481px] text-sm leading-normal text-muted-foreground md:text-lg md:leading-6'>
              At NextDaySite, we take pride in providing high-quality solutions
              through a seamless development process and a proven record of
              timely delivery. With us, you can be confident in getting
              aesthetically impressive, user-friendly, and secure websites and
              mobile apps — built to perform and designed to stand out.
            </p>
          </div>

          <div className='mt-8 flex w-full max-w-[1022px] flex-col items-center gap-5 md:flex-row md:items-start md:gap-[21px]'>
            <div className='flex w-full max-w-[501px] flex-col items-center gap-5'>
              <div className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#545454] md:rounded-[50px]'>
                <Image
                  src='https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576'
                  alt='Portfolio showcase 1'
                  width={788}
                  height={591}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div className='flex w-full max-w-[501px] flex-col items-center gap-5 md:mt-[130px]'>
              <div className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#545454] md:rounded-[50px]'>
                <Image
                  src='https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598'
                  alt='Portfolio showcase 2'
                  width={788}
                  height={591}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
