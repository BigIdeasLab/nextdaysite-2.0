'use client'

import { useServices } from '@/hooks/use-cms-content'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ManageServicesPage() {
  const queryClient = useQueryClient()
  const { data: services, isLoading, error } = useServices()

  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const response = await fetch(`/api/cms/services/${serviceId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete service')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteServiceMutation.mutate(id)
    }
  }

  if (isLoading) return <div>Loading services...</div>
  if (error) return <div>Error loading services: {error.message}</div>

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Services</h1>
        <Link href='/dashboard/cms/services/new'>
          <Button>Add New Service</Button>
        </Link>
      </div>
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className='font-medium'>{service.title}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell className='text-right'>
                  <Link href={`/dashboard/cms/services/edit/${service.id}`}>
                    <Button variant='outline' size='sm' className='mr-2'>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(service.id)}
                    disabled={deleteServiceMutation.isPending}
                  >
                    {deleteServiceMutation.isPending ? 'Deleting...' : 'Delete'}
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
