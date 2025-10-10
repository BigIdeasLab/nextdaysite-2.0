import Image from 'next/image'

export function AboutPromise() {
  const stats = [
    { value: '100+', label: 'Clients' },
    { value: '250+', label: 'Website Developed' },
    { value: '95%', label: 'satisfaction rate' },
  ]

  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-5xl flex-col gap-16'>
        <h2 className='max-w-[752px] text-balance text-5xl font-medium leading-tight text-[#F7F6FF] md:text-6xl md:leading-[1.08]'>
          We promise to work hand in hand with you to deliver results you truly
          deserve.
        </h2>

        <div className='flex flex-col gap-12'>
          <div className='flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between'>
            <h3 className='text-3xl font-medium leading-tight text-[#F7F6FF] md:text-[32px]'>
              Who we Are
            </h3>
            <p className='max-w-[481px] text-lg leading-relaxed text-[#9BA1A6]'>
              Your vision, combined with our expertise in creating excellent web
              solutions is guaranteed to create an exceptional website or mobile
              app that suits your brand and business needs. You can also be
              assured of innovations that stand out from the norm. This is
              because we don't create plain platforms at NDS. We create online
              experiences that keep our clients satisfied and their customers
              coming back for more.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-8 md:gap-16'>
            {stats.map((stat, index) => (
              <div key={index} className='flex flex-col items-center gap-2.5'>
                <div className='text-3xl font-medium leading-tight text-[#F7F6FF] md:text-[32px]'>
                  {stat.value}
                </div>
                <div className='text-center text-lg leading-relaxed text-[#9BA1A6]'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='relative flex h-[705px] w-full items-center justify-center'>
          <div className='absolute left-0 top-0 flex h-[575px] w-full max-w-[486px] items-center justify-center overflow-hidden rounded-[50px] bg-[#545454]'>
            <Image
              src='https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f'
              alt='Portfolio showcase 1'
              width={788}
              height={591}
              className='h-auto w-full max-w-[788px] object-cover'
            />
          </div>
          <div className='absolute right-0 top-[130px] flex h-[575px] w-full max-w-[501px] items-center justify-center overflow-hidden rounded-[50px] bg-[#545454]'>
            <Image
              src='https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1'
              alt='Portfolio showcase 2'
              width={799}
              height={599}
              className='h-auto w-full max-w-[799px] object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
