import Link from 'next/link'
import { X } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className='w-full bg-background transition-colors duration-300 pt-20'>
      <main className='w-full px-4 py-12 md:px-8 md:py-16 lg:py-20'>
        <div className='mx-auto flex max-w-6xl flex-col items-center'>
          <div className='mb-12 flex w-full max-w-3xl flex-col items-center gap-5 text-center md:mb-16'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10'>
              <X className='h-8 w-8 text-rose-600' />
            </div>

            <h1 className='text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl'>
              Payment cancelled
            </h1>

            <p className='max-w-md text-base text-[var(--text-secondary)] md:text-lg lg:text-xl'>
              Your checkout was cancelled and no payment was processed.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
