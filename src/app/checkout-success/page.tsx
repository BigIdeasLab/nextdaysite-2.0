import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  return (
    <div className='min-h-screen w-full bg-background transition-colors duration-300 px-4 py-16 md:px-8'>
      <div className='mx-auto flex max-w-2xl flex-col items-center gap-8 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10'>
          <CheckCircle2 className='h-8 w-8 text-emerald-600' />
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            Payment successful!
          </h1>
          <p className='text-foreground/70'>
            Thank you for your purchase. We&apos;re excited to get started on
            your project.
          </p>
        </div>

        <div className='w-full rounded-2xl border border-foreground/10 bg-background p-6 text-left'>
          <h2 className='mb-4 text-lg font-semibold text-foreground'>
            What happens next?
          </h2>
          <ol className='space-y-3'>
            <li className='flex gap-3'>
              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white'>
                1
              </span>
              <div>
                <p className='font-medium text-foreground'>
                  Confirmation email sent
                </p>
                <p className='text-sm text-foreground/60'>
                  Check your email for a confirmation and receipt
                </p>
              </div>
            </li>
            <li className='flex gap-3'>
              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white'>
                2
              </span>
              <div>
                <p className='font-medium text-foreground'>
                  Onboarding questionnaire
                </p>
                <p className='text-sm text-foreground/60'>
                  You&apos;ll receive a detailed form to help us understand your
                  vision
                </p>
              </div>
            </li>
            <li className='flex gap-3'>
              <span className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white'>
                3
              </span>
              <div>
                <p className='font-medium text-foreground'>
                  Meet your launch team
                </p>
                <p className='text-sm text-foreground/60'>
                  We&apos;ll schedule a kickoff call within one business day
                </p>
              </div>
            </li>
          </ol>
        </div>

        {resolvedSearchParams.session_id && (
          <p className='text-xs text-foreground/50'>
            Session ID: {resolvedSearchParams.session_id}
          </p>
        )}

        <Link
          href='/'
          className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90'
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
