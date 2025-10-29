'use client'

import { useLogo } from '@/hooks/use-cms-content'
import { LogoForm } from '@/components/forms/logo-form'

export default function EditLogoPage({ params }: { params: { id: string } }) {
  const { data: logo, isLoading, error } = useLogo(params.id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading logo</div>
  if (!logo) return <div>Logo not found</div>

  return <LogoForm item={logo} />
}
