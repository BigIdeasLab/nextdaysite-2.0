'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

const sentence = 'Own a Stunning Website Without Lifting a Finger'
const words = sentence.split(' ')

import type { Variant } from 'framer-motion'

const wordVariant: Record<string, Variant> = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
}

export function RedesignedHero({ children }: { children: ReactNode }) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      className='relative flex w-full flex-col items-center gap-12 px-6 py-8 md:px-12 md:py-[50px] md:gap-18 lg:px-52'
    >
      <motion.div
        className='flex w-full max-w-[684px] flex-col items-center gap-14 md:gap-[50px]'
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Word-by-word headline */}
        <h1 className='text-center text-[40px] md:text-[60px] font-medium leading-[1.08] text-foreground flex flex-wrap justify-center'>
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariant}
              className='mr-2 inline-block whitespace-nowrap'
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {children}

      <div className='flex flex-wrap items-center justify-center gap-[10px]'>
        <Link
          href='#pricing'
          className='flex h-[48px] items-center justify-center rounded-[30px] bg-[#FF8C00] px-5 text-[16px] font-medium leading-6 text-[#F7F6FF] transition-transform hover:scale-105 md:h-[54px] md:text-[18px]'
        >
          Get Started
        </Link>
        <Link
          href='#pricing'
          className='flex h-[48px] border border-gray-400 items-center justify-center rounded-[30px] bg-[#090808] px-[22px] text-[16px] font-medium leading-6 text-[#F7F6FF] transition-transform hover:scale-105 md:h-[54px] md:px-[26px] md:text-[18px]'
        >
          See Pricing
        </Link>
      </div>
    </section>
  )
}
