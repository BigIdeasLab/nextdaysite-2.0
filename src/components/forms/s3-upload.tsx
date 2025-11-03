'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useMutation } from '@tanstack/react-query'
import AWS from 'aws-sdk'

interface S3UploadProps {
  onUploadSuccess: (url: string) => void
}

export function S3Upload({ onUploadSuccess }: S3UploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [s3, setS3] = useState<AWS.S3 | null>(null)

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/aws/credentials')
      const { bucketName, region, accessKeyId, secretAccessKey } =
        await response.json()

      AWS.config.update({
        region,
        accessKeyId,
        secretAccessKey,
      })

      setS3(new AWS.S3({ params: { Bucket: bucketName } }))
    }

    fetchCredentials()
  }, [])

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      if (!s3) {
        throw new Error('S3 client not initialized')
      }

      const params = {
        Bucket: s3.config.params!.Bucket,
        Key: file.name,
        Body: file,
      }

      const upload = s3.upload(params)

      upload.on('httpUploadProgress', (p) => {
        setUploadProgress((p.loaded / p.total) * 100)
      })

      const data = await upload.promise()
      return data.Location
    },
    onSuccess: (url: string) => {
      onUploadSuccess(url)
      setFile(null)
      setUploadProgress(0)
    },
    onError: (error) => {
      alert(`Upload failed: ${error.message}`)
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      mutation.mutate(file)
    } else {
      alert('Please select a file first.')
    }
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='file-upload'>Choose a file</Label>
        <Input id='file-upload' type='file' onChange={handleFileChange} />
      </div>
      {file && (
        <div className='space-y-2'>
          <Button
            type='button'
            onClick={handleUpload}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Uploading...' : 'Upload'}
          </Button>
          {mutation.isPending && (
            <Progress value={uploadProgress} className='w-full' />
          )}
        </div>
      )}
    </div>
  )
}
