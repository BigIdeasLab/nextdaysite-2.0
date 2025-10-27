'use client'

import { usePortfolioItems } from '@/hooks/use-cms-content'
import { useState } from 'react'
import Link from 'next/link'

export default function PortfolioPage() {
  const { data: items, isLoading, error } = usePortfolioItems({
    queryKey: ['portfolio-items-admin'],
  })
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filteredItems =
    items?.filter((item) => {
      if (filter === 'published') return item.published
      if (filter === 'draft') return !item.published
      return true
    }) || []

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/cms/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete item')
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Portfolio Items</h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Manage your featured works
          </p>
        </div>
        <Link
          href='/dashboard/cms/portfolio/create'
          className='px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors'
        >
          New Item
        </Link>
      </div>

      <div className='flex gap-2'>
        {(['all', 'published', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className='flex items-center justify-center py-12'>
          <div className='text-gray-600 dark:text-gray-400'>Loading...</div>
        </div>
      )}

      {error && (
        <div className='bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4'>
          <p className='text-red-700 dark:text-red-100'>
            Error loading portfolio items: {error.message}
          </p>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-600 dark:text-gray-400'>
            No portfolio items found
          </p>
        </div>
      ) : (
        <div className='grid gap-4'>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              <div className='flex-1'>
                <h3 className='font-semibold text-foreground'>{item.title}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                  {item.description}
                </p>
                <div className='flex gap-2 mt-2'>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.published
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}
                  >
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <Link
                  href={`/dashboard/cms/portfolio/${item.id}`}
                  className='px-3 py-1 rounded text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors'
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='px-3 py-1 rounded text-sm bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 transition-colors'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
