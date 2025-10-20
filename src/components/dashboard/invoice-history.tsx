'use client'

import { Download } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/format'
import type { InvoicesRow } from '@/types/models'

interface InvoiceHistoryProps {
  invoices: InvoicesRow[]
}

export function InvoiceHistory({ invoices }: InvoiceHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getInvoiceNumber = (index: number) => {
    return `INV-${String(index + 1).padStart(3, '0')}`
  }

  const getStatusBadge = (status: string) => {
    if (status === 'paid') {
      return (
        <div className='flex h-[27px] w-[51px] items-center justify-center gap-2.5 rounded-3xl border border-[#17B26A] bg-[#17B26A]/20 px-2 py-1.5'>
          <span className='text-xs font-normal leading-[50px] text-[#17B26A]'>
            Paid
          </span>
        </div>
      )
    }
    return (
      <div className='flex h-[27px] w-[51px] items-center justify-center gap-2.5 rounded-3xl border border-[#F7BD07] bg-[#504427] px-2 py-1.5'>
        <span className='text-xs font-normal leading-[50px] text-[#F7BD07]'>
          Due
        </span>
      </div>
    )
  }

  const handleDownload = (invoice: InvoicesRow) => {
    if (invoice.download_url) {
      window.open(invoice.download_url, '_blank')
    }
  }

  return (
    <div className='flex w-full justify-center rounded-[30px] border border-[#343333] bg-[#131313] p-5 md:p-[30px]'>
      <div className='flex w-full max-w-[1068px] flex-col gap-6'>
        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-medium leading-5 text-[#F7F6FF]'>
            Invoice History
          </h2>
          <p className='text-base font-normal leading-[22px] text-[#9BA1A6]'>
            View and download your invoices
          </p>
        </div>

        {/* Invoice List */}
        <div className='flex flex-col gap-3'>
          {invoices.length === 0 ? (
            <div className='flex items-center justify-center rounded-xl border border-[#202020] bg-[#202020] p-8'>
              <p className='text-base text-[#9BA1A6]'>No invoices found</p>
            </div>
          ) : (
            invoices.map((invoice, index) => (
              <div
                key={invoice.id}
                className='flex flex-col justify-between gap-4 rounded-xl border border-[#202020] bg-[#202020] p-3 md:h-[76px] md:flex-row md:items-center md:px-4 md:py-0'
              >
                {/* Left Section - Invoice Info */}
                <div className='flex flex-wrap items-center gap-3 md:gap-[13px]'>
                  {/* Invoice Number and Issued Date */}
                  <div className='flex w-full flex-col gap-1.5 md:w-[137px]'>
                    <h3 className='text-lg font-medium leading-4 text-[#F7F6FF]'>
                      {getInvoiceNumber(index)}
                    </h3>
                    <p className='text-sm font-normal leading-4 text-[#9BA1A6]'>
                      <span className='text-sm'>Issued:</span>{' '}
                      <span className='text-base'>
                        {formatDate(invoice.issued_at)}
                      </span>
                    </p>
                  </div>

                  {/* Due Date */}
                  <div className='flex flex-col gap-1.5 md:w-[106px]'>
                    <p className='text-sm font-normal leading-[22px] text-[#9BA1A6]'>
                      Due Date
                    </p>
                    <p className='text-base font-medium leading-5 text-[#F7F6FF]'>
                      {formatDate(invoice.due_date)}
                    </p>
                  </div>
                </div>

                {/* Right Section - Amount, Status, Download */}
                <div className='flex items-center gap-2'>
                  {/* Amount */}
                  <div className='flex w-[91px] items-center justify-center gap-2.5 self-stretch px-2.5 py-2'>
                    <p className='text-lg font-bold leading-5 text-[#F7F6FF]'>
                      {formatCurrency(invoice.total, invoice.currency)}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {getStatusBadge(invoice.status)}

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(invoice)}
                    disabled={!invoice.download_url}
                    className='flex h-9 w-[42px] items-center justify-center rounded-[10px] border border-[#343433] bg-black transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50'
                    aria-label='Download invoice'
                  >
                    <Download className='h-[18px] w-[18px] text-white' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
