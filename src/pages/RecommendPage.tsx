import { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'

import BannerList from '@/components/BannerList'
import RecommendList from '@/components/RecommendList'
import { getBannerListAndRecommendList } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Loading from '@/ui/Loading'
import Scroll from '@/ui/Scroll'

const RecommendPage = () => {
  const { bannerList, recommendList, loading } = useAppSelector(
    (store) => store.recommend
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!recommendList.length || !bannerList.length) {
      dispatch(getBannerListAndRecommendList())
    }
  }, [])

  return (
    <div className="fixed top-[5.5rem] bottom-0 w-full">
      <Scroll onScrollCallback={forceCheck}>
        <div>
          <BannerList bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {loading ? <Loading /> : null}
    </div>
  )
}

export default memo(RecommendPage)
