import {
  ElementRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import SongList from '@/components/SongList'
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

  const artist = {
    picUrl:
      'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
    name: '薛之谦',
    hotSongs: [
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑'
        }
      }
    ]
  }

  type TScrollRef = ElementRef<typeof Scroll>
  type TMarqueeHeaderRef = ElementRef<typeof MarqueeHeader>

  const collectButtonRef = useRef<HTMLDivElement | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null)
  const backgroundLayerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<TScrollRef | null>(null)
  const marqueeHeaderRef = useRef<TMarqueeHeaderRef | null>(null)
  const initialImageHeight = useRef(0)

  /** 偏移量为 5px */
  const OFFSET = 5

  useEffect(() => {
    if (
      !imageWrapperRef.current ||
      !scrollWrapperRef.current ||
      !backgroundLayerRef.current ||
      !scrollRef.current
    ) {
      return
    }
    const imageHeight = imageWrapperRef.current.offsetHeight
    scrollWrapperRef.current.style.top = `${imageHeight - OFFSET}px`
    initialImageHeight.current = imageHeight
    // 把遮罩先放在下面，以裹住歌曲列表
    backgroundLayerRef.current.style.top = `${imageHeight - OFFSET}px`
    scrollRef.current.refresh()
  }, [])

  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: `url(${artist.picUrl})`
    }
  }, [artist.picUrl])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="page-change"
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <div className="fixed top-[5.75rem] bottom-0 z-[150] w-full origin-bottom-right bg-[#f2f3f4]">
        <MarqueeHeader
          isMarquee={false}
          title={artist.name}
          onClick={handleClick}
          ref={marqueeHeaderRef}
        />
        <div
          className="relative z-50 h-0 w-full origin-top bg-cover pt-[75%]"
          style={backgroundStyle}
          ref={imageWrapperRef}
        >
          <div className="bg-filter absolute top-0 left-0 z-10 h-full w-full"></div>
        </div>
        <div
          className="absolute left-0 right-0 z-50 m-auto -mt-14 flex h-10 w-32 items-center justify-center rounded-full bg-theme_color text-light_color"
          ref={collectButtonRef}
        >
          <FaStar className="mr-1.5 text-lg" />
          <span className="text-base tracking-[0.3rem]">收藏</span>
        </div>
        <div
          className="absolute top-0 bottom-0 z-50 w-full rounded-lg bg-white"
          ref={backgroundLayerRef}
        ></div>
        <div
          className="absolute top-0 bottom-0 right-0 left-0 z-50"
          ref={scrollWrapperRef}
        >
          <Scroll ref={scrollRef}>
            <SongList song={artist} />
          </Scroll>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(ArtistPage)
