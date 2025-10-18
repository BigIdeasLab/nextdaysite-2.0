'use client'

import { useProjects, useUsers } from '@/hooks'
import { format } from 'date-fns'

export function AdminProjects() {
  const { data: projects = [], isLoading: projectsLoading } = useProjects()
  const { data: users = [], isLoading: usersLoading } = useUsers()

  if (projectsLoading || usersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          All Projects
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Manage and monitor all projects in the system.
        </p>
      </header>

      <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
        <div className='overflow-x-auto -mx-4 sm:mx-0'>
          <table className='min-w-full divide-y divide-foreground/10'>
            <thead>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Project
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Owner
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Due Date
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground/60'>
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-foreground/10'>
              {projects.map((project) => {
                const owner = users.find((u) => u.id === project.owner_id)
                return (
                  <tr key={project.id}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground'>
                      {project.title}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                      {owner?.full_name ?? owner?.email}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                      {project.status}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                      {project.due_date
                        ? format(new Date(project.due_date), 'MMM d, yyyy')
                        : '-'}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-foreground/70'>
                      {project.progress}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
