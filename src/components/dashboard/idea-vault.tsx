'use client'

import { useFiles, useUsers } from '@/hooks'
import { FileGallery } from '@/components/dashboard/file-gallery'

export function IdeaVault() {
  const { data: files = [], isLoading: filesLoading } = useFiles()
  const { data: users = [], isLoading: usersLoading } = useUsers()

  if (filesLoading || usersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Idea Vault
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Your collection of design resources and project files.
        </p>
      </header>
      <FileGallery files={files} users={users} />
    </div>
  )
}
