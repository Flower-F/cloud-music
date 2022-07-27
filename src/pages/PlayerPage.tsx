import { memo } from 'react'

import MiniPlayer from '@/components/MiniPlayer'
import NormalPlayer from '@/components/NormalPlayer'
import { playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'

const PlayerPage = () => {
  const currentSong = {
    al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
    name: '木偶人',
    ar: [{ name: '薛之谦' }]
  }

  const { fullscreen } = useAppSelector((store) => store.player)

  const { setFullscreen } = playerSlice.actions

  const dispatch = useAppDispatch()

  return (
    <div>
      <MiniPlayer song={currentSong} fullscreen={fullscreen} dispatch={dispatch} setFullScreen={setFullscreen} />
      <NormalPlayer song={currentSong} dispatch={dispatch} fullscreen={fullscreen} setFullScreen={setFullscreen} />
    </div>
  )
}

export default memo(PlayerPage)
