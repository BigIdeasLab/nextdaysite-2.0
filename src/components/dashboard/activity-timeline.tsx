import type { ActivitiesRow, ProjectsRow, UsersRow } from '@/data/mock-data'
import { formatDate } from '@/lib/utils/format'

const activityLabels: Record<ActivitiesRow['event_type'], string> = {
  status_change: 'Status update',
  file_uploaded: 'File uploaded',
  invoice_sent: 'Invoice sent',
  note_added: 'Note added',
  message_posted: 'Message posted',
}

type ActivityTimelineProps = {
  activities: ActivitiesRow[]
  projects: ProjectsRow[]
  users: UsersRow[]
  limit?: number
  title?: string
}

type Lookup<T extends { id: string }> = Record<string, T>

function createLookup<T extends { id: string }>(items: T[]): Lookup<T> {
  return items.reduce<Lookup<T>>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}

function renderMetadata(activity: ActivitiesRow) {
  const metadata = (activity.metadata as Record<string, unknown> | null) ?? null

  if (!metadata) {
    return null
  }

  switch (activity.event_type) {
    case 'status_change': {
      const from =
        typeof metadata.from === 'string' ? metadata.from : 'previous stage'
      const to = typeof metadata.to === 'string' ? metadata.to : 'next stage'
      return (
        <p className='text-xs text-foreground/60'>
          Transitioned from{' '}
          <span className='font-medium text-foreground/80'>{from}</span> to{' '}
          <span className='font-medium text-foreground/80'>{to}</span>
        </p>
      )
    }
    case 'file_uploaded': {
      const fileName =
        typeof metadata.file_name === 'string'
          ? metadata.file_name
          : 'new asset'
      return (
        <p className='text-xs text-foreground/60'>
          Uploaded{' '}
          <span className='font-medium text-foreground/80'>{fileName}</span>
        </p>
      )
    }
    case 'invoice_sent': {
      const invoiceId =
        typeof metadata.invoice_id === 'string'
          ? metadata.invoice_id
          : 'invoice'
      return (
        <p className='text-xs text-foreground/60'>
          Sent{' '}
          <span className='font-medium text-foreground/80'>{invoiceId}</span>{' '}
          for approval
        </p>
      )
    }
    case 'note_added': {
      const note = typeof metadata.note === 'string' ? metadata.note : null
      if (!note) {
        return null
      }
      return <p className='text-xs text-foreground/60'>{note}</p>
    }
    case 'message_posted': {
      const preview =
        typeof metadata.preview === 'string' ? metadata.preview : null
      if (!preview) {
        return null
      }
      return <p className='text-xs italic text-foreground/60'>“{preview}”</p>
    }
    default:
      return null
  }
}

export function ActivityTimeline({
  activities,
  projects,
  users,
  limit = 6,
  title = 'Recent activity',
}: ActivityTimelineProps) {
  const projectLookup = createLookup(projects)
  const userLookup = createLookup(users)
  const truncatedActivities = activities.slice(0, limit)

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
        <span className='text-xs uppercase tracking-wide text-foreground/50'>
          Last {truncatedActivities.length} updates
        </span>
      </div>
      <ol className='space-y-3'>
        {truncatedActivities.map((activity) => {
          const project = projectLookup[activity.project_id]
          const actor = activity.actor_id
            ? userLookup[activity.actor_id]
            : undefined
          return (
            <li
              key={activity.id}
              className='flex flex-col gap-1 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm shadow-foreground/5'
            >
              <div className='flex items-center justify-between text-xs text-foreground/60'>
                <span>{activityLabels[activity.event_type]}</span>
                <time dateTime={activity.created_at}>
                  {formatDate(activity.created_at, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className='text-sm text-foreground/80'>
                {actor?.full_name ?? 'System'}
                {project ? ` → ${project.title}` : ''}
              </p>
              {renderMetadata(activity)}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
