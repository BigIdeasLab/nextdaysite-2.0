import Image from 'next/image'

export function PortfolioHero() {
  return (
    <section className='relative flex w-full flex-col items-center gap-8 px-6 py-16 md:px-12 lg:px-52'>
      <div className='absolute left-[179px] -top-[6px] hidden lg:block'>
        <Image
          src='https://api.builder.io/api/v1/image/assets/TEMP/9cca8bfc73a13a685e861bc869aaa5e2f645c9f4?width=398'
          alt=''
          width={199}
          height={224}
          className='h-56 w-auto'
        />
      </div>

      <div className='z-10 flex w-full max-w-3xl flex-col items-center gap-2.5'>
        <p className='max-w-xl text-balance text-center text-xl leading-7 text-[#B5A29F]'>
          See What We&apos;ve Built for Our Clients
        </p>
        <h1 className='text-balance text-center text-5xl font-medium leading-tight text-[#F7F6FF] md:text-6xl md:leading-[1.08]'>
          Our Works
        </h1>
      </div>
    </section>
  )
}
