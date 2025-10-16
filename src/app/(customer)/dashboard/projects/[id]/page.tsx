import { ProjectDetails } from '@/components/dashboard/project-details'

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return <ProjectDetails projectId={params.id} />
}
