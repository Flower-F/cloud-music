import { FC, memo } from 'react'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'

import defaultMusicImage from '@/assets/images/default-music.png'

export interface IRank {
  /** 榜单id */
  id: number
  /** 封面id */
  coverImgId: number
  /** 封面链接 */
  coverImgUrl: string
  /** 具体歌曲 */
  tracks: {
    /** 歌名 */
    first: string
    /** 歌手 */
    second: string
  }[]
  /** 榜单名 */
  name: string
  /** 更新频率 */
  updateFrequency: string
}

interface IProps {
  rankList: IRank[]
}

const RankList: FC<IProps> = ({ rankList }) => {
  const navigate = useNavigate()
  const enterDetail = (id: number) => {
    navigate(`/rank/${id}`)
  }

  return (
    <>
      {rankList.length ? (
        <ul className="mt-3 flex flex-wrap justify-between bg-background_color px-1">
          {rankList.map(({ coverImgId, coverImgUrl, name, tracks, updateFrequency, id }, index) => (
            <li
              key={`${coverImgId}${index}`}
              className={`border-b border-solid border-b-border_color py-1 ${tracks.length > 0 && 'flex'}`}
              onClick={() => enterDetail(id)}
            >
              <div className={`relative h-[32vw] w-[32vw] rounded ${tracks.length && 'h-[27vw] w-[27vw]'}`}>
                <LazyLoad
                  placeholder={<img src={defaultMusicImage} alt="音乐歌单" className="h-full w-full rounded" />}
                >
                  <img src={coverImgUrl} alt={name} className="h-full w-full rounded" />
                </LazyLoad>
                <div className="bg-decorate absolute bottom-0 h-9 w-full rounded"></div>
                <div className="absolute left-2 bottom-2 text-sm text-light_color">{updateFrequency}</div>
              </div>
              {tracks.length > 0 && (
                <ul className="flex flex-1 flex-col justify-around p-3">
                  {tracks.map((item, index) => (
                    <li
                      key={index}
                      className="w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-700"
                    >
                      {index + 1}. {item.first} - {item.second}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div />
      )}
    </>
  )
}

export default memo(RankList)
