import Image from 'next/image'

interface AboutPromiseProps {
  headline: string
  subHeadline: string
  body: string
  clients: string
  websites: string
  satisfaction: string
  image1: string
  image2: string
}

export function AboutPromise({
  headline,
  subHeadline,
  body,
  clients,
  websites,
  satisfaction,
  image1,
  image2,
}: AboutPromiseProps) {
  const stats = [
    { value: clients, label: 'Clients' },
    { value: websites, label: 'Website Developed' },
    { value: satisfaction, label: 'Satisfaction Rate' },
  ]

  return (
    <section className='w-full px-6 py-30 md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-[1022px] flex-col gap-10 md:gap-[60px]'>
        <div className='flex flex-col gap-8 md:gap-20'>
          <h2 className='max-w-[752px] text-[30px] font-medium leading-snug text-foreground sm:text-[40px] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'>
            {headline}
          </h2>

          <div className='flex flex-col justify-center gap-[30px] md:gap-[50px]'>
            <div className='flex flex-col items-start gap-5 md:flex-row md:justify-between md:gap-0'>
              <h3 className='text-xl font-medium leading-snug text-foreground md:text-[32px] md:leading-[31.5px]'>
                {subHeadline}
              </h3>
              <div className='flex flex-col gap-5'>
                <p className='max-w-[481px] text-sm leading-normal text-[var(--text-secondary)] md:text-lg md:leading-6'>
                  {body}
                </p>
                <div className='flex flex-wrap items-center justify-center gap-[43px] md:gap-[61px]'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='flex flex-col items-center justify-center gap-2'
                    >
                      <div className='text-2xl font-medium leading-snug text-foreground md:text-[32px] md:leading-[31.5px]'>
                        {stat.value}
                      </div>
                      <div className='text-center text-sm leading-normal text-[var(--text-secondary)] md:text-lg md:leading-6'>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 flex w-full max-w-[1022px] flex-col items-center gap-5 md:flex-row md:items-start md:gap-[21px]'>
            <div className='flex w-full max-w-[501px] flex-col items-center gap-5'>
              <div className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#545454] md:rounded-[50px]'>
                <Image
                  src={image1}
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
                  src={image2}
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
