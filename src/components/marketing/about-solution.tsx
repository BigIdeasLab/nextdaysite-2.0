'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

interface AboutSolutionProps {
  headline: string
  body: string
  image1: string
  image2: string
}

export function AboutSolution({
  headline,
  body,
  image1,
  image2,
}: AboutSolutionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section ref={ref} className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <motion.div
        className='mx-auto flex max-w-5xl flex-col gap-10 md:gap-[60px]'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className='flex flex-col gap-8 md:gap-20'>
          <motion.h2
            className='max-w-[752px] text-[30px] font-medium leading-snug text-foreground sm:text-[40px] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'
            variants={staggerChildVariant}
          >
            {headline}
          </motion.h2>

          <motion.div
            className='flex w-full flex-col items-start gap-5 md:flex-row md:justify-between md:gap-0'
            variants={staggerChildVariant}
          >
            <h3 className='text-2xl font-medium leading-snug text-foreground md:text-[32px] md:leading-[31.5px]'>
              Our Solution
            </h3>
            <p className='max-w-[481px] text-sm leading-normal text-[var(--text-secondary)] md:text-lg md:leading-6'>
              {body}
            </p>
          </motion.div>

          <motion.div
            className='mt-8 flex w-full max-w-[1022px] flex-col items-center gap-5 md:flex-row md:items-start md:gap-[21px]'
            variants={staggerChildVariant}
          >
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
