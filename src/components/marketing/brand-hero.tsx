'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

export function BrandHero() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      className='relative flex w-full flex-col items-center gap-8 px-6 py-16 md:px-12 lg:px-52'
    >
      <motion.div
        className='z-10 flex w-full max-w-[684px] flex-col items-center gap-2.5'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.p
          className='text-balance text-center text-[16px] leading-[24px] text-[#9BA1A6] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]'
          variants={staggerChildVariant}
        >
          We Design Brands That Stand Out.
        </motion.p>
        <motion.h1
          className='text-balance text-center text-[40px] font-normal leading-[1.08] text-[#000] dark:text-[var(--foreground)] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'
          variants={staggerChildVariant}
        >
          Brand Identity
        </motion.h1>
      </motion.div>
    </section>
  )
}
