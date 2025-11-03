"use client"

import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

type ContactSubmission = {
  id: string
  first_name: string
  last_name: string
  email: string
  service: string | null
  description: string | null
  created_at: string | null
}

export default function DashboardContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/contact')
        if (!res.ok) throw new Error('Failed to fetch contact submissions')
        const data = await res.json()
        setSubmissions(data)
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <PageHeader title="Contacts" subtitle="User contact form submissions" />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{`${s.first_name} ${s.last_name}`}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.service || '-'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[400px] truncate">{s.description || '-'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.created_at ? new Date(s.created_at).toLocaleString() : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
