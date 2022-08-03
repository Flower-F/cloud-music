import { FC, memo } from 'react'
import { IoHeadsetSharp } from 'react-icons/io5'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'

import defaultMusicImage from '@/assets/images/default-music.png'
import { getCount } from '@/utils'

export interface IRecommend {
  /** 歌单id */
  id: number
  /** 图片链接 */
  picUrl: string
  /** 播放次数 */
  playCount: number
  /** 描述 */
  name: string
}

interface IProps {
  recommendList: IRecommend[]
}

const RecommendList: FC<IProps> = ({ recommendList }) => {
  const navigate = useNavigate()

  const enterDetail = (id: number) => {
    navigate(`/recommend/${id}`)
  }

  return (
    <div className="mx-auto px-[2%]">
      <h1 className="flex h-10 items-center pl-2 text-sm font-bold">推荐歌单</h1>
      <ul className="flex flex-wrap justify-between">
        {recommendList.map(({ id, name, picUrl, playCount }, index) => (
          <li key={`${id}${index}`} className="w-[32%] pb-1" onClick={() => enterDetail(id)}>
            <div className="relative h-0 pb-[100%]">
              <LazyLoad placeholder={<img src={defaultMusicImage} alt="音乐歌单" className="h-full w-full rounded" />}>
                <img src={`${picUrl}?param=300x300`} alt="音乐歌单" className="h-full w-full rounded" />
              </LazyLoad>
              <div className="bg-decorate absolute right-0 top-0.5 flex items-center rounded p-0.5 text-sm leading-4 text-light_color">
                <IoHeadsetSharp />
                <span className="ml-0.5">{getCount(playCount)}</span>
              </div>
            </div>
            <div className="mt-0.5 h-10 overflow-hidden text-sm text-desc_color">{name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(RecommendList)
