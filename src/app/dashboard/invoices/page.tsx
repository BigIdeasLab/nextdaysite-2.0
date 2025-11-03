'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PageHeader } from '@/components/ui/page-header'
import { Database } from '@/types/database'

type Invoice = Database['public']['Tables']['invoices']['Row']

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices')
        if (!response.ok) throw new Error('Failed to fetch invoices')
        const data = await response.json()
        setInvoices(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <PageHeader title='Invoices' subtitle='Billing and payments' />
      <div className='rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className='font-mono text-xs'>
                  {invoice.id}
                </TableCell>
                <TableCell>${invoice.total}</TableCell>
                <TableCell>
                  <span className='inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-foreground/80 dark:border-gray-800'>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className='font-mono text-xs'>
                  {invoice.user_id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
