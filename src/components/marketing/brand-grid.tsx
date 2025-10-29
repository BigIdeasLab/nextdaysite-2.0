'use client'

import Image from 'next/image'
import { useLogos } from '@/hooks/use-cms-content'

export function BrandGrid() {
  const { data: logos, isLoading, error } = useLogos()

  if (isLoading) return <div>Loading logos...</div>
  if (error) return <div>Error loading logos: {error.message}</div>

  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-12'>
        {logos?.map((logo, index) => (
          <div
            key={logo.id}
            className={`flex flex-col items-center gap-5 ${
              index % 2 === 1 ? 'md:translate-y-16' : ''
            }`}
          >
            <div className='flex h-auto w-full max-w-md items-center justify-center overflow-hidden rounded-[50px]'>
              <Image
                src={logo.image_url}
                alt={logo.name}
                width={logo.width || 788}
                height={logo.height || 591}
                className='h-auto w-full object-cover'
              />
            </div>
            <div className='flex w-full max-w-md flex-col items-start gap-2.5 px-1 pt-1'>
              <h3 className='text-3xl font-medium leading-tight text-[var(--foreground)]'>
                {logo.name}
              </h3>
              <p className='text-lg leading-6 text-[var(--text-secondary)]'>
                {logo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
