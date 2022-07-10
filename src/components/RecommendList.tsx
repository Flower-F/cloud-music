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
          <div key={index} className="w-[32%]">
            <div className="relative h-0 pb-[100%]">
              <div className="h-[36px]bg-desc_color_v2 absolute top-0"></div>
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
            <div
              className="my-0.5 h-10 overflow-hidden py-0.5
              text-sm leading-snug text-desc_color"
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(RecommendList)
