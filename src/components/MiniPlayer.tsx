import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { FC, memo, useCallback } from 'react'
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { RiPlayListFill } from 'react-icons/ri'

import { useAppDispatch } from '@/store'
import ProgressCircle from '@/ui/ProgressCircle'
import { getName } from '@/utils'

import { ISong } from './SongList'

export interface ICommonPlayerProps {
  song: ISong | null
  percent: number
  isPlaying: boolean
  play: () => void
  pause: () => void
  setFullscreen: ActionCreatorWithPayload<boolean, string>
  dispatch: ReturnType<typeof useAppDispatch>
}

const MiniPlayer: FC<ICommonPlayerProps> = ({ song, setFullscreen, dispatch, percent, isPlaying, play, pause }) => {
  const toggleToNormalPlayer = useCallback(() => {
    dispatch(setFullscreen(true))
  }, [])

  return (
    <div className="fixed left-0 -bottom-[1px] z-[1000] flex h-[60px] w-full items-center border-y bg-highlight_background_color shadow">
      {song && (
        <>
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
        </>
      )}

      <div className="mr-4 flex">
        <ProgressCircle radius={38} percent={percent} className="relative">
          {isPlaying ? (
            <AiOutlinePauseCircle
              className="absolute -top-[1px] -left-[1px] h-[40px] w-[40px] text-theme_color_shadow"
              onClick={pause}
            />
          ) : (
            <AiOutlinePlayCircle
              className="absolute -top-[1px] -left-[1px] h-[40px] w-[40px] text-theme_color_shadow"
              onClick={play}
            />
          )}
        </ProgressCircle>
        <RiPlayListFill className="ml-2.5 h-9 w-9 text-theme_color" />
      </div>
    </div>
  )
}

export default memo(MiniPlayer)
