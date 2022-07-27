import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { FC, memo, useCallback, useRef } from 'react'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { RiPlayListFill } from 'react-icons/ri'
import { CSSTransition } from 'react-transition-group'

import { useAppDispatch } from '@/store'
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
  fullscreen: boolean
  setFullScreen: ActionCreatorWithPayload<boolean, string>
  dispatch: ReturnType<typeof useAppDispatch>
}

const MiniPlayer: FC<IProps> = ({ song, fullscreen, setFullScreen, dispatch }) => {
  const miniPlayerRef = useRef<HTMLDivElement | null>(null)

  const handleEnter = useCallback(() => {
    if (!miniPlayerRef.current) {
      return
    }
    miniPlayerRef.current.style.display = 'flex'
  }, [])

  const handleExited = useCallback(() => {
    if (!miniPlayerRef.current) {
      return
    }
    miniPlayerRef.current.style.display = 'none'
  }, [])

  const toggleToNormalPlayer = useCallback(() => {
    dispatch(setFullScreen(true))
  }, [])

  return (
    <CSSTransition
      in={!fullscreen}
      timeout={400}
      classNames="mini-player"
      onEnter={handleEnter}
      onExited={handleExited}
    >
      <div
        className="fixed left-0 bottom-0 z-[1000] flex h-16 w-full items-center bg-highlight_background_color"
        ref={miniPlayerRef}
      >
        <div className="mr-2.5 ml-3 h-10 w-10" onClick={toggleToNormalPlayer}>
          <img
            src={song.al.picUrl}
            alt={`${song.name}播放中`}
            className="h-full w-full animate-mini-rotating rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden leading-5">
          <h3 className="text-nowrap mb-0.5 text-base text-desc_color">{song.name}</h3>
          <p className="text-nowrap text-sm text-desc_color_v2">{getName(song.ar)}</p>
        </div>

        <div className="mr-3 flex text-theme_color">
          <AiOutlinePauseCircle className="mr-1.5 h-9 w-9" />
          <RiPlayListFill className="h-9 w-9" />
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(MiniPlayer)
