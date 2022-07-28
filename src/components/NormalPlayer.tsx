import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { FC, memo, useCallback, useRef } from 'react'
import { CgPlayPauseO } from 'react-icons/cg'
import { ImLoop2 } from 'react-icons/im'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { RiArrowDropDownLine, RiPlayListFill } from 'react-icons/ri'
import { CSSTransition } from 'react-transition-group'

import { useAppDispatch } from '@/store'
import ProgressBar from '@/ui/ProgressBar'
import { getName } from '@/utils'

import { IPlayer } from './MiniPlayer'

interface IProps {
  song: IPlayer
  fullscreen: boolean
  setFullScreen: ActionCreatorWithPayload<boolean, string>
  dispatch: ReturnType<typeof useAppDispatch>
}

const NormalPlayer: FC<IProps> = ({ song, fullscreen, setFullScreen, dispatch }) => {
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
    dispatch(setFullScreen(false))
  }, [])

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
        <div className="absolute top-1/2 left-1/2 -z-[1] h-[85vw] w-[85vw] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-lg">
          <img
            src={song.al.picUrl}
            alt={`${song.name}背景图`}
            className="animate-rotating h-full w-full rounded-full"
          />
        </div>
        {/* 滤镜 */}
        <div className="absolute left-0 top-0 -z-[1] h-full w-full bg-desc_color opacity-[0.26]"></div>
        <div className="relative mt-6">
          <div className="absolute top-0 left-4">
            <RiArrowDropDownLine className="h-14 w-14 font-normal text-desc_color" onClick={toggleToMiniPlayer} />
          </div>
          <h3 className="text-nowrap mx-auto w-[80%] text-center text-lg text-desc_color">{song.name}</h3>
          <h3 className="text-nowrap mx-auto w-[80%] text-center text-base leading-5 text-[#333]">
            {getName(song.ar)}
          </h3>
        </div>
        <div className="absolute top-1/2 bottom-16 left-0 right-0 w-full -translate-y-1/2">
          <img
            src={`${song.al.picUrl}?param=400x400`}
            alt="歌曲封面"
            className="border-[rgba(255, 255, 255, 0.1)] absolute left-1/2 top-1/2 -mt-[35vw] -ml-[35vw] h-[70vw] w-[70vw] animate-normal-rotating rounded-full border-8 border-solid"
          />
        </div>
        <div className="absolute bottom-12 flex w-full flex-col">
          <ProgressBar />
          <div className="flex h-24 w-full items-center justify-between px-10">
            <ImLoop2 className="text-3xl" />
            <MdSkipPrevious className="text-4xl" />
            <CgPlayPauseO className="text-6xl" />
            <MdSkipNext className="text-4xl" />
            <RiPlayListFill className="text-4xl" />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(NormalPlayer)
