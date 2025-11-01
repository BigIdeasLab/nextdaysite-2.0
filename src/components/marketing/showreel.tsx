import { createClient } from '@/lib/supabase/server'
import { VideoPlayerClient } from './video-player-client'

export async function Showreel() {
  const supabase = await createClient()
  const { data: showreels, error } = await supabase
    .from('showreels')
    .select('*')

  const activeShowreel = showreels?.find((showreel) => showreel.is_active)

  return (
    <div className='w-full flex flex-col items-center gap-12'>
      {activeShowreel ? (
        <VideoPlayerClient src={activeShowreel.url} />
      ) : (
        <div className='w-full max-w-[1022px] h-auto rounded-[20px] md:rounded-[30px] bg-gray-200 flex items-center justify-center text-gray-500'>
          No active showreel available.
        </div>
      )}
    </div>
  )
}
