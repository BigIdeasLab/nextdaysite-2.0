'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Suspense } from 'react'
import { Showreel } from './showreel'
import { ShowreelSkeleton } from './showreel-skeleton'

export function RedesignedHeroClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className='relative flex w-full flex-col items-center gap-12 px-6 py-8 md:px-12 md:py-[50px] md:gap-20 lg:px-52'>
      <motion.div
        className='flex w-full max-w-[684px] flex-col items-center gap-14 md:gap-[50px]'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div
          className='flex w-full flex-col items-center gap-5'
          variants={itemVariants}
        >
          <h1 className='text-center text-[40px] font-medium leading-[1.08] text-foreground md:text-[60px] md:leading-[64.8px]'>
            Own a Stunning Website Without Lifting a Finger
          </h1>
        </motion.div>
      </motion.div>

      <motion.div
        className='w-full flex flex-col items-center gap-8'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={itemVariants}>
          <Suspense fallback={<ShowreelSkeleton />}>
            <Showreel />
          </Suspense>
        </motion.div>

        <motion.div
          className='flex flex-wrap items-center justify-center gap-[10px]'
          variants={itemVariants}
        >
          <Link
            href='#pricing'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#FF8C00] px-5 text-[16px] font-medium leading-6 text-[#F7F6FF] transition-transform hover:scale-105 md:h-[54px] md:text-[18px]'
          >
            Get Started
          </Link>
          <Link
            href='#pricing'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#090808] px-[22px] text-[16px] font-medium leading-6 text-[#F7F6FF] transition-transform hover:scale-105 md:h-[54px] md:px-[26px] md:text-[18px]'
          >
            See Pricing
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
