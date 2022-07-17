import { FC, memo } from 'react'
import LazyLoad from 'react-lazyload'

import defaultRecommendImage from '@/assets/images/default-recommend.png'

export interface ISinger {
  /** 图片链接 */
  picUrl: string
  /** 歌手名称 */
  name: string
  /** 图片id */
  picId: number
}

interface IProps {
  singerList: ISinger[]
}

const SingerList: FC<IProps> = ({ singerList }) => {
  return (
    <div className="flex flex-col overflow-hidden">
      {singerList.map((item, index) => (
        <div
          key={item.picId + index}
          className="mx-1 flex items-center border-b border-solid border-b-border_color py-1"
        >
          <div className="mr-4">
            <LazyLoad
              placeholder={
                <img
                  src={defaultRecommendImage}
                  alt="音乐歌单"
                  className="absolute h-full w-full rounded"
                />
              }
            >
              <img
                src={`${item.picUrl}?param=300x300`}
                className="h-14 w-14 rounded"
                alt="歌手列表"
              />
            </LazyLoad>
          </div>
          <span className="text-base font-medium text-desc_color">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default memo(SingerList)
