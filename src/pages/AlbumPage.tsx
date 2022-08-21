import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import AlbumCard from '@/components/AlbumCard'
import AlbumList from '@/components/SongList'
import { getAlbum } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import MarqueeHeader from '@/ui/MarqueeHeader'
import Scroll from '@/ui/Scroll'

const AlbumPage = () => {
  const { enterLoading, album } = useAppSelector((store) => store.album)

  const params = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAlbum(Number(params.id)))
  }, [])

  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [])

  const [showStatus, setShowStatus] = useState(true)
  const handleClick = useCallback(() => {
    setShowStatus(false)
  }, [])

  const { playingList } = useAppSelector((store) => store.player)

  return (
    <CSSTransition in={showStatus} timeout={300} classNames="page-change" appear={true} unmountOnExit onExited={goBack}>
      <div
        className={`fixed top-0 bottom-0 z-[150] w-full origin-bottom-right bg-background_color ${
          playingList.length > 0 && 'bottom-[60px]'
        }`}
      >
        <MarqueeHeader title={album?.name || '歌单'} onClick={handleClick} />
        <Scroll bounceTop={false}>
          <div>
            {album && (
              <>
                <AlbumCard album={album} />
                <AlbumList song={album} />
              </>
            )}
          </div>
        </Scroll>
        {enterLoading && <EnterLoading />}
      </div>
    </CSSTransition>
  )
}

export default memo(AlbumPage)
