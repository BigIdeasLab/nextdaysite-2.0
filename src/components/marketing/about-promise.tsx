export function AboutPromise() {
  const stats = [
    { value: '100+', label: 'Clients' },
    { value: '250+', label: 'Website Developed' },
    { value: '95%', label: 'satisfaction rate' },
  ]

  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-[1022px] flex-col gap-10 md:gap-[60px]'>
        <div className='flex flex-col gap-8 md:gap-20'>
          <h2 className='max-w-[752px] text-[30px] font-medium leading-[27.4px] text-[#F7F6FF] md:text-[60px] md:leading-[64.8px]'>
            We promise to work hand in hand with you to deliver results you truly
            deserve.
          </h2>

          <div className='flex flex-col justify-center gap-[30px] md:gap-[50px]'>
            <div className='flex flex-col items-start gap-5 md:flex-row md:justify-between md:gap-0'>
              <h3 className='text-xl font-medium leading-[22.4px] text-[#F7F6FF] md:text-[32px] md:leading-[31.5px]'>
                Who we Are
              </h3>
              <p className='max-w-[481px] text-xs leading-[17px] text-[#9BA1A6] md:text-lg md:leading-6'>
                Your vision, combined with our expertise in creating excellent web
                solutions is guaranteed to create an exceptional website or mobile
                app that suits your brand and business needs. You can also be
                assured of innovations that stand out from the norm. This is
                because we don&apos;t create plain platforms at NDS. We create
                online experiences that keep our clients satisfied and their
                customers coming back for more.
              </p>
            </div>

            <div className='flex items-center gap-[43px] md:gap-[61px]'>
              {stats.map((stat, index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-2'>
                  <div className='text-xl font-medium leading-[23px] text-[#F7F6FF] md:text-[32px] md:leading-[31.5px]'>
                    {stat.value}
                  </div>
                  <div className='text-center text-xs leading-[17.6px] text-[#9BA1A6] md:text-lg md:leading-6'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='promise-showcase-gallery'>
          <div className='promise-showcase-card'>
            <div className='promise-image-frame'>
              <img
                src='https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576'
                alt='Portfolio showcase 1'
                className='promise-showcase-image'
              />
            </div>
          </div>
          <div className='promise-showcase-card promise-showcase-offset'>
            <div className='promise-image-frame'>
              <img
                src='https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598'
                alt='Portfolio showcase 2'
                className='promise-showcase-image'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
