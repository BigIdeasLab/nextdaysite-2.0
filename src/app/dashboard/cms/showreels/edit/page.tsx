'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ShowreelRow } from '@/types/models'
import { S3Upload } from '@/components/forms/s3-upload'
import { PageHeader } from '@/components/ui/page-header'

// Form component to allow for key-based state reset
function ShowreelForm({ showreel }: { showreel: ShowreelRow | null }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [editedTitle, setEditedTitle] = useState(showreel?.title || '')
  const [editedVideoUrl, setEditedVideoUrl] = useState<string | null>(
    showreel?.url || null,
  )

  const upsertShowreelMutation = useMutation({
    mutationFn: async (
      showreelData: Omit<ShowreelRow, 'id' | 'created_at'>,
    ) => {
      const response = await fetch('/api/cms/showreels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showreelData),
      })
      if (!response.ok) throw new Error('Failed to save showreel')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showreels'] })
      queryClient.invalidateQueries({ queryKey: ['showreel'] })
      router.push('/dashboard/cms/showreels')
    },
    onError: (err: any) => {
      console.error(`Error saving showreel: ${err.message}`)
    },
  })

  const handleUploadSuccess = (url: string) => {
    setEditedVideoUrl(url)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!editedVideoUrl || !editedTitle) {
      return
    }

    upsertShowreelMutation.mutate({
      title: editedTitle,
      url: editedVideoUrl,
      is_active: true,
    })
  }

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>
          {showreel ? 'Edit Showreel' : 'Upload Your First Showreel'}
        </CardTitle>
        <CardDescription>
          {showreel
            ? 'Update your existing showreel video and title.'
            : 'Add your primary showreel video.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder='Enter showreel title'
            />
          </div>
          <div>
            <Label>Video Upload</Label>
            <S3Upload
              onUploadSuccess={handleUploadSuccess}
              category='showreels'
            />
            {editedVideoUrl && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Video Preview</h3>
                <video
                  src={editedVideoUrl}
                  controls
                  className='w-full rounded-md'
                />
              </div>
            )}
          </div>

          <div className='flex space-x-2'>
            <Button
              type='submit'
              disabled={
                upsertShowreelMutation.isPending ||
                !editedVideoUrl ||
                !editedTitle
              }
            >
              {upsertShowreelMutation.isPending
                ? 'Saving...'
                : showreel
                  ? 'Save Changes'
                  : 'Add Showreel'}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ShowreelEditPage() {
  const { data: showreel, isLoading } = useQuery<ShowreelRow | null>({
    queryKey: ['showreel'],
    queryFn: async () => {
      const response = await fetch('/api/cms/showreels?latest=true')
      if (response.status === 404) {
        return null
      }
      if (!response.ok) {
        throw new Error('Failed to fetch showreel')
      }
      return response.json()
    },
  })

  return (
    <div>
      <PageHeader
        title='Edit Showreel'
        subtitle='Update your main showreel video'
      />

      {isLoading ? (
        <div>Loading showreel...</div>
      ) : (
        <ShowreelForm key={showreel?.id || 'new'} showreel={showreel ?? null} />
      )}
    </div>
  )
}
