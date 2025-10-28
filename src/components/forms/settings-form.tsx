'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CmsSettingRow } from '@/types/models'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  site_title: z.string().min(1, 'Site title is required'),
  site_description: z.string().min(1, 'Site description is required'),
  hero_title: z.string().min(1, 'Hero title is required'),
  hero_subtitle: z.string().min(1, 'Hero subtitle is required'),
  featured_works_title: z.string().min(1, 'Featured works title is required'),
  services_title: z.string().min(1, 'Services title is required'),
  testimonials_title: z.string().min(1, 'Testimonials title is required'),
})

type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: CmsSettingRow[]
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const defaultValues = initialData.reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value as string
      return acc
    },
    {} as { [key: string]: string },
  )

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const mutation = useMutation({
    mutationFn: async (data: SettingsFormValues) => {
      const response = await fetch('/api/cms/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to save settings')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      router.push('/dashboard/cms')
    },
  })

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {Object.keys(defaultValues).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as keyof SettingsFormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key.replace(/_/g, ' ')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Form>
  )
}
