import { FC, memo } from 'react'
import { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import './style.css'

interface IBanner {
  imageUrl: string
}

interface IProps {
  bannerList: IBanner[]
}

const Slider: FC<IProps> = ({ bannerList }) => {
  return (
    <div className="relative -top-1 h-full">
      <div className="absolute h-[60%] w-full bg-theme_color"></div>
      <div className="mx-auto w-[96%]">
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
          {bannerList.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.imageUrl}
                alt={`轮播图 ${index}`}
                className="h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default memo(Slider)
