'use client'

import { ProjectDetails } from '@/components/dashboard/project-details'
import { useParams } from 'next/navigation'

export default function ProjectDetailsPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (!id) {
    return <div>Loading...</div>
  }

  return <ProjectDetails projectId={id} />
}
