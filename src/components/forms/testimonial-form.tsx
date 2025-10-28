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

interface TestimonialFormProps {
  item?: TestimonialRow
}

export function TestimonialForm({ item }: TestimonialFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: item?.name || '',
    quote: item?.quote || '',
    avatar_url: item?.avatar_url || '',
    bg_color: item?.bg_color || '#1A1A1A',
    border_color: item?.border_color || '#2B2B2B',
    text_color: item?.text_color || '#9A9EA2',
    rotate_class: item?.rotate_class || '-rotate-[6deg]',
    position_class: item?.position_class || 'left-0 top-[70px]',
    published: item?.published ?? true,
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
            <Label htmlFor='avatar_url'>Avatar URL</Label>
            <Input
              id='avatar_url'
              name='avatar_url'
              type='url'
              value={formData.avatar_url || ''}
              onChange={handleChange}
              placeholder='https://example.com/avatar.png'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='bg_color'>Background Color</Label>
              <Input
                id='bg_color'
                name='bg_color'
                value={formData.bg_color || ''}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='border_color'>Border Color</Label>
              <Input
                id='border_color'
                name='border_color'
                value={formData.border_color || ''}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='text_color'>Text Color</Label>
              <Input
                id='text_color'
                name='text_color'
                value={formData.text_color || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='rotate_class'>Rotate Class</Label>
              <Input
                id='rotate_class'
                name='rotate_class'
                value={formData.rotate_class || ''}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='position_class'>Position Class</Label>
              <Input
                id='position_class'
                name='position_class'
                value={formData.position_class || ''}
                onChange={handleChange}
              />
            </div>
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
                  ? 'Update Testimonial'
                  : 'Create Testimonial'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
