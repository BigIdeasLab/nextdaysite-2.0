import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-8 w-48' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
        <Skeleton className='h-48 w-full' />
      </div>
    </div>
  )
}
