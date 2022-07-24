import { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'

import BannerList from '@/components/BannerList'
import RecommendList from '@/components/RecommendList'
import { getBannerListAndRecommendList } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import Scroll from '@/ui/Scroll'

const RecommendPage = () => {
  const { bannerList, recommendList, enterLoading } = useAppSelector((store) => store.recommend)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!recommendList.length || !bannerList.length) {
      dispatch(getBannerListAndRecommendList())
    }
  }, [])

  return (
    <div className="fixed top-[5.75rem] bottom-0 w-full">
      {!enterLoading && (
        <Scroll onScrollCallback={forceCheck}>
          <div>
            <BannerList bannerList={bannerList} />
            <RecommendList recommendList={recommendList} />
          </div>
        </Scroll>
      )}
      {enterLoading && <EnterLoading />}
    </div>
  )
}

export default memo(RecommendPage)
