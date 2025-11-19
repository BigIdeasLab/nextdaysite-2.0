'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'

export interface AboutProcessProps {
  step1Title: string
  step1Description: string
  step2Title: string
  step2Description: string
  step3Title: string
  step3Description: string
  step4Title: string
  step4Description: string
}

export function AboutProcess({
  step1Title,
  step1Description,
  step2Title,
  step2Description,
  step3Title,
  step3Description,
  step4Title,
  step4Description,
}: AboutProcessProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  const steps = [
    {
      number: '1.',
      title: step1Title,
      description: step1Description,
    },
    {
      number: '2.',
      title: step2Title,
      description: step2Description,
    },
    {
      number: '3.',
      title: step3Title,
      description: step3Description,
    },
    {
      number: '4.',
      title: step4Title,
      description: step4Description,
    },
  ]

  return (
    <section ref={ref} className='w-full rounded-t-[50px] bg-[var(--dark-section)] px-6 py-20 md:px-12 lg:px-24'>
      <motion.div
        className='mx-auto flex max-w-5xl flex-col gap-12 md:gap-16'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl'
          variants={staggerChildVariant}
        >
          Our Process
        </motion.h2>

        <motion.div
          className='flex flex-col gap-12 md:gap-20'
          variants={fadeUpContainerVariant}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className='flex flex-col gap-6 md:gap-8' variants={staggerChildVariant}>
              <div className='flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between'>
                <h3 className='text-2xl font-medium leading-tight text-foreground md:text-3xl'>
                  {step.number} {step.title}
                </h3>
                <p className='max-w-full text-base leading-relaxed text-[var(--pricing-label-text)] md:max-w-md md:text-lg'>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className='h-px w-full bg-foreground/20' />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
