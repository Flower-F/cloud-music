import { FC, memo } from 'react'
import { IoHeadsetSharp } from 'react-icons/io5'

interface IRecommend {
  id: number
  imageUrl: string
  playCount: number
  description: string
}

interface IProps {
  recommendList: IRecommend[]
}

const RecommendList: FC<IProps> = ({ recommendList }) => {
  return (
    <div className="mx-auto px-[2%]">
      <h1 className="pl-2 text-sm font-bold leading-10">推荐歌单</h1>
      <div className="flex flex-wrap justify-between">
        {recommendList.map((item, index) => (
          <div key={index} className="w-[32%] pb-2">
            <div className="relative h-0 pb-[100%]">
              <img
                src={`${item.imageUrl}?param=300x300`}
                alt="音乐歌单"
                className="absolute h-full w-full rounded"
              />
              <div
                className="absolute right-1 top-0.5 flex items-center
                text-sm leading-4 text-light_color"
              >
                <IoHeadsetSharp />
                <span className="ml-0.5">1005</span>
              </div>
            </div>
            <div className="h-10 overflow-hidden text-sm leading-snug text-desc_color">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(RecommendList)
