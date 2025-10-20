import type { ProjectsRow, UsersRow } from '@/types/models'
import { formatDate } from '@/lib/utils/format'

const statusColumns: { key: ProjectsRow['status']; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'review', label: 'In Review' },
  { key: 'completed', label: 'Completed' },
  { key: 'paused', label: 'Paused' },
  { key: 'cancelled', label: 'Cancelled' },
]

type ProjectBoardProps = {
  projects: ProjectsRow[]
  users: UsersRow[]
}

type UserLookup = Record<string, UsersRow>

function getUserLookup(users: UsersRow[]): UserLookup {
  return users.reduce<UserLookup>((lookup, user) => {
    lookup[user.id] = user
    return lookup
  }, {})
}

export function ProjectBoard({ projects, users }: ProjectBoardProps) {
  const userLookup = getUserLookup(users)

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>
          Production board
        </h2>
        <span className='text-sm text-foreground/60'>
          Drag & drop coming soon
        </span>
      </div>
      <div className='grid gap-4 overflow-x-auto pb-2 lg:grid-cols-5'>
        {statusColumns.map((column) => {
          const columnProjects = projects.filter(
            (project) => project.status === column.key,
          )

          return (
            <div
              key={column.key}
              className='flex min-w-[220px] flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm shadow-foreground/5'
            >
              <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold text-foreground/70'>
                  {column.label}
                </p>
                <span className='rounded-full bg-foreground/10 px-2 text-xs font-semibold text-foreground/70'>
                  {columnProjects.length}
                </span>
              </div>
              <div className='flex flex-col gap-3'>
                {columnProjects.length === 0 ? (
                  <p className='rounded-xl border border-dashed border-foreground/10 p-4 text-xs text-foreground/50'>
                    Nothing here yet
                  </p>
                ) : (
                  columnProjects.map((project) => {
                    const manager = project.project_manager_id
                      ? userLookup[project.project_manager_id]
                      : undefined

                    return (
                      <article
                        key={project.id}
                        className='flex flex-col gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-4'
                      >
                        <div className='flex flex-col gap-1'>
                          <p className='text-sm font-semibold text-foreground'>
                            {project.title}
                          </p>
                          {project.summary ? (
                            <p className='text-xs text-foreground/60'>
                              {project.summary}
                            </p>
                          ) : null}
                        </div>
                        <progress
                          value={Math.min(Math.max(project.progress, 0), 100)}
                          max={100}
                          className='project-progress h-2 w-full'
                        />
                        <div className='flex flex-wrap items-center gap-2'>
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className='inline-flex items-center rounded-full bg-background px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground/70'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className='flex items-center justify-between text-xs text-foreground/60'>
                          <span>Due {formatDate(project.due_date)}</span>
                          {manager ? (
                            <span>
                              Lead {manager.full_name ?? manager.email}
                            </span>
                          ) : null}
                        </div>
                      </article>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
