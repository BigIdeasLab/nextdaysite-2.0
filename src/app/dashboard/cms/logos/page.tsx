'use client'

import { useLogos } from '@/hooks/use-cms-content'
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
import Image from 'next/image'

export default function ManageLogosPage() {
  const queryClient = useQueryClient()
  const { data: logos, isLoading, error } = useLogos()

  const deleteLogoMutation = useMutation({
    mutationFn: async (logoId: string) => {
      const response = await fetch(`/api/cms/logos/${logoId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete logo')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logos'] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this logo?')) {
      deleteLogoMutation.mutate(id)
    }
  }

  if (error) return <div>Error loading logos: {error.message}</div>

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Logos</h1>
        <Link href='/dashboard/cms/logos/new'>
          <Button>Add New Logo</Button>
        </Link>
      </div>
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logos?.map((logo) => (
              <TableRow key={logo.id}>
                <TableCell>
                  <Image
                    src={logo.image_url}
                    alt={logo.name}
                    width={logo.width || 50}
                    height={logo.height || 50}
                    className='rounded-md'
                  />
                </TableCell>
                <TableCell className='font-medium'>{logo.name}</TableCell>
                <TableCell className='text-right'>
                  <Link href={`/dashboard/cms/logos/edit/${logo.id}`}>
                    <Button variant='outline' size='sm' className='mr-2'>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(logo.id)}
                    disabled={deleteLogoMutation.isPending}
                  >
                    {deleteLogoMutation.isPending ? 'Deleting...' : 'Delete'}
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
