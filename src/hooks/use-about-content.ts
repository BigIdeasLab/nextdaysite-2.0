import { useQuery } from '@tanstack/react-query'
import type { AboutPageContent } from '@/types/models'

export function useAboutPageContent(options = {}) {
  return useQuery<AboutPageContent>({
    queryKey: ['about-page-content'],
    queryFn: async () => {
      const response = await fetch('/api/cms/about')
      if (!response.ok) throw new Error('Failed to fetch about page content')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}
