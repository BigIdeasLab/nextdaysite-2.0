'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AboutPageContent, ProcessStep } from '@/types/models'
import { S3Upload } from '@/components/forms/s3-upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface AboutPageContentFormProps {
  initialData: AboutPageContent
}

const processStepSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
})

const formSchema = z.object({
  hero_main_headline: z
    .string()
    .min(1, { message: 'Hero Main Headline is required.' }),
  hero_image_1_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  hero_image_1_alt: z.string().nullable(),
  hero_image_2_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  hero_image_2_alt: z.string().nullable(),
  intro_headline: z.string().min(1, { message: 'Intro Headline is required.' }),
  intro_paragraph: z
    .string()
    .min(1, { message: 'Intro Paragraph is required.' }),
  intro_image_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  intro_image_alt: z.string().nullable(),
  promise_main_headline: z
    .string()
    .min(1, { message: 'Promise Main Headline is required.' }),
  promise_who_we_are_headline: z
    .string()
    .min(1, { message: 'Promise Who We Are Headline is required.' }),
  promise_description: z
    .string()
    .min(1, { message: 'Promise Description is required.' }),
  promise_clients_value: z
    .string()
    .min(1, { message: 'Promise Clients Value is required.' }),
  promise_clients_label: z
    .string()
    .min(1, { message: 'Promise Clients Label is required.' }),
  promise_websites_value: z
    .string()
    .min(1, { message: 'Promise Websites Value is required.' }),
  promise_websites_label: z
    .string()
    .min(1, { message: 'Promise Websites Label is required.' }),
  promise_satisfaction_value: z
    .string()
    .min(1, { message: 'Promise Satisfaction Value is required.' }),
  promise_satisfaction_label: z
    .string()
    .min(1, { message: 'Promise Satisfaction Label is required.' }),
  promise_image_1_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  promise_image_1_alt: z.string().nullable(),
  promise_image_2_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  promise_image_2_alt: z.string().nullable(),
  solution_main_headline: z
    .string()
    .min(1, { message: 'Solution Main Headline is required.' }),
  solution_our_solution_headline: z
    .string()
    .min(1, { message: 'Solution Our Solution Headline is required.' }),
  solution_paragraph: z
    .string()
    .min(1, { message: 'Solution Paragraph is required.' }),
  solution_image_1_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  solution_image_1_alt: z.string().nullable(),
  solution_image_2_url: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .or(z.literal(''))
    .nullable(),
  solution_image_2_alt: z.string().nullable(),
  process_headline: z
    .string()
    .min(1, { message: 'Process Headline is required.' }),
  process_steps: z
    .array(processStepSchema)
    .min(1, { message: 'At least one process step is required.' }),
})

export function AboutPageContentForm({
  initialData,
}: AboutPageContentFormProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      process_steps: (initialData.process_steps as ProcessStep[]) || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'process_steps',
  })

  const updateAboutPageContent = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/cms/about', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update about page content')
    }
    return response.json()
  }

  const mutation = useMutation({
    mutationFn: updateAboutPageContent,
    onSuccess: () => {
      toast.success('About page content updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['about-page-content'] })
      router.push('/dashboard/cms/about')
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  const deleteImageMutation = useMutation({
    mutationFn: async ({
      fieldName,
    }: {
      fieldName: keyof z.infer<typeof formSchema>
    }) => {
      const response = await fetch('/api/cms/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [fieldName]: null }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete image URL from DB')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-page-content'] })
      toast.success('Image URL cleared from database.')
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* Hero Section */}
        <h2 className='text-2xl font-semibold'>Hero Section</h2>
        <FormField
          control={form.control}
          name='hero_main_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hero_image_1_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'hero_image_1_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Hero Image 1 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='hero_image_1_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image 1 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hero_image_2_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'hero_image_2_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Hero Image 2 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='hero_image_2_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image 2 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Intro Section */}
        <h2 className='text-2xl font-semibold mt-8'>Intro Section</h2>
        <FormField
          control={form.control}
          name='intro_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intro Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='intro_paragraph'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intro Paragraph</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='intro_image_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'intro_image_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Intro Image URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='intro_image_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intro Image Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Promise Section */}
        <h2 className='text-2xl font-semibold mt-8'>Promise Section</h2>
        <FormField
          control={form.control}
          name='promise_main_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_who_we_are_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who We Are Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_clients_value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clients Value</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_clients_label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clients Label</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_websites_value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Websites Value</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_websites_label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Websites Label</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_satisfaction_value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satisfaction Value</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_satisfaction_label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satisfaction Label</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_image_1_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'promise_image_1_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Promise Image 1 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='promise_image_1_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promise Image 1 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promise_image_2_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'promise_image_2_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Promise Image 2 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='promise_image_2_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promise Image 2 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Solution Section */}
        <h2 className='text-2xl font-semibold mt-8'>Solution Section</h2>
        <FormField
          control={form.control}
          name='solution_main_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='solution_our_solution_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Our Solution Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='solution_paragraph'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='solution_image_1_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'solution_image_1_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Solution Image 1 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='solution_image_1_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Image 1 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='solution_image_2_url'
          render={({ field }) => {
            const handleDeleteImage = async () => {
              if (!field.value) return

              const url = new URL(field.value)
              const key = url.pathname.split('/').pop()

              if (!key) {
                toast.error(
                  'Could not extract key from image URL for deletion.',
                )
                return
              }

              try {
                // First, delete from S3
                const response = await fetch('/api/aws/s3-delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key }),
                })

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.error || 'Failed to delete image from S3',
                  )
                }

                // Then, update the database via the new mutation
                deleteImageMutation.mutate(
                  { fieldName: 'solution_image_2_url' },
                  {
                    onSuccess: () => {
                      field.onChange(null) // Clear local state
                    },
                  },
                )
              } catch (error: any) {
                toast.error(`Error deleting image: ${error.message}`)
              }
            }

            return (
              <FormItem>
                <FormLabel>Solution Image 2 URL</FormLabel>
                <FormControl>
                  <S3Upload
                    onUploadSuccess={(url) => field.onChange(url)}
                    category='about-page'
                  />
                </FormControl>
                {field.value && (
                  <div className='mt-4 flex items-center space-x-2'>
                    <p className='text-sm text-gray-500'>Uploaded Image:</p>
                    <a
                      href={field.value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline truncate'
                    >
                      {field.value.split('/').pop()}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteImage}
                      disabled={
                        mutation.isPending || deleteImageMutation.isPending
                      }
                      className='bg-red-500 text-white hover:bg-red-600'
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='solution_image_2_alt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Image 2 Alt Text</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Process Section */}
        <h2 className='text-2xl font-semibold mt-8'>Process Section</h2>
        <FormField
          control={form.control}
          name='process_headline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Process Headline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='process_steps'
          render={() => (
            <FormItem>
              <FormLabel>Process Steps</FormLabel>
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className='flex space-x-2 mb-4'>
                    <FormField
                      control={form.control}
                      name={`process_steps.${index}.title`}
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>Step {index + 1} Title</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`process_steps.${index}.description`}
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>Step {index + 1} Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => remove(index)}
                      className='self-end'
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => append({ title: '', description: '' })}
                >
                  Add Process Step
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}
