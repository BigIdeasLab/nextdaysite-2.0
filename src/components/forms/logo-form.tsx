'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LogoRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { S3Upload } from './s3-upload'

interface LogoFormProps {
  item?: LogoRow
}

export function LogoForm({ item }: LogoFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    image_url: item?.image_url || '',
  })

  const updateImageUrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/logos/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update image URL in DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logos'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['logo', item.id] })
      }
    },
  })

  const deleteImageMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/logos/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: null }), // Set image_url to null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete image URL from DB')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logos'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['logo', item.id] })
      }
      setFormData((prev) => ({ ...prev, image_url: '' })) // Clear local state
    },
  })
  const handleUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }))
    if (item?.id) {
      updateImageUrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const handleDeleteImage = async () => {
    if (!formData.image_url || !item?.id) return

    const url = new URL(formData.image_url)
    const key = url.pathname.split('/').pop()

    if (!key) {
      alert('Could not extract image key for deletion.')
      return
    }

    try {
      // First, delete from S3
      const response = await fetch('/api/aws/s3-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete image from S3')
      }

      // Then, update the database via the new mutation
      deleteImageMutation.mutate(item.id)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const method = item ? 'PATCH' : 'POST'
      const url = item ? `/api/cms/logos/${item.id}` : '/api/cms/logos'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save logo')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logos'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['logo', item.id] })
      }
      router.push('/dashboard/cms/logos')
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>{item ? 'Edit Logo' : 'Create New Logo'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {mutation.error && (
            <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-lg p-4'>
              <p className='text-red-700 dark:text-red-300'>
                {mutation.error.message}
              </p>
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='name'>Name *</Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              placeholder='e.g., Google'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='e.g., A search engine company.'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image_url'>Image</Label>
            <S3Upload onUploadSuccess={handleUploadSuccess} category='logos' />
            {formData.image_url && (
              <div className='mt-4 flex items-center space-x-2'>
                <p className='text-sm text-gray-500'>Uploaded Image:</p>
                <a
                  href={formData.image_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline truncate'
                >
                  {formData.image_url.split('/').pop()}
                </a>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteImage()
                  }}
                  disabled={deleteImageMutation.isPending}
                  className='bg-red-500 text-white hover:bg-red-600'
                >
                  {deleteImageMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            )}
          </div>

          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={mutation.isPending}>
              {mutation.isPending
                ? 'Saving...'
                : item
                  ? 'Update Logo'
                  : 'Create Logo'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
