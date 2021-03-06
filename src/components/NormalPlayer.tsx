import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { CgPlayButtonO, CgPlayPauseO } from 'react-icons/cg'
import { FaRandom } from 'react-icons/fa'
import { ImNext, ImPrevious } from 'react-icons/im'
import { RiArrowDropDownLine, RiPlayListFill } from 'react-icons/ri'
import { TbRepeat, TbRepeatOnce } from 'react-icons/tb'
import { CSSTransition } from 'react-transition-group'

import { EPlayingMode } from '@/api'
import ProgressBar from '@/ui/ProgressBar'
import { formatPlayingTime, getName } from '@/utils'

import { ICommonPlayerProps } from './MiniPlayer'

interface IProps {
  fullscreen: boolean
  duration: number
  currentTime: number
  playingMode: EPlayingMode
  percentChangeCallback: (currentPercent: number, ...args: any[]) => void
  handlePrev: () => void
  handleNext: () => void
  changeMode: () => void
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
  changeMode
}) => {
  const normalPlayerRef = useRef<HTMLDivElement | null>(null)

  const handleEnter = useCallback(() => {
    if (!normalPlayerRef.current) {
      return
    }
    normalPlayerRef.current.style.display = 'block'
  }, [])

  const handleExited = useCallback(() => {
    if (!normalPlayerRef.current) {
      return
    }
    normalPlayerRef.current.style.display = 'none'
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
                alt={`${song.name}?????????`}
                className={`animate-rotating h-full w-full rounded-full ${!isPlaying && 'animate-pause'}`}
              />
            </div>
            {/* ?????? */}
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
            <div className="absolute top-1/2 bottom-16 left-0 right-0 w-full -translate-y-1/2">
              <img
                src={`${song.al.picUrl}?param=400x400`}
                alt="????????????"
                className="absolute left-1/2 top-1/2 -mt-[35vw] -ml-[35vw] h-[70vw] w-[70vw] animate-normal-rotating rounded-full border-8 border-solid border-white/50"
              />
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
