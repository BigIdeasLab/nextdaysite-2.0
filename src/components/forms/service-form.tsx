'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ServiceRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { S3Upload } from './s3-upload'

interface ServiceFormProps {
  item?: ServiceRow
}

export function ServiceForm({ item }: ServiceFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    slug: item?.slug || '',
    image1_url: item?.image1_url || '',
    image2_url: item?.image2_url || '',
  })

  const updateImage1UrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/services/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image1_url: imageUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update image1 URL in DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['service', item.id] })
      }
    },
  })

  const deleteImage1Mutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/services/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image1_url: null }), // Set image1_url to null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 'Failed to delete image1 URL from DB',
        )
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['service', item.id] })
      }
      setFormData((prev) => ({ ...prev, image1_url: '' })) // Clear local state
    },
  })

  const handleUpload1Success = (url: string) => {
    setFormData((prev) => ({ ...prev, image1_url: url }))
    if (item?.id) {
      updateImage1UrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const handleUpload2Success = (url: string) => {
    setFormData((prev) => ({ ...prev, image2_url: url }))
    if (item?.id) {
      updateImage2UrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const updateImage2UrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/services/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image2_url: imageUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update image2 URL in DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['service', item.id] })
      }
    },
  })

  const deleteImage2Mutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/services/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image2_url: null }), // Set image2_url to null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 'Failed to delete image2 URL from DB',
        )
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['service', item.id] })
      }
      setFormData((prev) => ({ ...prev, image2_url: '' })) // Clear local state
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const method = item ? 'PATCH' : 'POST'
      const url = item ? `/api/cms/services/${item.id}` : '/api/cms/services'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save service')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['service', item.id] })
      }
      router.push('/dashboard/cms/services')
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const handleDeleteImage1 = async () => {
    if (!formData.image1_url || !item?.id) return

    const url = new URL(formData.image1_url)
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
      deleteImage1Mutation.mutate(item.id)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleDeleteImage2 = async () => {
    if (!formData.image2_url || !item?.id) return

    const url = new URL(formData.image2_url)
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
      deleteImage2Mutation.mutate(item.id)
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>{item ? 'Edit Service' : 'Create New Service'}</CardTitle>
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
            <Label htmlFor='title'>Title *</Label>
            <Input
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              placeholder='e.g., Mobile App Development'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='slug'>Slug *</Label>
            <Input
              id='slug'
              name='slug'
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder='e.g., mobile-app-development'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description || ''}
              onChange={handleChange}
              placeholder='Describe the service...'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image1_url'>Image 1</Label>
            <S3Upload onUploadSuccess={handleUpload1Success} />
            {formData.image1_url && (
              <div className='mt-4 flex items-center space-x-2'>
                <p className='text-sm text-gray-500'>Uploaded Image:</p>
                <a
                  href={formData.image1_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline truncate'
                >
                  {formData.image1_url.split('/').pop()}
                </a>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteImage1()
                  }}
                  disabled={mutation.isPending}
                  className='bg-red-500 text-white hover:bg-red-600'
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image2_url'>Image 2</Label>
            <S3Upload onUploadSuccess={handleUpload2Success} />
            {formData.image2_url && (
              <div className='mt-4 flex items-center space-x-2'>
                <p className='text-sm text-gray-500'>Uploaded Image:</p>
                <a
                  href={formData.image2_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline truncate'
                >
                  {formData.image2_url.split('/').pop()}
                </a>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteImage2()
                  }}
                  disabled={mutation.isPending}
                  className='bg-red-500 text-white hover:bg-600'
                >
                  Delete
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
                  ? 'Update Service'
                  : 'Create Service'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
