import { FC, memo, useMemo } from 'react'
import { FaStar } from 'react-icons/fa'

import { getCount } from '@/utils'

import { IAlbum } from './SongList'

interface IProps {
  album: IAlbum
}

const AlbumCard: FC<IProps> = ({ album }) => {
  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: `url(${album.coverImgUrl})`
    }
  }, [album])

  return (
    <div className="relative flex h-52 w-full items-center justify-around px-5 pt-10">
      <div className="absolute -z-10 h-full w-full bg-cover bg-no-repeat blur-lg" style={backgroundStyle}>
        <div className="bg-filter absolute top-0 left-0 z-10 h-full w-full"></div>
      </div>
      <div className="relative h-28 w-28 shrink-0">
        <img src={album.coverImgUrl} alt="封面" className="h-full w-full rounded" />
        <div className="bg-decorate absolute right-0 top-0.5 flex items-center rounded p-0.5 text-sm leading-4 text-light_color">
          <FaStar className="mr-0.5" />
          <div>{getCount(album.subscribedCount)}</div>
        </div>
      </div>
      <div className="flex h-28 flex-1 flex-col justify-around pl-4 pr-1">
        <div className="max-h-16 text-lg font-bold leading-normal text-light_color">{album.name}</div>
        <div className="flex items-center">
          <div className="mr-1 h-5 w-5 shrink-0">
            <img src={album.creator.avatarUrl} alt="头像" className="h-full w-full rounded-full" />
          </div>
          <div className="text-nowrap w-[10rem] text-base leading-5 text-[#eee]">{album.creator.nickname}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(AlbumCard)
