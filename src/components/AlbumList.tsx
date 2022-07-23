import { FC, memo } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

import { getCount, getName } from '@/utils'

import { IAlbum } from './AlbumHeader'

interface IProps {
  album: IAlbum
}

const AlbumList: FC<IProps> = ({ album }) => {
  return (
    <div className="h-full rounded-lg bg-highlight_background_color opacity-95">
      <div className="relative ml-3 flex h-11 justify-between border-b border-solid border-border_color py-2">
        <div className="flex items-center leading-4 text-desc_color">
          <BsPlayCircle className="mr-2 text-2xl" />
          <div>
            <span className="mr-1 text-lg text-black">播放全部</span>
            <span className="text-sm text-desc_color_v2">
              共{album.tracks.length}首
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex h-full items-center justify-center rounded bg-theme_color px-3 text-light_color">
          <FaStar className="mr-1.5 text-lg" />
          <span>收藏 {getCount(album.subscribedCount)}</span>
        </div>
      </div>
      <ul>
        {album.tracks.map((item, index) => (
          <li key={index} className="flex h-16 items-center">
            <span className="h-14 w-14 basis-14 text-center leading-[3.5rem]">
              {index + 1}
            </span>
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

export default memo(AlbumList)
