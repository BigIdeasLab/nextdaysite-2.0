import { useQuery } from '@tanstack/react-query'
import type {
  PortfolioItemRow,
  ServiceRow,
  TestimonialRow,
  CmsSettingRow,
  PageRow,
  LogoRow,
  ShowreelRow,
} from '@/types/models'

export function useLogos(options = {}) {
  return useQuery<LogoRow[]>({
    queryKey: ['logos'],
    queryFn: async () => {
      const response = await fetch('/api/cms/logos')
      if (!response.ok) throw new Error('Failed to fetch logos')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function useLogo(id: string | null, options = {}) {
  return useQuery<LogoRow>({
    queryKey: ['logo', id],
    queryFn: async () => {
      const response = await fetch(`/api/cms/logos/${id}`)
      if (!response.ok) throw new Error('Failed to fetch logo')
      return response.json()
    },
    enabled: !!id,
    staleTime: 60000,
    ...options,
  })
}

export function usePortfolioItems(options = {}) {
  return useQuery<PortfolioItemRow[]>({
    queryKey: ['portfolio-items'],
    queryFn: async () => {
      const response = await fetch('/api/cms/portfolio')
      if (!response.ok) throw new Error('Failed to fetch portfolio items')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function usePortfolioItem(id: string | null, options = {}) {
  return useQuery<PortfolioItemRow>({
    queryKey: ['portfolio-item', id],
    queryFn: async () => {
      const response = await fetch(`/api/cms/portfolio/${id}`)
      if (!response.ok) throw new Error('Failed to fetch portfolio item')
      return response.json()
    },
    enabled: !!id,
    staleTime: 60000,
    ...options,
  })
}

export function useServices(options = {}) {
  return useQuery<ServiceRow[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/cms/services')
      if (!response.ok) throw new Error('Failed to fetch services')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function useService(id: string | null, options = {}) {
  return useQuery<ServiceRow>({
    queryKey: ['service', id],
    queryFn: async () => {
      const response = await fetch(`/api/cms/services/${id}`)
      if (!response.ok) throw new Error('Failed to fetch service')
      return response.json()
    },
    enabled: !!id,
    staleTime: 60000,
    ...options,
  })
}

export function useTestimonials(options = {}) {
  return useQuery<TestimonialRow[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch('/api/cms/testimonials')
      if (!response.ok) throw new Error('Failed to fetch testimonials')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function useTestimonial(id: string) {
  return useQuery<TestimonialRow>({
    queryKey: ['testimonials', id],
    queryFn: () =>
      fetch(`/api/cms/testimonials/${id}`).then((res) => res.json()),
    enabled: !!id,
  })
}

export function useSettings() {
  return useQuery<CmsSettingRow[]>({
    queryKey: ['settings'],
    queryFn: () => fetch('/api/cms/settings').then((res) => res.json()),
  })
}

export function useCmsSetting(key: string, options = {}) {
  return useQuery<CmsSettingRow>({
    queryKey: ['cms-setting', key],
    queryFn: async () => {
      const response = await fetch(`/api/cms/settings?key=${key}`)
      if (!response.ok) throw new Error('Failed to fetch CMS setting')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function useCmsSettings(options = {}) {
  return useQuery<CmsSettingRow[]>({
    queryKey: ['cms-settings'],
    queryFn: async () => {
      const response = await fetch('/api/cms/settings')
      if (!response.ok) throw new Error('Failed to fetch CMS settings')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function usePages(options = {}) {
  return useQuery<PageRow[]>({
    queryKey: ['pages'],
    queryFn: async () => {
      const response = await fetch('/api/cms/pages')
      if (!response.ok) throw new Error('Failed to fetch pages')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}

export function usePage(id: string | null, options = {}) {
  return useQuery<PageRow>({
    queryKey: ['page', id],
    queryFn: async () => {
      const response = await fetch(`/api/cms/pages/${id}`)
      if (!response.ok) throw new Error('Failed to fetch page')
      return response.json()
    },
    enabled: !!id,
    staleTime: 60000,
    ...options,
  })
}

export function useShowreels(options = {}) {
  return useQuery<ShowreelRow[]>({
    queryKey: ['showreels'],
    queryFn: async () => {
      const response = await fetch('/api/cms/showreels')
      if (!response.ok) throw new Error('Failed to fetch showreels')
      return response.json()
    },
    staleTime: 60000,
    ...options,
  })
}
