'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useUser } from '@/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/lib/api/data-service'

export function Account() {
  const { user, client } = useAuth()
  const { data: userProfile, isLoading: userLoading } = useUser(user?.id)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newName: string) => {
      if (!user?.id) {
        throw new Error('User not found')
      }
      return updateUser(user.id, { full_name: newName }, client)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user?.id] })
    },
  })

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name ?? '')
      setEmail(userProfile.email ?? '')
    }
  }, [userProfile])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(fullName)
  }

  if (userLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Account Settings
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Manage your profile and account settings.
        </p>
      </header>
      <form onSubmit={handleUpdateProfile} className='flex flex-col gap-8'>
        <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <div className='grid gap-4 md:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm text-foreground/70'>
              Full Name
              <input
                type='text'
                className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={mutation.isPending}
              />
            </label>
            <label className='flex flex-col gap-2 text-sm text-foreground/70'>
              Email
              <input
                type='email'
                className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
                value={email}
                disabled // Email is not editable for now
              />
            </label>
          </div>
          <div className='flex items-center justify-end gap-4'>
            {mutation.isSuccess && (
              <p className='text-sm text-emerald-500'>Profile saved!</p>
            )}
            {mutation.isError && (
              <p className='text-sm text-rose-500'>{mutation.error.message}</p>
            )}
            <button
              type='submit'
              className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
