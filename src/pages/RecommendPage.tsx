import { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'

import BannerList from '@/components/BannerList'
import RecommendList from '@/components/RecommendList'
import { getBannerList, getRecommendList } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Scroll from '@/ui/Scroll'

const RecommendPage = () => {
  const { bannerList, recommendList } = useAppSelector(
    (store) => store.recommend
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRecommendList())
    dispatch(getBannerList())
  }, [])

  return (
    <div className="fixed top-[5.5rem] bottom-0 w-full">
      <Scroll onScrollCallback={forceCheck}>
        <div>
          <BannerList bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </div>
  )
}

export default memo(RecommendPage)
