import type { ComponentType, SVGProps } from 'react'

export type NavSection = {
  label: string
  items: NavigationItem[]
}

export type NavigationItem = {
  label: string
  href: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  badge?: string
  isExternal?: boolean
}
