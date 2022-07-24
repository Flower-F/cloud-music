import { ElementRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import SongList from '@/components/SongList'
import { getArtist } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import MarqueeHeader from '@/ui/MarqueeHeader'
import Scroll from '@/ui/Scroll'

const ArtistPage = () => {
  const [showStatus, setShowStatus] = useState(true)
  const handleClick = useCallback(() => {
    setShowStatus(false)
  }, [])

  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate('/singer')
  }, [])

  const { enterLoading, artist } = useAppSelector((store) => store.artist)

  const params = useParams()
  const dispatch = useAppDispatch()

  type TScrollRef = ElementRef<typeof Scroll>
  type TMarqueeHeaderRef = ElementRef<typeof MarqueeHeader>

  const collectButtonRef = useRef<HTMLDivElement | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<TScrollRef | null>(null)
  const marqueeHeaderRef = useRef<TMarqueeHeaderRef | null>(null)
  const imageHeightRef = useRef(0)

  /** 偏移量为 5px，使得列表顶部压住图片底部 */
  const OFFSET = 5

  useEffect(() => {
    dispatch(getArtist(Number(params.id)))

    if (!imageWrapperRef.current || !scrollWrapperRef.current || !scrollRef.current) {
      return
    }

    const imageHeight = imageWrapperRef.current.offsetHeight
    scrollWrapperRef.current.style.top = `${imageHeight - OFFSET}px`
    imageHeightRef.current = imageHeight
    scrollRef.current.refresh()
  }, [])

  const handleScroll = useCallback((pos: { x: number; y: number }) => {
    if (
      !imageWrapperRef.current ||
      !scrollWrapperRef.current ||
      !scrollRef.current ||
      !marqueeHeaderRef.current ||
      !collectButtonRef.current
    ) {
      return
    }

    const newY = pos.y
    const minScrollY = -(imageHeightRef.current - OFFSET) + marqueeHeaderRef.current.offsetHeight
    // 计算滑动距离占图片高度的百分比
    const percent = Math.abs(newY / imageHeightRef.current)
    if (newY > 0) {
      // 从初始位置向下滑动
      imageWrapperRef.current.style.transform = `scale(${1 + percent})`
      collectButtonRef.current.style.transform = `translate3d(0, ${newY}px, 0)`
    } else if (newY >= minScrollY) {
      // 从初始位置向上滑动
      imageWrapperRef.current.style.paddingTop = '75%'
      collectButtonRef.current.style.transform = `translate3d(0, ${newY}px, 0)`
      collectButtonRef.current.style.opacity = `${1 - percent * 1.5}`
    } else {
      // 列表向上滚动至完全覆盖图片
      imageWrapperRef.current.style.paddingTop = '0'
    }
  }, [])

  const backgroundStyle = useMemo(() => {
    if (!artist) {
      return {}
    }
    return {
      backgroundImage: `url(${artist.picUrl})`
    }
  }, [artist])

  return (
    <CSSTransition in={showStatus} timeout={300} classNames="page-change" appear={true} unmountOnExit onExited={goBack}>
      <div className="fixed top-0 bottom-0 z-[150] w-full origin-bottom-right bg-[#f2f3f4]">
        <MarqueeHeader isMarquee={false} title={artist?.name || '歌手'} onClick={handleClick} ref={marqueeHeaderRef} />
        <div
          className="relative z-50 h-0 w-full origin-top bg-cover pt-[75%]"
          style={backgroundStyle}
          ref={imageWrapperRef}
        >
          {/* 滤镜 */}
          <div className="bg-filter absolute top-0 left-0 h-full w-full"></div>
        </div>
        <div
          className="absolute left-0 right-0 z-50 mx-auto -mt-14 flex h-10 w-32 items-center justify-center rounded-full bg-theme_color text-light_color"
          ref={collectButtonRef}
        >
          <FaStar className="mr-1.5 text-lg" />
          <span className="text-base tracking-[0.3rem]">收藏</span>
        </div>
        <div className="absolute top-0 bottom-0 z-50 w-full" ref={scrollWrapperRef}>
          <Scroll ref={scrollRef} onScrollCallback={handleScroll}>
            <div className="absolute w-full overflow-visible">
              {artist && !enterLoading && <SongList song={artist} />}
            </div>
          </Scroll>
        </div>
        {enterLoading && <EnterLoading />}
      </div>
    </CSSTransition>
  )
}

export default memo(ArtistPage)
