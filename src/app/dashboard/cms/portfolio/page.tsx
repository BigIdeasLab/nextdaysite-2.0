'use client'

import { usePortfolioItems } from '@/hooks/use-cms-content'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'

export default function ManagePortfolioPage() {
  const queryClient = useQueryClient()
  const { data: items, isLoading, error } = usePortfolioItems()

  const deleteMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/portfolio/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <div>Loading portfolio items...</div>
  if (error) return <div>Error loading items: {error.message}</div>

  return (
    <div>
      <PageHeader
        title='Portfolio'
        subtitle='Manage projects in your portfolio'
        action={
          <Link href='/dashboard/cms/portfolio/new'>
            <Button>Add New Item</Button>
          </Link>
        }
      />

      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={64}
                        height={64}
                        className='object-cover rounded-md'
                      />
                    )}
                  </TableCell>
                  <TableCell className='font-medium'>{item.title}</TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {item.description}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Link href={`/dashboard/cms/portfolio/edit/${item.id}`}>
                      <Button variant='outline' size='sm' className='mr-2'>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='mt-4'>
        <Link href='/dashboard/cms'>
          <Button variant='outline'>Back to CMS Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
