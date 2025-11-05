'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ShowreelRow } from '@/types/models'
import { PageHeader } from '@/components/ui/page-header'

export default function ShowreelCmsPage() {
  const { data: showreel, isLoading } = useQuery<ShowreelRow | null>({
    queryKey: ['showreels'],
    queryFn: async () => {
      const response = await fetch('/api/cms/showreels')
      if (!response.ok) throw new Error('Failed to fetch showreels')
      const showreelsData = await response.json()
      return showreelsData?.[0] || null
    },
  })

  return (
    <div>
      <PageHeader title='Showreel' subtitle='Manage your main showreel video' />

      {isLoading ? (
        <div>Loading showreel...</div>
      ) : (
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>
                  {showreel ? showreel.title : 'No Showreel Available'}
                </CardTitle>
                <CardDescription>
                  {showreel
                    ? 'This is your current showreel.'
                    : 'Upload a showreel to display it here.'}
                </CardDescription>
              </div>
              <Link href='/dashboard/cms/showreels/edit' passHref>
                <Button>Edit Showreel</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {showreel?.url ? (
              <video
                src={showreel.url}
                controls
                className='w-full rounded-md'
              />
            ) : (
              <p>No video to display.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
