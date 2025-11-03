'use client'

import { useSettings } from '@/hooks/use-cms-content'
import { SettingsForm } from '@/components/forms/settings-form'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading settings.</div>

  return (
    <div>
      <PageHeader title='Settings' subtitle='Manage global site settings' />
      <Card>
        <CardContent className='pt-6'>
          <SettingsForm initialData={settings || []} />
        </CardContent>
      </Card>
    </div>
  )
}
