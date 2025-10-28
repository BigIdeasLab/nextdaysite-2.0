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
            <Label htmlFor='image_url'>Image URL</Label>
            <Input
              id='image_url'
              name='image_url'
              type='url'
              value={formData.image_url || ''}
              onChange={handleChange}
              placeholder='https://example.com/image.png'
            />
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
