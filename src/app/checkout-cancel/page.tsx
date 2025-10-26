import Link from 'next/link'
import { X } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className='min-h-screen w-full bg-background transition-colors duration-300 px-4 py-16 md:px-8'>
      <div className='mx-auto flex max-w-2xl flex-col items-center gap-8 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10'>
          <X className='h-8 w-8 text-rose-600' />
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            Payment cancelled
          </h1>
          <p className='text-foreground/70'>
            Your checkout has been cancelled. No payment was processed.
          </p>
        </div>

        <div className='w-full rounded-2xl border border-foreground/10 bg-background p-6'>
          <p className='mb-4 text-sm text-foreground/70'>
            If you have any questions or would like to try again, feel free to
            reach out to our team or return to select a plan.
          </p>
          <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <Link
              href='/#pricing'
              className='inline-flex items-center justify-center rounded-full border border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/10'
            >
              View plans
            </Link>
            <Link
              href='/contact'
              className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90'
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
