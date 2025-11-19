'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'

interface AboutHeroProps {
  headline: string
  image1: string
  image2: string
}

export function AboutHero({ headline, image1, image2 }: AboutHeroProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section ref={ref} className='relative flex min-h-[400px] w-full flex-col items-center gap-8 px-6 py-12 md:px-12 lg:px-52'>
      <motion.div
        className='z-10 flex w-full max-w-[752px] flex-col items-center gap-2.5'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className='text-balance text-center text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl md:leading-[1.08]'
          variants={staggerChildVariant}
        >
          {headline}
        </motion.h1>
      </motion.div>

      <motion.div
        className='mt-8 flex w-full max-w-[1022px] flex-col items-center gap-5 md:flex-row md:items-start md:gap-[21px]'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className='flex w-full max-w-[501px] flex-col items-center gap-5' variants={staggerChildVariant}>
          <div className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#545454] md:rounded-[50px]'>
            <Image
              src={image1}
              alt='Portfolio showcase 1'
              width={788}
              height={591}
              className='h-full w-full object-cover'
            />
          </div>
        </motion.div>
        <motion.div className='flex w-full max-w-[501px] flex-col items-center gap-5 md:mt-[130px]' variants={staggerChildVariant}>
          <div className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#545454] md:rounded-[50px]'>
            <Image
              src={image2}
              alt='Portfolio showcase 2'
              width={788}
              height={591}
              className='h-full w-full object-cover'
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
