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
    icon: item?.icon || '',
    published: item?.published ?? true,
  })

  const handleUpload1Success = (url: string) => {
    setFormData((prev) => ({ ...prev, image1_url: url }))
  }

  const handleUpload2Success = (url: string) => {
    setFormData((prev) => ({ ...prev, image2_url: url }))
  }

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
              <div className='mt-4'>
                <p className='text-sm text-gray-500'>Uploaded Image URL:</p>
                <a
                  href={formData.image1_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  {formData.image1_url}
                </a>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image2_url'>Image 2</Label>
            <S3Upload onUploadSuccess={handleUpload2Success} />
            {formData.image2_url && (
              <div className='mt-4'>
                <p className='text-sm text-gray-500'>Uploaded Image URL:</p>
                <a
                  href={formData.image2_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  {formData.image2_url}
                </a>
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='icon'>Icon</Label>
            <Input
              id='icon'
              name='icon'
              value={formData.icon || ''}
              onChange={handleChange}
              placeholder='Icon name or SVG code'
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
                  ? 'Update Service'
                  : 'Create Service'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
