export default function CheckoutPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Complete your NextDaySite launch
        </h1>
        <p className="text-sm text-foreground/70 sm:text-base">
          Secure checkout powered by Stripe with instant onboarding after payment.
        </p>
      </header>
    </div>
  );
}
