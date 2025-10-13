'use client'

export function AdminSettings() {
  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          System Settings
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Manage system-wide settings and configurations.
        </p>
      </header>
      <div className='flex flex-col gap-8'>
        <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <h2 className='text-lg font-semibold'>Feature Flags</h2>
          <p className='text-sm text-foreground/70'>
            Enable or disable features for all users.
          </p>
          {/* Add feature flag toggles here */}
        </section>
        <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <h2 className='text-lg font-semibold'>Integrations</h2>
          <p className='text-sm text-foreground/70'>
            Manage third-party integrations.
          </p>
          {/* Add integration settings here */}
        </section>
      </div>
    </div>
  )
}
