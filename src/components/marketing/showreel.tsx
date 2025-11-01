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
      {activeShowreel && <VideoPlayerClient src={activeShowreel.url} />}
    </div>
  )
}
