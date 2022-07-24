import 'swiper/css'
import 'swiper/css/pagination'

import { FC, memo } from 'react'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

export interface IBanner {
  /** 图片链接 */
  imageUrl: string
}

interface IProps {
  bannerList: IBanner[]
}

const Slider: FC<IProps> = ({ bannerList }) => {
  return (
    <div className="relative mt-1 h-36">
      <div className="absolute -top-72 h-96 w-full bg-theme_color"></div>
      <div className="mx-auto w-[98%]">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          modules={[Pagination, Autoplay]}
          className="rounded-md"
        >
          {bannerList.map(({ imageUrl }, index) => (
            <SwiperSlide key={index}>
              <img src={imageUrl} alt={`轮播图 ${index}`} className="h-full w-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default memo(Slider)
