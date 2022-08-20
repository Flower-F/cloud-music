import { createRef, ElementRef, FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { CgPlayButtonO, CgPlayPauseO } from 'react-icons/cg'
import { FaRandom } from 'react-icons/fa'
import { ImNext, ImPrevious } from 'react-icons/im'
import { RiArrowDropDownLine, RiPlayListFill } from 'react-icons/ri'
import { TbRepeat, TbRepeatOnce } from 'react-icons/tb'
import { CSSTransition } from 'react-transition-group'

import { EPlayingMode } from '@/api'
import { useForceUpdate } from '@/hooks'
import ProgressBar from '@/ui/ProgressBar'
import Scroll from '@/ui/Scroll'
import { formatPlayingTime, getName, LyricParser } from '@/utils'

import { ICommonPlayerProps } from './MiniPlayer'

interface IProps {
  /** 是否全屏 */
  fullscreen: boolean
  /** 歌曲持续时间 */
  duration: number
  /** 当前播放时间 */
  currentTime: number
  /** 播放模式 */
  playingMode: EPlayingMode
  /** 当前正在播放的歌词 */
  currentLyric: string
  /** 歌词解析 */
  currentLyricParser: LyricParser | null
  /** 当前的行数 */
  currentLine: number
  /** 滚动条百分比修改时的回调函数 */
  percentChangeCallback: (currentPercent: number, ...args: any[]) => void
  /** 播放上一首 */
  handlePrev: () => void
  /** 播放下一首 */
  handleNext: () => void
  /** 修改播放模式 */
  changeMode: () => void
}

export enum ECurrentState {
  /** 显示歌词 */
  LYRIC,
  /** 显示封面 */
  COVER
}

const NormalPlayer: FC<ICommonPlayerProps & IProps> = ({
  song,
  fullscreen,
  setFullscreen,
  dispatch,
  pause,
  play,
  isPlaying,
  currentTime,
  duration,
  percent,
  playingMode,
  percentChangeCallback,
  handleNext,
  handlePrev,
  changeMode,
  currentLyric,
  currentLyricParser,
  currentLine
}) => {
  const normalPlayerRef = useRef<HTMLDivElement | null>(null)
  const forceUpdate = useForceUpdate()

  const handleEnter = useCallback(() => {
    if (!normalPlayerRef.current) {
      return
    }
    normalPlayerRef.current.style.visibility = 'visible'
  }, [])

  const handleExited = useCallback(() => {
    if (!normalPlayerRef.current) {
      return
    }
    normalPlayerRef.current.style.visibility = 'hidden'
  }, [])

  const toggleToMiniPlayer = useCallback(() => {
    dispatch(setFullscreen(false))
  }, [])

  const playingModeIcon = useMemo(() => {
    if (playingMode === EPlayingMode.RANDOM_MODE) {
      return <FaRandom className="text-3xl" onClick={changeMode} />
    } else if (playingMode === EPlayingMode.LOOP_MODE) {
      return <TbRepeatOnce className="text-4xl" onClick={changeMode} />
    } else {
      return <TbRepeat className="text-4xl" onClick={changeMode} />
    }
  }, [playingMode])

  type TScrollRef = ElementRef<typeof Scroll>
  const scrollRef = useRef<TScrollRef | null>(null)
  const lyricRefs = useRef<any[]>([])
  const currentState = useRef<ECurrentState>(ECurrentState.COVER)

  const toggleCurrentState = useCallback(() => {
    if (currentState.current === ECurrentState.COVER) {
      currentState.current = ECurrentState.LYRIC
    } else {
      currentState.current = ECurrentState.COVER
    }
    forceUpdate()
  }, [])

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }
    const betterScroll = scrollRef.current.getScroll()
    if (!betterScroll) {
      return
    }

    if (currentLine > 5) {
      // 保持当前歌词在第5条的位置
      const lineEl = lyricRefs.current[currentLine - 5]?.current
      betterScroll.scrollToElement(lineEl, 1000)
    } else {
      // 如果当前歌词行数小于或等于5, 直接滚动到最顶端
      betterScroll.scrollTo(0, 0, 1000)
    }
  }, [currentLine])

  return (
    <CSSTransition
      classNames="normal-player"
      in={fullscreen}
      timeout={400}
      mountOnEnter
      onEnter={handleEnter}
      onExited={handleExited}
    >
      <div className="fixed left-0 right-0 bottom-0 top-0 z-[1500] bg-background_color" ref={normalPlayerRef}>
        {song && (
          <>
            <div className="absolute top-1/2 left-1/2 -z-[1] h-[85vw] w-[85vw] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-lg">
              <img
                src={`${song.al.picUrl}?param=400x400`}
                alt={`${song.name}背景图`}
                className={`animate-rotating h-full w-full rounded-full ${
                  currentState.current === ECurrentState.LYRIC && 'opacity-40'
                }`}
              />
            </div>
            {/* 滤镜 */}
            <div className="absolute left-0 top-0 -z-[1] h-full w-full bg-desc_color opacity-[0.26]"></div>
            <div className="relative mt-6">
              <div className="absolute top-0 left-3">
                <RiArrowDropDownLine className="h-14 w-14 font-normal text-desc_color" onClick={toggleToMiniPlayer} />
              </div>
              <h3 className="text-nowrap mx-auto w-[60%] text-center text-lg font-bold text-desc_color">{song.name}</h3>
              <h3 className="text-nowrap mx-auto w-[60%] text-center text-base leading-5 text-[#333]">
                {getName(song.ar)}
              </h3>
            </div>

            <div onClick={toggleCurrentState} className="bottom-16 left-0 right-0 w-full">
              {/* 歌词封面 */}
              <div
                className={`absolute left-1/2 top-1/2 -mt-[45vw] -ml-[35vw] block h-[70vw] w-[70vw] ${
                  currentState.current === ECurrentState.LYRIC && 'hidden'
                }`}
              >
                <div className="absolute top-1/2 -translate-y-1/2 ">
                  <div className="h-full w-full rounded-full border-8 border-solid border-white/50">
                    <img
                      src={`${song.al.picUrl}?param=400x400`}
                      alt="歌曲封面"
                      className={`h-full w-full animate-normal-rotating rounded-full ${!isPlaying && 'animate-pause'}`}
                    />
                  </div>
                  <p className="mt-2 h-4 w-[70vw] text-center text-lg text-black/60">{currentLyric}</p>
                </div>
              </div>

              {/* 滚动歌词 */}
              <div
                className={`mx-auto block h-screen w-[80vw] overflow-hidden pt-14 pb-72 text-center ${
                  currentState.current === ECurrentState.COVER && 'hidden'
                }`}
              >
                <Scroll ref={scrollRef}>
                  <div>
                    {currentLyricParser ? (
                      currentLyricParser.lines.map((item, index) => {
                        // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要
                        lyricRefs.current[index] = createRef()
                        return (
                          <p
                            className={`py-1 text-lg leading-6 text-black/60 ${
                              currentLine === index ? 'text-white' : ''
                            }`}
                            key={item.text + index}
                            ref={lyricRefs.current[index]}
                          >
                            {item.text}
                          </p>
                        )
                      })
                    ) : (
                      <p className="text pure"> 纯音乐，请欣赏。</p>
                    )}
                  </div>
                </Scroll>
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-12 flex w-full flex-col">
          <div className="mx-auto flex w-[80%] items-center text-sm">
            <div>{formatPlayingTime(currentTime)}</div>
            <ProgressBar percent={percent} percentChangeCallback={percentChangeCallback} />
            <div>{formatPlayingTime(duration)}</div>
          </div>
          <div className="mx-auto flex h-24 w-[84vw] items-center justify-between">
            <div className="flex h-9 w-9 items-end justify-center">{playingModeIcon}</div>
            <ImPrevious className="h-9 w-9" onClick={handlePrev} />
            {isPlaying ? (
              <CgPlayPauseO className="h-14 w-14" onClick={pause} />
            ) : (
              <CgPlayButtonO className="h-14 w-14" onClick={play} />
            )}
            <ImNext className="h-9 w-9" onClick={handleNext} />
            <RiPlayListFill className="text-4xl" />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(NormalPlayer)
