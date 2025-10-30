'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PortfolioItemRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { S3Upload } from './s3-upload'

interface PortfolioItemFormProps {
  item?: PortfolioItemRow
}

export function PortfolioItemForm({ item }: PortfolioItemFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    slug: item?.slug || '',
    image_url: item?.image_url || '',
    color: item?.color || 'var(--placeholder-gray)',
    published: item?.published ?? true,
  })

  const updateImageUrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/portfolio/${itemId}`, {
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
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['portfolio-item', item.id] })
      }
      console.log('Image URL updated in form data and DB.')
    },
  })

  const handleUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }))
    if (item?.id) {
      updateImageUrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const method = item ? 'PATCH' : 'POST'
      const url = item ? `/api/cms/portfolio/${item.id}` : '/api/cms/portfolio'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save portfolio item')
      }

      return response.json()
    },
    onSuccess: () => {
      console.log('Main mutation onSuccess triggered, navigating...')
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['portfolio-item', item.id] })
      }
      router.push('/dashboard/cms/portfolio')
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

  const deleteImageMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/portfolio/${itemId}`, {
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
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['portfolio-item', item.id] })
      }
      setFormData((prev) => ({ ...prev, image_url: '' })) // Clear local state
      console.log('Image URL cleared from form data and DB updated.')
    },
  })

  const handleDeleteImage = async () => {
    if (!formData.image_url || !item?.id) return

    const url = new URL(formData.image_url)
    const key = url.pathname.split('/').pop()

    if (!key) {
      console.error('Could not extract key from image URL:', formData.image_url)
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
      console.error('Error deleting image:', error)
      alert(error.message)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>{item ? 'Edit Item' : 'Create New Item'}</CardTitle>
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
              placeholder='e.g., EcoTrack'
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
              placeholder='e.g., ecotrack'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Describe the project...'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image_url'>Image</Label>
            <S3Upload onUploadSuccess={handleUploadSuccess} />
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
                  disabled={mutation.isPending}
                  className='bg-red-500 text-white hover:bg-red-600'
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='color'>Color</Label>
            <Input
              id='color'
              name='color'
              value={formData.color || ''}
              onChange={handleChange}
              placeholder='var(--placeholder-gray)'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              id='published'
              checked={formData.published}
              onCheckedChange={handleCheckedChange}
            />
            <Label htmlFor='published'>Publish</Label>
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
                  ? 'Update Item'
                  : 'Create Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
