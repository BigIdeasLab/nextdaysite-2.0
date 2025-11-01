'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

export default function ShowreelCmsPage() {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { data: showreels, isLoading } = useQuery<ShowreelRow[]>({
    queryKey: ['showreels'],
    queryFn: async () => {
      const response = await fetch('/api/cms/showreels')
      if (!response.ok) {
        throw new Error('Failed to fetch showreels')
      }
      return response.json()
    },
  })

  const addShowreelMutation = useMutation({
    mutationFn: async (newShowreel: Omit<ShowreelRow, 'id' | 'created_at'>) => {
      const response = await fetch('/api/cms/showreels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShowreel),
      })
      if (!response.ok) {
        throw new Error('Failed to add showreel')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showreels'] })
      setSuccess('Showreel added successfully!')
      setTitle('')
      setVideoUrl(null)
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleUploadSuccess = (url: string) => {
    setVideoUrl(url)
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!videoUrl || !title) {
      setError('Please upload a video and enter a title.')
      return
    }

    setError(null)
    setSuccess(null)

    addShowreelMutation.mutate({
      title,
      url: videoUrl,
      is_active: true,
    })
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Manage Showreels</h1>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Upload New Showreel</CardTitle>
          <CardDescription>
            Add a new showreel video to your collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter showreel title'
                required
              />
            </div>
            <div>
              <Label>Video File</Label>
              <S3Upload onUploadSuccess={handleUploadSuccess} />
            </div>
            <Button
              type='submit'
              disabled={addShowreelMutation.isPending || !videoUrl || !title}
            >
              {addShowreelMutation.isPending ? 'Adding...' : 'Add Showreel'}
            </Button>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            {success && <p className='text-green-500 text-sm'>{success}</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Showreels</CardTitle>
          <CardDescription>List of all uploaded showreels.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading showreels...</div>
          ) : (
            <ul className='space-y-4'>
              {showreels?.map((showreel) => (
                <li
                  key={showreel.id}
                  className='flex items-center justify-between p-2 border rounded-md'
                >
                  <span>{showreel.title}</span>
                  <a
                    href={showreel.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && showreels?.length === 0 && (
            <p>No showreels uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
