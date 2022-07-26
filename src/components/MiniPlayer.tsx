import { FC, memo } from 'react'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { RiPlayListFill } from 'react-icons/ri'

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
}

const MiniPlayer: FC<IProps> = ({ song }) => {
  return (
    <div className="fixed left-0 bottom-0 z-[1000] flex h-16 w-full items-center bg-highlight_background_color">
      <div className="mr-2.5 ml-5 h-10 w-10">
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

      <div className="mr-5 flex text-theme_color">
        <AiOutlinePauseCircle className="mr-1.5 h-9 w-9" />
        <RiPlayListFill className="h-9 w-9" />
      </div>
    </div>
  )
}

export default memo(MiniPlayer)
