import { FC, memo, useMemo } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

import { getCount, getName } from '@/utils'

export interface ISong {
  /** 歌名 */
  name: string
  /** 歌手列表 */
  ar: { name: string }[]
  /** 歌曲 */
  al: { name: string }
}

export interface IAlbum {
  creator: {
    /** 作者头像 */
    avatarUrl: string
    /** 作者昵称 */
    nickname: string
  }
  /** 封面链接 */
  coverImgUrl: string
  /** 具体歌曲 */
  tracks: ISong[]
  /** 歌单名称 */
  name: string
  /** 订阅数 */
  subscribedCount: number
}

export interface IArtist {
  /** 封面链接 */
  picUrl: string
  /** 具体歌曲 */
  hotSongs: ISong[]
  /** 歌手名称 */
  name: string
}

interface IProps {
  /** 具体歌曲 */
  song: IAlbum | IArtist
}

const hasCollect = (song: IAlbum | IArtist): song is IAlbum => {
  return 'tracks' in song
}

const SongList: FC<IProps> = ({ song }) => {
  const tracks = useMemo(() => {
    if ('tracks' in song) {
      return song.tracks
    }
    return song.hotSongs
  }, [song])

  return (
    <div className="h-full rounded-lg bg-highlight_background_color opacity-95">
      <div className="relative ml-3 flex h-11 justify-between border-b border-solid border-border_color py-2">
        <div className="flex items-center leading-4 text-desc_color">
          <BsPlayCircle className="mr-2 text-2xl" />
          <div>
            <span className="mr-1 text-lg text-black">播放全部</span>
            <span className="text-sm text-desc_color_v2">
              共{hasCollect(song) ? song.tracks.length : song.hotSongs.length}首
            </span>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 h-full items-center justify-center rounded bg-theme_color px-3 text-light_color ${
            hasCollect(song) ? 'flex' : 'hidden'
          }`}
        >
          <FaStar className="mr-1.5 text-lg" />
          <span>收藏 {hasCollect(song) && getCount(song.subscribedCount)}</span>
        </div>
      </div>
      <ul>
        {tracks.map((item, index) => (
          <li key={index} className="flex h-16 items-center">
            <span className="h-14 w-14 basis-14 text-center leading-[3.5rem]">{index + 1}</span>
            <div className="text-nowrap flex h-full flex-1 flex-col justify-around border-b border-solid border-border_color py-1">
              <span className="text-nowrap text-desc_color">{item.name}</span>
              <span className="text-nowrap text-sm text-[#bba8a8]">
                {getName(item.ar)} - {item.al.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(SongList)
