'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'

interface AboutIntroProps {
  headline: string
  body: string
  image: string
}

export function AboutIntro({ headline, body, image }: AboutIntroProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section ref={ref} className='relative w-full px-6 py-[110px] md:px-12 lg:px-52'>
      <motion.div
        className='mx-auto flex max-w-5xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className='relative hidden items-center justify-center md:flex md:w-1/3' variants={staggerChildVariant}>
          <Image
            src={image}
            alt='About NextDaySite'
            width={424}
            height={424}
            className='h-auto w-full max-w-[300px]'
          />
        </motion.div>
        <motion.div className='flex flex-col gap-6 md:w-2/3' variants={staggerChildVariant}>
          <h2 className='text-3xl font-medium leading-tight text-[var(--foreground)] md:text-[32px]'>
            {headline}
          </h2>
          <p className='text-lg leading-relaxed text-[var(--text-secondary)]'>
            {body}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
