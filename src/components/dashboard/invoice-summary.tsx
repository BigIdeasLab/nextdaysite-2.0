import type { InvoicesRow } from '@/data/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils/format'

type InvoiceSummaryProps = {
  invoices: InvoicesRow[]
  title?: string
}

export function InvoiceSummary({
  invoices,
  title = 'Invoices',
}: InvoiceSummaryProps) {
  const sorted = [...invoices].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
  )

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
        <span className='text-xs text-foreground/50'>
          {invoices.length} records
        </span>
      </div>
      <div className='space-y-3'>
        {sorted.slice(0, 4).map((invoice) => (
          <article
            key={invoice.id}
            className='flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm shadow-foreground/5'
          >
            <div className='flex items-center justify-between text-sm'>
              <span className='font-semibold text-foreground'>
                {invoice.id}
              </span>
              <span
                className={
                  invoice.status === 'paid'
                    ? 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500'
                    : invoice.status === 'overdue'
                      ? 'rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-500'
                      : 'rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500'
                }
              >
                {invoice.status === 'open' ? 'Due' : invoice.status}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm text-foreground/70'>
              <span>Due {formatDate(invoice.due_date)}</span>
              <span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
            {invoice.download_url ? (
              <a
                className='text-xs font-medium text-foreground transition hover:text-foreground/70'
                href={invoice.download_url}
                target='_blank'
                rel='noreferrer'
              >
                View invoice →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
