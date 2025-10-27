'use client'

import { useCmsSettings } from '@/hooks/use-cms-content'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const {
    data: settings,
    isLoading,
    error,
  } = useCmsSettings({
    queryKey: ['cms-settings-admin'],
  })
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (settings) {
      const data: Record<string, string> = {}
      settings.forEach((setting) => {
        data[setting.key] =
          typeof setting.value === 'string'
            ? setting.value
            : JSON.stringify(setting.value).replace(/^"|"$/g, '')
      })
      setFormData(data)
    }
  }, [settings])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, key: string) => {
    e.preventDefault()
    setSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      const response = await fetch('/api/cms/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          value: formData[key],
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save setting')
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-gray-600 dark:text-gray-400'>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4'>
        <p className='text-red-700 dark:text-red-100'>
          Error loading settings: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>CMS Settings</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Manage global site settings
        </p>
      </div>

      {saveSuccess && (
        <div className='bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4'>
          <p className='text-green-700 dark:text-green-100'>
            Setting saved successfully!
          </p>
        </div>
      )}

      {saveError && (
        <div className='bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4'>
          <p className='text-red-700 dark:text-red-100'>{saveError}</p>
        </div>
      )}

      <div className='space-y-6 max-w-2xl'>
        {settings?.map((setting) => (
          <form
            key={setting.key}
            onSubmit={(e) => handleSubmit(e, setting.key)}
            className='border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4'
          >
            <div>
              <label className='block text-sm font-medium text-foreground mb-1'>
                {setting.key.replace(/_/g, ' ').toUpperCase()}
              </label>
              {setting.description && (
                <p className='text-xs text-gray-600 dark:text-gray-400 mb-3'>
                  {setting.description}
                </p>
              )}
              {setting.key.includes('title') || setting.key === 'site_title' ? (
                <input
                  type='text'
                  name={setting.key}
                  value={formData[setting.key] || ''}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              ) : (
                <textarea
                  name={setting.key}
                  value={formData[setting.key] || ''}
                  onChange={handleChange}
                  rows={3}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}
            </div>

            <button
              type='submit'
              disabled={saving}
              className='px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {saving ? 'Saving...' : 'Save Setting'}
            </button>
          </form>
        ))}
      </div>
    </div>
  )
}
