import Link from 'next/link'

export default function CheckoutPage() {
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 text-center'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
          Start Your Checkout
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Please select a plan from our pricing page to begin the checkout
          process.
        </p>
      </header>
      <Link href='/#pricing'>
        <a className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90'>
          View Pricing
        </a>
      </Link>
    </div>
  )
}
