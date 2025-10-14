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
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900'>Total Revenue</h3>
          <p className='mt-2 text-3xl font-bold text-gray-900'>
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900'>Total Invoices</h3>
          <p className='mt-2 text-3xl font-bold text-gray-900'>
            {invoices.length}
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-medium text-gray-900'>Open Invoices</h3>
          <p className='mt-2 text-3xl font-bold text-gray-900'>
            {invoices.filter((i) => i.status === 'open').length}
          </p>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Invoice ID
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Customer
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Amount
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {invoice.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {invoice.user_id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {invoice.status}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {formatCurrency(invoice.total)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
