'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'
import type { LogoRow } from '@/types/models'

interface BrandGridClientProps {
  logos: (LogoRow & { description: string | null })[]
}

export function BrandGridClient({ logos }: BrandGridClientProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0,
  })

  return (
    <section ref={ref} className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <motion.div
        className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-12'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {logos.map((logo, index) => (
          <motion.div
            key={logo.id}
            className={`flex flex-col items-center gap-5 ${index % 2 === 1 ? 'md:translate-y-30' : ''}`}
            variants={staggerChildVariant}
          >
            <div className='flex h-auto w-full max-w-md items-center justify-center overflow-hidden rounded-[50px] border border-gray-200 shadow-md'>
              <Image
                src={logo.image_url}
                alt={logo.name}
                width={logo.width || 788}
                height={logo.height || 591}
                className='h-auto w-full object-cover'
              />
            </div>
            <div className='flex w-full max-w-md flex-col items-start gap-2.5 px-1 pt-1'>
              <h3 className='text-2xl font-medium leading-tight text-[var(--foreground)]'>
                {logo.name}
              </h3>
              {logo.description && (
                <p className='text-lg leading-6 text-[var(--text-secondary)]'>
                  {logo.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
