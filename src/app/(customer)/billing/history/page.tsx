'use client'

import Link from 'next/link'
import { useInvoices } from '@/hooks/use-invoices'
import { InvoiceHistory } from '@/components/dashboard/invoice-history'
import { PaymentHistory } from '@/components/dashboard/payment-history'
import { Skeleton } from '@/components/ui/skeleton'

export default function BillingHistoryPage() {
  const { data: invoices, isLoading, isError } = useInvoices()

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
          {/* Breadcrumbs */}
          <div className='flex flex-col gap-5'>
            <p className='text-lg font-light text-[#9BA1A6]'>
              <Link href='/dashboard' className='hover:underline'>
                Homepage
              </Link>{' '}
              &gt; Billing Management
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap items-center gap-2.5'>
            <Link
              href='/project'
              className='flex h-12 items-center justify-center rounded-[30px] bg-[#FF8C00] px-5 text-center text-base font-medium text-[#F7F6FF] transition-opacity hover:opacity-90'
            >
              New Project
            </Link>
            <Link
              href='/billing/history'
              className='flex h-12 items-center justify-center rounded-[30px] bg-[#202020] px-5 text-center text-base font-medium text-[#F7F6FF] transition-opacity hover:opacity-90'
            >
              View Invoices
            </Link>
          </div>
        </div>

        <Skeleton className='h-32 w-full' />
        <Skeleton className='h-32 w-full' />
      </div>
    )
  }

  if (isError) {
    return <div>Error loading invoices.</div>
  }

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
        {/* Breadcrumbs */}
        <div className='flex flex-col gap-5'>
          <p className='text-lg font-light text-[#9BA1A6]'>
            <Link href='/dashboard' className='hover:underline'>
              Homepage
            </Link>{' '}
            &gt; Billing Management
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap items-center gap-2.5'>
          <Link
            href='/project'
            className='flex h-12 items-center justify-center rounded-[30px] bg-[#FF8C00] px-5 text-center text-base font-medium text-[#F7F6FF] transition-opacity hover:opacity-90'
          >
            New Project
          </Link>
          <Link
            href='/billing/history'
            className='flex h-12 items-center justify-center rounded-[30px] bg-[#202020] px-5 text-center text-base font-medium text-[#F7F6FF] transition-opacity hover:opacity-90'
          >
            View Invoices
          </Link>
        </div>
      </div>

      <InvoiceHistory invoices={invoices || []} />
      <PaymentHistory payments={invoices || []} />
    </div>
  )
}
