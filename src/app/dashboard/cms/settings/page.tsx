'use client'

import { useSettings } from '@/hooks/use-cms-content'
import { SettingsForm } from '@/components/forms/settings-form'

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading settings.</div>

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-4'>Manage Settings</h1>
      <SettingsForm initialData={settings || []} />
    </div>
  )
}
