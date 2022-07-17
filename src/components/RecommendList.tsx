import { FC, memo } from 'react'
import { IoHeadsetSharp } from 'react-icons/io5'
import LazyLoad from 'react-lazyload'

import defaultRecommendImage from '@/assets/images/default-recommend.png'

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
  return (
    <div className="mx-auto px-[2%]">
      <h1 className="pl-2 text-sm font-bold leading-10">推荐歌单</h1>
      <ul className="flex flex-wrap justify-between">
        {recommendList.map((item) => (
          <li key={item.id} className="w-[32vw] pb-2">
            <div className="relative h-0 pb-[100%]">
              <LazyLoad
                placeholder={
                  <img
                    src={defaultRecommendImage}
                    alt="音乐歌单"
                    className="h-full w-full rounded"
                  />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  alt="音乐歌单"
                  className="h-full w-full rounded"
                />
              </LazyLoad>
              <div className="absolute right-1 top-0.5 flex items-center text-sm leading-4 text-light_color">
                <IoHeadsetSharp />
                <span className="ml-0.5">1005</span>
              </div>
            </div>
            <div className="h-10 overflow-hidden text-sm leading-snug text-desc_color">
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(RecommendList)
