import Image from 'next/image'

export function AboutIntro() {
  return (
    <section className='relative w-full border-y border-[#3A3A3A] px-6 py-20 md:px-12 lg:px-52'>
      <div className='mx-auto flex max-w-5xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between'>
        <div className='relative flex items-center justify-center md:w-1/3'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/e36e2b43c3d28ca7d538dff4c6098a33ca0bf71e'
            alt='About NextDaySite'
            width={424}
            height={424}
            className='h-auto w-full max-w-[300px]'
          />
        </div>
        <div className='flex flex-col gap-6 md:w-2/3'>
          <h2 className='text-3xl font-medium leading-tight text-[#F7F6FF] md:text-[32px]'>
            About Us
          </h2>
          <p className='text-lg leading-relaxed text-[#9BA1A6]'>
            Nextsaysite was founded in 1999 with a mission to empower brands
            with functional websites that add significant value to any project.
            In today's digital age, this is needed to set apart any brand from
            its rivals, while solidifying their digital footprints.
          </p>
        </div>
      </div>
    </section>
  )
}
