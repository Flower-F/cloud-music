import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { FC, memo, useCallback } from 'react'
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { RiPlayListFill } from 'react-icons/ri'

import { useAppDispatch } from '@/store'
import ProgressCircle from '@/ui/ProgressCircle'
import { getName } from '@/utils'

export interface IPlayer {
  /** 名称 */
  name: string
  /** 歌曲列表 */
  ar: { name: string }[]
  /** 歌曲 */
  al: { picUrl: string }
}

interface IProps {
  song: IPlayer
  setFullScreen: ActionCreatorWithPayload<boolean, string>
  dispatch: ReturnType<typeof useAppDispatch>
  percent: number
  isPlaying: boolean
  setIsPlaying: ActionCreatorWithPayload<boolean, string>
  play: () => void
  pause: () => void
}

const MiniPlayer: FC<IProps> = ({ song, setFullScreen, dispatch, percent, isPlaying, setIsPlaying, play, pause }) => {
  const toggleToNormalPlayer = useCallback(() => {
    dispatch(setFullScreen(true))
  }, [])

  const toggleToPause = useCallback(() => {
    dispatch(setIsPlaying(false))
    pause()
  }, [])

  const toggleToPlay = useCallback(() => {
    dispatch(setIsPlaying(true))
    play()
  }, [])

  return (
    <div className="fixed left-0 -bottom-[1px] z-[1000] flex h-[60px] w-full items-center bg-highlight_background_color">
      <div className="mr-1.5 ml-4 flex h-[60px] w-[48px] items-center " onClick={toggleToNormalPlayer}>
        <img
          src={song.al.picUrl}
          alt={`${song.name}播放中`}
          className={`z-50 h-[44px] w-[44px] animate-mini-rotating rounded-full border border-solid border-zinc-900 ${
            !isPlaying && 'animate-pause'
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center overflow-hidden leading-5">
        <h3 className="text-nowrap mb-0.5 text-base text-desc_color">{song.name}</h3>
        <p className="text-nowrap text-sm text-[#555]">{getName(song.ar)}</p>
      </div>

      <div className="mr-4 flex">
        <ProgressCircle radius={38} percent={percent} className="relative">
          {isPlaying ? (
            <AiOutlinePauseCircle
              className="absolute -top-[1px] -left-[1px] h-[40px] w-[40px] text-theme_color_shadow"
              onClick={toggleToPause}
            />
          ) : (
            <AiOutlinePlayCircle
              className="absolute -top-[1px] -left-[1px] h-[40px] w-[40px] text-theme_color_shadow"
              onClick={toggleToPlay}
            />
          )}
        </ProgressCircle>
        <RiPlayListFill className="ml-2.5 h-9 w-9 text-theme_color" />
      </div>
    </div>
  )
}

export default memo(MiniPlayer)
