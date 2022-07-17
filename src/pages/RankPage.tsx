import { memo, useEffect } from 'react'
import { forceCheck } from 'react-lazyload'

import RankList from '@/components/RankList'
import { getRankList } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import Scroll from '@/ui/Scroll'

const RankPage = () => {
  const { enterLoading, rankList } = useAppSelector((store) => store.rank)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankList())
    }
  }, [])

  return (
    <div className="fixed top-24 bottom-0 w-full">
      <Scroll onScrollCallback={forceCheck}>
        <RankList rankList={rankList} />
      </Scroll>
      {enterLoading && <EnterLoading />}
    </div>
  )
}

export default memo(RankPage)
