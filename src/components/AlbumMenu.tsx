import { BiCommentDetail } from 'react-icons/bi'
import { BsHandThumbsUp } from 'react-icons/bs'
import { FiMoreHorizontal, FiStar } from 'react-icons/fi'

const AlbumMenu = () => {
  return (
    <div className="relative -mt-24 flex justify-between px-8 pb-5">
      <div className="z-[100] flex flex-col items-center justify-center font-medium leading-5 text-light_color">
        <BiCommentDetail className="mb-0.5 text-xl" />
        <span className="text-sm">评论</span>
      </div>
      <div className="z-[100] flex flex-col items-center justify-center font-medium leading-5 text-light_color">
        <BsHandThumbsUp className="mb-0.5 text-xl" />
        <span className="text-sm">点赞</span>
      </div>
      <div className="z-[100] flex flex-col items-center justify-center font-medium leading-5 text-light_color">
        <FiStar className="mb-0.5 text-xl" />
        <span className="text-sm">收藏</span>
      </div>
      <div className="z-[100] flex flex-col items-center justify-center font-medium leading-5 text-light_color">
        <FiMoreHorizontal className="mb-0.5 text-xl" />
        <span className="text-sm">更多</span>
      </div>
    </div>
  )
}
export default AlbumMenu
