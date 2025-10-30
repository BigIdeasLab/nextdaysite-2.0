'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { TestimonialRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { S3Upload } from './s3-upload'

interface TestimonialFormProps {
  item?: TestimonialRow
}

export function TestimonialForm({ item }: TestimonialFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    logo_url: item?.logo_url || '',
    name: item?.name || '',
    quote: item?.quote || '',
    avatar_url: item?.avatar_url || '',
  })

  const updateAvatarUrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/testimonials/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: imageUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update avatar URL in DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['testimonial', item.id] })
      }
      console.log('Avatar URL updated in form data and DB.')
    },
  })

  const deleteAvatarMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/testimonials/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: null }), // Set avatar_url to null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 'Failed to delete avatar URL from DB',
        )
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['testimonial', item.id] })
      }
      setFormData((prev) => ({ ...prev, avatar_url: '' })) // Clear local state
      console.log('Avatar URL cleared from form data and DB updated.')
    },
  })

  const updateLogoUrlMutation = useMutation({
    mutationFn: async ({
      itemId,
      imageUrl,
    }: {
      itemId: string
      imageUrl: string
    }) => {
      const response = await fetch(`/api/cms/testimonials/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: imageUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update logo URL in DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['testimonial', item.id] })
      }
      console.log('Logo URL updated in form data and DB.')
    },
  })

  const deleteLogoMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cms/testimonials/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo_url: null }), // Set logo_url to null
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete logo URL from DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['testimonial', item.id] })
      }
      setFormData((prev) => ({ ...prev, logo_url: '' })) // Clear local state
      console.log('Logo URL cleared from form data and DB updated.')
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const method = item ? 'PATCH' : 'POST'
      const url = item
        ? `/api/cms/testimonials/${item.id}`
        : '/api/cms/testimonials'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save testimonial')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
      if (item) {
        queryClient.invalidateQueries({ queryKey: ['testimonial', item.id] })
      }
      router.push('/dashboard/cms/testimonials')
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

  const handleUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, avatar_url: url }))
    if (item?.id) {
      updateAvatarUrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const handleDeleteAvatar = async () => {
    if (!formData.avatar_url || !item?.id) return

    const url = new URL(formData.avatar_url)
    const key = url.pathname.split('/').pop()

    if (!key) {
      console.error(
        'Could not extract key from avatar URL:',
        formData.avatar_url,
      )
      alert('Could not extract avatar key for deletion.')
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
        throw new Error(errorData.error || 'Failed to delete avatar from S3')
      }

      // Then, update the database via the new mutation
      deleteAvatarMutation.mutate(item.id)
    } catch (error: any) {
      console.error('Error deleting avatar:', error)
      alert(error.message)
    }
  }

  const handleLogoUploadSuccess = (url: string) => {
    setFormData((prev) => ({ ...prev, logo_url: url }))
    if (item?.id) {
      updateLogoUrlMutation.mutate({ itemId: item.id, imageUrl: url })
    }
  }

  const handleDeleteLogo = async () => {
    if (!formData.logo_url || !item?.id) return

    const url = new URL(formData.logo_url)
    const key = url.pathname.split('/').pop()

    if (!key) {
      console.error('Could not extract key from logo URL:', formData.logo_url)
      alert('Could not extract logo key for deletion.')
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
        throw new Error(errorData.error || 'Failed to delete logo from S3')
      }

      // Then, update the database via the new mutation
      deleteLogoMutation.mutate(item.id)
    } catch (error: any) {
      console.error('Error deleting logo:', error)
      alert(error.message)
    }
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>
          {item ? 'Edit Testimonial' : 'Create New Testimonial'}
        </CardTitle>
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
              placeholder='John Doe'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='quote'>Quote *</Label>
            <Textarea
              id='quote'
              name='quote'
              value={formData.quote}
              onChange={handleChange}
              required
              placeholder='What the customer said...'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='avatar_url'>Avatar</Label>
            <S3Upload onUploadSuccess={handleUploadSuccess} />
            {formData.avatar_url && (
              <div className='mt-4 flex items-center space-x-2'>
                <p className='text-sm text-gray-500'>Uploaded Avatar:</p>
                <a
                  href={formData.avatar_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline truncate'
                >
                  {formData.avatar_url.split('/').pop()}
                </a>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteAvatar()
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
            <Label htmlFor='logo_url'>Logo</Label>
            <S3Upload onUploadSuccess={handleLogoUploadSuccess} />
            {formData.logo_url && (
              <div className='mt-4 flex items-center space-x-2'>
                <p className='text-sm text-gray-500'>Uploaded Logo:</p>
                <a
                  href={formData.logo_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline truncate'
                >
                  {formData.logo_url.split('/').pop()}
                </a>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDeleteLogo()
                  }}
                  disabled={mutation.isPending}
                  className='bg-red-500 text-white hover:bg-red-600'
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
                  ? 'Update Testimonial'
                  : 'Create Testimonial'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
