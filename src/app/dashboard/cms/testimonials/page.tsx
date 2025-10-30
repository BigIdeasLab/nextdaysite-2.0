'use client'

import { useTestimonials } from '@/hooks/use-cms-content'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ManageTestimonialsPage() {
  const queryClient = useQueryClient()
  const { data: items, isLoading, error } = useTestimonials()

  const deleteMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/testimonials/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete item')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <div>Loading testimonials...</div>
  if (error) return <div>Error loading items: {error.message}</div>

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Testimonials</h1>
        <Link href='/dashboard/cms/testimonials/new'>
          <Button>Add New Testimonial</Button>
        </Link>
      </div>
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.name}</TableCell>
                <TableCell>{item.quote}</TableCell>
                <TableCell>
                  {item.avatar_url && (
                    <Image
                      src={item.avatar_url}
                      alt={item.name}
                      width={40}
                      height={40}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  )}
                </TableCell>
                <TableCell>
                  {item.logo_url && (
                    <Image
                      src={item.logo_url}
                      alt={`${item.name} logo`}
                      width={40}
                      height={40}
                      className='w-10 h-10 object-contain'
                    />
                  )}
                </TableCell>
                <TableCell className='text-right'>
                  <Link href={`/dashboard/cms/testimonials/edit/${item.id}`}>
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
      </div>
      <div className='mt-4'>
        <Link href='/dashboard/cms'>
          <Button variant='outline'>Back to CMS Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
