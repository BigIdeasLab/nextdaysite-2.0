'use client'

import { useState } from 'react'
import type { TestimonialRow } from '@/types/models'

interface TestimonialFormProps {
  item?: TestimonialRow
  onSubmit?: (data: any) => void
}

export function TestimonialForm({ item, onSubmit }: TestimonialFormProps) {
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const method = item ? 'PATCH' : 'POST'
      const url = item
        ? `/api/cms/testimonials/${item.id}`
        : '/api/cms/testimonials'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save testimonial')
      }

      onSubmit?.(await response.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
      {error && (
        <div className='bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4'>
          <p className='text-red-700 dark:text-red-100'>{error}</p>
        </div>
      )}

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Name *
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='John Doe'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Quote *
        </label>
        <textarea
          name='quote'
          value={formData.quote}
          onChange={handleChange}
          required
          rows={4}
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='What did the customer say?'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Avatar URL
        </label>
        <input
          type='url'
          name='avatar_url'
          value={formData.avatar_url}
          onChange={handleChange}
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='https://...'
        />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Background Color
          </label>
          <input
            type='text'
            name='bg_color'
            value={formData.bg_color}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='#1A1A1A'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Border Color
          </label>
          <input
            type='text'
            name='border_color'
            value={formData.border_color}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='#2B2B2B'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Text Color
          </label>
          <input
            type='text'
            name='text_color'
            value={formData.text_color}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='#9A9EA2'
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Rotation Class
          </label>
          <input
            type='text'
            name='rotate_class'
            value={formData.rotate_class}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='-rotate-[6deg]'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Position Class
          </label>
          <input
            type='text'
            name='position_class'
            value={formData.position_class}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='left-0 top-[70px]'
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          name='published'
          checked={formData.published}
          onChange={handleChange}
          id='published'
          className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
        />
        <label
          htmlFor='published'
          className='text-sm font-medium text-foreground'
        >
          Publish immediately
        </label>
      </div>

      <div className='flex gap-3'>
        <button
          type='submit'
          disabled={loading}
          className='px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading
            ? 'Saving...'
            : item
              ? 'Update Testimonial'
              : 'Create Testimonial'}
        </button>
        <button
          type='button'
          onClick={() => window.history.back()}
          className='px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-foreground font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
