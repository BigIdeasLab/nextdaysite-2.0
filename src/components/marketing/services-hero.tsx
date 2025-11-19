'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
  fadeUpVariant,
} from '@/lib/animation-variants'
import { ShowreelSkeleton } from './showreel-skeleton'

export function ServicesHero({ children }: { children: React.ReactNode }) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0,
  })

  return (
    <section
      ref={ref}
      className='relative flex min-h-[600px] w-full flex-col items-center gap-[90px] px-6 py-14 md:px-12 lg:px-52'
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
          Everything You Need to Build and Grow Online
        </motion.p>
        <motion.h1
          className='text-balance text-center text-[40px] font-normal leading-[1.08] text-[#000] dark:text-[var(--foreground)] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'
          variants={staggerChildVariant}
        >
          Our Services
        </motion.h1>
      </motion.div>
      {children}
    </section>
  )
}
