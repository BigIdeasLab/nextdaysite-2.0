'use client'

import { useState } from 'react'
import type { ServiceRow } from '@/types/models'

interface ServiceFormProps {
  item?: ServiceRow
  onSubmit?: (data: any) => void
}

export function ServiceForm({ item, onSubmit }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    slug: item?.slug || '',
    image1_url: item?.image1_url || '',
    image2_url: item?.image2_url || '',
    icon: item?.icon || '',
    published: item?.published ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const method = item ? 'PATCH' : 'POST'
      const url = item ? `/api/cms/services/${item.id}` : '/api/cms/services'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save service')
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
          Title *
        </label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='e.g., Mobile App Development'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Slug *
        </label>
        <input
          type='text'
          name='slug'
          value={formData.slug}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='e.g., mobile-app'
        />
        <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
          URL-friendly identifier
        </p>
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Description
        </label>
        <textarea
          name='description'
          value={formData.description || ''}
          onChange={handleChange}
          rows={3}
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Service description...'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Image 1 URL *
        </label>
        <input
          type='url'
          name='image1_url'
          value={formData.image1_url}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='https://...'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Image 2 URL *
        </label>
        <input
          type='url'
          name='image2_url'
          value={formData.image2_url}
          onChange={handleChange}
          required
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='https://...'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-foreground mb-2'>
          Icon
        </label>
        <input
          type='text'
          name='icon'
          value={formData.icon || ''}
          onChange={handleChange}
          className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Optional icon identifier'
        />
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
        <label htmlFor='published' className='text-sm font-medium text-foreground'>
          Publish immediately
        </label>
      </div>

      <div className='flex gap-3'>
        <button
          type='submit'
          disabled={loading}
          className='px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? 'Saving...' : item ? 'Update Service' : 'Create Service'}
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
