'use client'

import { useInvoices, useSubscriptions } from '@/hooks'
import { Calendar, CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/format'
import Link from 'next/link'
import { PricingPlans } from './pricing-plans'

export function Billing() {
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices()
  const { data: subscriptions = [], isLoading: subscriptionsLoading } =
    useSubscriptions()

  const openInvoices = invoices.filter((inv) => inv.status === 'open')
  const paidInvoices = invoices.filter((inv) => inv.status === 'paid')

  const outstandingBalance = openInvoices.reduce(
    (sum, inv) => sum + inv.total,
    0,
  )

  const lastSixMonths = new Date()
  lastSixMonths.setMonth(lastSixMonths.getMonth() - 6)

  const totalPaid = paidInvoices
    .filter((inv) => new Date(inv.issued_at) >= lastSixMonths)
    .reduce((sum, inv) => sum + inv.total, 0)

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active',
  )

  if (invoicesLoading || subscriptionsLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-lg text-[#9BA1A6]'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col gap-[42px] px-4 py-6 md:px-6 lg:px-8'>
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
            href='/billing?view=invoices'
            className='flex h-12 items-center justify-center rounded-[30px] bg-[#202020] px-5 text-center text-base font-medium text-[#F7F6FF] transition-opacity hover:opacity-90'
          >
            View Invoices
          </Link>
        </div>
      </div>

      {/* Title Section */}
      <div className='flex flex-col gap-[30px]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl font-medium leading-[50px] text-[#F7F6FF]'>
            Billing &amp; Payments
          </h1>
          <p className='text-lg font-light leading-[22px] text-[#9BA1A6]'>
            Manage your plan, payments, and hosting options.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='flex flex-col gap-2.5 md:flex-row'>
        {/* Outstanding Balance */}
        <div className='flex flex-col gap-4 rounded-xl border border-[#343333] bg-[#202020] p-4 md:flex-1'>
          <p className='text-[15px] font-medium leading-4 text-[#9BA1A6]'>
            Outstanding Balance
          </p>
          <div className='flex flex-col gap-2'>
            <p className='text-[35px] font-medium leading-9 text-[#F7F6FF]'>
              {formatCurrency(outstandingBalance, 'usd')}
            </p>
            {openInvoices.length > 0 && (
              <div className='inline-flex items-center justify-center gap-2.5 self-start rounded-3xl border border-[#F7BD01] bg-[#4C3E21] px-[15px] py-[15px]'>
                <span className='text-sm leading-[50px] text-[#F7BD01]'>
                  {openInvoices.length} Invoice
                  {openInvoices.length !== 1 ? 's' : ''} Due
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Total Paid */}
        <div className='flex flex-col gap-4 rounded-xl border border-[#343333] bg-[#202020] p-4 md:flex-1'>
          <p className='text-[15px] font-medium leading-4 text-[#9BA1A6]'>
            Total Paid
          </p>
          <div className='flex flex-col gap-[18px]'>
            <p className='text-[35px] font-medium leading-9 text-[#F7F6FF]'>
              {formatCurrency(totalPaid, 'usd')}
            </p>
            <p className='text-[15px] font-medium leading-4 text-[#9BA1A6]'>
              Last 6 months
            </p>
          </div>
        </div>
      </div>

      {/* Active Subscriptions Section */}
      <div className='flex flex-col gap-[25px]'>
        <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
          <h2 className='text-[22px] font-medium leading-[50px] text-[#F7F6FF]'>
            Your Active Subscription
          </h2>
          <button className='flex h-[54px] items-center justify-center rounded-[30px] border border-[#3E3E3E] px-[26px] text-xl font-medium leading-6 text-[#F7F6FF] transition-colors hover:border-[#5E5E5E]'>
            See All
          </button>
        </div>

        {/* Subscription Cards Grid */}
        <div className='grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {activeSubscriptions.length === 0 ? (
            <div className='col-span-full rounded-[20px] border border-[#343333] bg-[#202020] p-8 text-center'>
              <p className='text-lg text-[#9BA1A6]'>No active subscriptions</p>
            </div>
          ) : (
            activeSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

type SubscriptionCardProps = {
  subscription: {
    id: string
    plan: { name: string } | null
    total: number
    billing_cycle: string
    currency: string
    current_period_end: string | null
    created_at: string
    status: string
  }
}

function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const displayPrice = () => {
    const amount = formatCurrency(subscription.total, subscription.currency)
    if (subscription.billing_cycle === 'monthly') {
      return (
        <>
          <span className='text-2xl font-bold leading-[50px] text-[#FF8C00]'>
            {amount}
          </span>
          <span className='text-base font-normal leading-5 text-[#9BA1A6]'>
            /month
          </span>
        </>
      )
    }
    return (
      <span className='text-2xl font-bold leading-[50px] text-[#FF8C00]'>
        {amount}
      </span>
    )
  }

  return (
    <div className='flex flex-col gap-[15px] rounded-[20px] border border-[#343333] bg-[#202020] p-[10px]'>
      {/* Header with plan name and status */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-0.5'>
          <h3 className='text-lg font-medium leading-[29px] text-[#F7F6FF]'>
            {subscription.plan?.name || 'Unknown Plan'}
          </h3>
          <p className='text-base font-normal leading-5 text-[#9BA1A6]'>
            Subscribed: {formatDate(subscription.created_at)}
          </p>
        </div>
        <div className='flex items-center justify-center gap-2.5 rounded-3xl border border-[#FF8C00] bg-[#452600] px-2 py-[15px]'>
          <span className='text-[13px] font-normal leading-[50px] text-[#FF8C00]'>
            Active
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2.5 rounded-xl bg-[#262627] p-[15px]'>
          <div className='flex flex-col gap-[5px]'>
            <h4 className='text-base font-medium leading-[22px] text-[#F7F6FF]'>
              {subscription.plan?.name || 'Subscription'}
            </h4>
            <div className='flex items-center gap-[5px]'>{displayPrice()}</div>
          </div>
        </div>

        {/* Billing Info */}
        <div className='flex items-center gap-2 rounded-xl bg-[#262626] p-[10px]'>
          <Calendar className='h-[18px] w-[18px] text-white' />
          <div className='flex flex-col gap-[3px]'>
            <p className='text-base font-normal leading-4 text-[#9BA1A6]'>
              Next Billing
            </p>
            <p className='text-base font-medium leading-5 text-[#F7F6FF]'>
              {formatDate(subscription.current_period_end)}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className='flex items-center gap-2 rounded-xl bg-[#262727] p-[10px]'>
          <CreditCard className='h-[18px] w-[18px] text-white' />
          <div className='flex flex-col gap-[3px]'>
            <p className='text-base font-normal leading-4 text-[#9BA1A6]'>
              Payment Method
            </p>
            <p className='text-base font-medium leading-5 text-[#F7F6FF]'>
              •••• 4242
            </p>
          </div>
        </div>
      </div>

      {/* Manage Button */}
      <button className='flex items-center justify-center self-stretch rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] px-[26px] py-[15px] text-lg font-bold leading-6 text-[#F7F6FF] transition-opacity hover:opacity-90'>
        Manage
      </button>
    </div>
  )
}
