import { FC, memo } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { FiStar } from 'react-icons/fi'

import { getName } from '@/utils'

import { IAlbum } from './AlbumHeader'

interface IProps {
  album: IAlbum
}

const AlbumList: FC<IProps> = ({ album }) => {
  return (
    <div className="rounded-lg bg-highlight_background_color opacity-95">
      <div className="relative ml-3 flex justify-between border-b border-solid border-border_color py-3">
        <div className="flex items-center leading-4 text-desc_color">
          <BsPlayCircle className="mr-2 text-2xl" />
          <div>
            <span className="text-sm text-desc_color_v2">
              播放全部共 {album.tracks.length} 首
            </span>
          </div>
        </div>
        <div className="absolute top-0 bottom-0 right-0 flex w-32 items-center rounded bg-theme_color px-2 leading-9 text-light_color">
          <FiStar className="mr-2" />
          <span>收藏 {Math.floor(album.subscribedCount / 1000) / 10}万</span>
        </div>
      </div>
      <ul>
        {album.tracks.map((item, index) => (
          <li key={index} className="flex h-16 items-center">
            <span className="h-14 w-14 basis-14 text-center leading-[3.5rem]">
              {index + 1}
            </span>
            <div className="text-overflow flex h-full flex-1 flex-col justify-around border-b border-solid border-border_color py-1">
              <span className="text-overflow text-desc_color">{item.name}</span>
              <span className="text-overflow text-sm text-[#bba8a8]">
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
