'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LogoRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQueryClient, useMutation } from '@tanstack/react-query'

interface LogoFormProps {
  item?: LogoRow
}

export function LogoForm({ item }: LogoFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: item?.name || '',
    image_url: item?.image_url || '',
    width: item?.width || '',
    height: item?.height || '',
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <Label htmlFor='image_url'>Image URL *</Label>
            <Input
              id='image_url'
              name='image_url'
              type='url'
              value={formData.image_url}
              onChange={handleChange}
              required
              placeholder='https://example.com/logo.png'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='width'>Width</Label>
              <Input
                id='width'
                name='width'
                type='number'
                value={formData.width}
                onChange={handleChange}
                placeholder='e.g., 100'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='height'>Height</Label>
              <Input
                id='height'
                name='height'
                type='number'
                value={formData.height}
                onChange={handleChange}
                placeholder='e.g., 50'
              />
            </div>
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
