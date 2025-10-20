'use client'

import { CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/format'
import type { InvoicesRow } from '@/types/models'

interface PaymentHistoryProps {
  payments: InvoicesRow[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const paidInvoices = payments.filter((inv) => inv.status === 'paid')

  return (
    <div className='flex w-full justify-center rounded-[30px] border border-[#343333] bg-[#131313] p-5 md:p-[30px]'>
      <div className='flex w-full max-w-[1068px] flex-col gap-2'>
        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-medium leading-5 text-[#F7F6FF]'>
            Payment History
          </h2>
          <p className='text-base font-normal leading-[22px] text-[#9BA1A6]'>
            View and download your invoices
          </p>
        </div>

        {/* Payment List */}
        <div className='flex flex-col gap-4 px-0 md:px-3'>
          {paidInvoices.length === 0 ? (
            <div className='flex items-center justify-center p-8'>
              <p className='text-base text-[#9BA1A6]'>No payments found</p>
            </div>
          ) : (
            paidInvoices.map((payment) => (
              <div
                key={payment.id}
                className='flex h-[49px] items-center justify-between'
              >
                {/* Left Section - Icon and Payment Info */}
                <div className='flex items-center gap-3'>
                  {/* Icon */}
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#4D3120]'>
                    <CreditCard className='h-[18px] w-[18px] text-[#FF8C00]' />
                  </div>

                  {/* Payment Info */}
                  <div className='flex flex-col gap-1.5'>
                    <h3 className='text-lg font-medium leading-4 text-[#F7F6FF]'>
                      Payment received
                    </h3>
                    <p className='text-sm font-normal leading-[22px] text-[#9BA1A6]'>
                      {formatDate(payment.issued_at)}
                    </p>
                  </div>
                </div>

                {/* Right Section - Amount */}
                <div className='flex w-[69px] items-center justify-end gap-2.5 py-2'>
                  <p className='text-right text-base font-medium leading-5 text-[#F7F6FF]'>
                    {formatCurrency(payment.total, payment.currency)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
