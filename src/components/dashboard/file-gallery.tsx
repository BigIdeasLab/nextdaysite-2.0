import type { FilesRow, UsersRow } from '@/data/mock-data'
import { formatDate } from '@/lib/utils/format'

type FileGalleryProps = {
  files: FilesRow[]
  users: UsersRow[]
}

type UserLookup = Record<string, UsersRow>

function createLookup(users: UsersRow[]): UserLookup {
  return users.reduce<UserLookup>((acc, user) => {
    acc[user.id] = user
    return acc
  }, {})
}

export function FileGallery({ files, users }: FileGalleryProps) {
  const lookup = createLookup(users)
  const sorted = [...files].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-foreground'>Latest files</h2>
        <span className='text-xs text-foreground/50'>
          {files.length} shared
        </span>
      </div>
      <ul className='space-y-3'>
        {sorted.slice(0, 5).map((file) => {
          const owner = lookup[file.owner_id]
          const sizeMb = file.size_bytes / (1024 * 1024)
          return (
            <li
              key={file.id}
              className='flex justify-between gap-3 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm shadow-foreground/5'
            >
              <div className='flex flex-col gap-1'>
                <p className='text-sm font-semibold text-foreground'>
                  {file.name}
                </p>
                <p className='text-xs text-foreground/60'>
                  {owner?.full_name ?? owner?.email ?? 'Unknown'} • Updated{' '}
                  {formatDate(file.updated_at)}
                </p>
              </div>
              <div className='flex flex-col items-end justify-center text-xs text-foreground/60'>
                <span>{sizeMb.toFixed(1)} MB</span>
                {file.preview_url ? (
                  <a
                    className='mt-1 text-xs font-medium text-foreground transition hover:text-foreground/70'
                    href={file.preview_url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Preview
                  </a>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
