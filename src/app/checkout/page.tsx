import { CheckoutFlow } from '@/components/forms/checkout-flow'
import { createServerSupabaseClient, fetchPlans } from '@/lib/api'

export default async function CheckoutPage() {
  const supabase = createServerSupabaseClient()
  const plans = await fetchPlans(supabase)
  const defaultPlanId =
    plans.find((plan) => plan.is_featured)?.id ?? plans[0]?.id

  return (
    <div className='mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16'>
      <header className='flex flex-col gap-2 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
          Complete your NextDaySite launch
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Secure checkout powered by Stripe. Choose your plan, add managed
          hosting, and confirm payment to start production within 24 hours.
        </p>
      </header>
      {plans.length ? (
        <CheckoutFlow plans={plans} defaultPlanId={defaultPlanId} />
      ) : (
        <p>No plans available.</p>
      )}
    </div>
  )
}
