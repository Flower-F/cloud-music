import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import AlbumHeader from '@/components/AlbumHeader'
import AlbumList from '@/components/AlbumList'
import AlbumMenu from '@/components/AlbumMenu'
import { getAlbum } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import MarqueeHeader from '@/ui/MarqueeHeader'
import Scroll from '@/ui/Scroll'

interface IProps {
  /** 返回的链接 */
  backLink: string
}

const AlbumPage: FC<IProps> = ({ backLink }) => {
  const { enterLoading, album } = useAppSelector((store) => store.album)
  const params = useParams()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAlbum(Number(params.id)))
  }, [])

  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(backLink)
  }, [])

  const [showStatus, setShowStatus] = useState(true)
  const handleClick = useCallback(() => {
    setShowStatus(false)
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="album-motion"
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <div className="fixed top-[5.75rem] bottom-0 z-[150] w-full origin-bottom-right bg-background_color">
        {album && !enterLoading && (
          <>
            <MarqueeHeader title={album.name} onClick={handleClick} />
            <Scroll bounceTop={false}>
              <div>
                <AlbumHeader album={album} />
                <AlbumMenu />
                <AlbumList album={album} />
              </div>
            </Scroll>
          </>
        )}
        {enterLoading && <EnterLoading />}
      </div>
    </CSSTransition>
  )
}

export default memo(AlbumPage)
