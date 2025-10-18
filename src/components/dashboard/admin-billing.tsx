'use client'

import { useInvoices } from '@/hooks'
import { formatCurrency } from '@/lib/utils/format'
import { format } from 'date-fns'

export function AdminBilling() {
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices()

  const totalRevenue = invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((acc, invoice) => acc + invoice.total, 0)

  if (invoicesLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Financial Overview
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Monitor all financial activity and revenue.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <h3 className='text-lg font-semibold text-foreground'>Total Revenue</h3>
          <p className='mt-2 text-3xl font-bold text-foreground'>
            {formatCurrency(totalRevenue)}
          </p>
        </section>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <h3 className='text-lg font-semibold text-foreground'>Total Invoices</h3>
          <p className='mt-2 text-3xl font-bold text-foreground'>
            {invoices.length}
          </p>
        </section>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <h3 className='text-lg font-semibold text-foreground'>Open Invoices</h3>
          <p className='mt-2 text-3xl font-bold text-foreground'>
            {invoices.filter((i) => i.status === 'open').length}
          </p>
        </section>
      </div>

      <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
        <div className='overflow-x-auto -mx-4 sm:mx-0'>
          <table className='min-w-full divide-y divide-foreground/10'>
            <thead>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Invoice ID
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Customer
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Amount
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-foreground/10'>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground'>
                    {invoice.id}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {invoice.user_id}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {invoice.status}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                    {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
