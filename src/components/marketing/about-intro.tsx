import Image from 'next/image'

interface AboutIntroProps {
  headline: string
  body: string
  image: string
}

export function AboutIntro({ headline, body, image }: AboutIntroProps) {
  return (
    <section className='relative w-full px-6 py-[110px] md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-5xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between'>
        <div className='relative hidden items-center justify-center md:flex md:w-1/3'>
          <Image
            src={image}
            alt='About NextDaySite'
            width={424}
            height={424}
            className='h-auto w-full max-w-[300px]'
          />
        </div>
        <div className='flex flex-col gap-6 md:w-2/3'>
          <h2 className='text-3xl font-medium leading-tight text-[var(--foreground)] md:text-[32px]'>
            {headline}
          </h2>
          <p className='text-lg leading-relaxed text-[var(--text-secondary)]'>
            {body}
          </p>
        </div>
      </div>
    </section>
  )
}
