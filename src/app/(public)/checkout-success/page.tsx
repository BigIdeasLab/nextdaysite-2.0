import Link from 'next/link'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <div className='w-full bg-background transition-colors duration-300 pt-20'>
      <main className='w-full px-4 py-12 md:px-8 md:py-16 lg:py-20'>
        <div className='mx-auto flex max-w-6xl flex-col items-center'>
          {/* Title Section */}
          <div className='mb-12 flex w-full max-w-3xl flex-col items-center gap-5 text-center md:mb-16'>
            <h1 className='text-4xl font-medium capitalize leading-tight text-foreground md:text-5xl lg:text-6xl'>
              Payment successful!
            </h1>
            <p className='max-w-md text-base text-[var(--text-secondary)] md:text-lg lg:text-xl'>
              We&apos;re excited to start building your project.
              <br />A confirmation Mail has been sent to your email address.
            </p>
          </div>

          {/* {resolvedSearchParams.session_id && (
            <p className='mt-8 text-xs text-foreground/50'>
              Session ID: {resolvedSearchParams.session_id}
            </p>
          )} */}
        </div>
      </main>
    </div>
  )
}
