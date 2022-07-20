import { FC, memo, useMemo } from 'react'
import { IoHeadsetSharp } from 'react-icons/io5'

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
  tracks: {
    /** 歌名 */
    name: string
    /** 歌手列表 */
    ar: { name: string }[]
    /** 歌曲 */
    al: { name: string }
  }[]
  /** 歌单名称 */
  name: string
  /** 订阅数 */
  subscribedCount: number
}

interface IProps {
  album: IAlbum
}

const AlbumHeader: FC<IProps> = ({ album }) => {
  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: `url(${album.coverImgUrl})`
    }
  }, [album.coverImgUrl])

  return (
    <>
      <div className="relative mb-5 flex h-72 w-full items-center justify-around bg-[length:100%] px-5 py-1 pb-12">
        <div
          className="absolute -z-10 h-full w-full bg-cover bg-no-repeat blur-lg"
          style={backgroundStyle}
        >
          <div className="bg-filter absolute top-0 left-0 z-10 h-full w-full"></div>
        </div>
        <div className="relative h-28 w-28">
          <div className="bg-decorate absolute top-0 h-9 w-full rounded"></div>
          <img src={album.coverImgUrl} alt="封面" />
          <div className="absolute right-0.5 top-0.5 flex items-center text-sm leading-4 text-light_color">
            <IoHeadsetSharp className="mr-1" />
            <div>{Math.floor(album.subscribedCount / 1000) / 10}万</div>
          </div>
        </div>
        <div className="flex h-28 flex-1 flex-col justify-around pl-4 pr-1">
          <div className="max-h-16 text-lg font-bold leading-normal text-light_color">
            {album.name}
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-5 w-5">
              <img
                src={album.creator.avatarUrl}
                alt="头像"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="text-base leading-5 text-desc_color_v2">
              {album.creator.nickname}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(AlbumHeader)
