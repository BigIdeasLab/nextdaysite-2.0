'use client'

import { useParams } from 'next/navigation'
import { useLogo } from '@/hooks/use-cms-content'
import { LogoForm } from '@/components/forms/logo-form'

export default function EditLogoPage() {
  const params = useParams()
  const id = (Array.isArray(params.id) ? params.id[0] : params.id) ?? null

  const { data: logo, isLoading, error } = useLogo(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading logo</div>
  if (!logo) return <div>Logo not found</div>

  return (
    <div className='container mx-auto py-10'>
      <LogoForm item={logo} />
    </div>
  )
}
