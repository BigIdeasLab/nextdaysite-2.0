'use client'

import { useInvoices } from '@/hooks'
import { InvoiceSummary } from '@/components/dashboard/invoice-summary'

export function Billing() {
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices()

  if (invoicesLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Billing
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Manage your invoices and payment methods.
        </p>
      </header>
      <InvoiceSummary invoices={invoices} title='All Invoices' />
    </div>
  )
}
