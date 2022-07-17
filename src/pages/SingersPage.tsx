import { ElementRef, memo, useCallback, useEffect, useRef } from 'react'
import { forceCheck } from 'react-lazyload'

import { singerAlphas, singerAreas, singerTypes } from '@/api'
import SingerList from '@/components/SingerList'
import {
  getHotSingerList,
  pullDownSingerList,
  pullUpSingerList,
  singersSlice,
  updateSingerList
} from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import Horizon from '@/ui/Horizon'
import PullDownLoading from '@/ui/PullDownLoading'
import Scroll from '@/ui/Scroll'

const SingersPage = () => {
  const {
    singerList,
    enterLoading,
    pullDownLoading,
    pullUpLoading,
    type,
    area,
    alpha
  } = useAppSelector((store) => store.singers)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!singerList.length) {
      dispatch(getHotSingerList())
    }
  }, [])

  const handlePullUp = useCallback(() => {
    dispatch(pullUpSingerList())
  }, [])

  const handlePullDown = useCallback(() => {
    dispatch(pullDownSingerList())
  }, [])

  type TScrollRef = ElementRef<typeof Scroll>
  const scrollRef = useRef<TScrollRef | null>(null)
  const { setType, setAlpha, setArea } = singersSlice.actions

  const handleUpdateType = useCallback(
    (newVal: string) => {
      if (type === newVal) return
      dispatch(setType(newVal))
      dispatch(updateSingerList())
      scrollRef.current?.refresh()
    },
    [type]
  )

  const handleUpdateArea = useCallback(
    (newVal: string) => {
      if (area === newVal) return
      dispatch(setArea(newVal))
      dispatch(updateSingerList())
      scrollRef.current?.refresh()
    },
    [area]
  )

  const handleUpdateAlpha = useCallback(
    (newVal: string) => {
      if (alpha === newVal) return
      dispatch(setAlpha(newVal))
      dispatch(updateSingerList())
      scrollRef.current?.refresh()
    },
    [alpha]
  )

  return (
    <>
      <div className="fixed top-24 w-full overflow-hidden px-2">
        <Horizon
          list={singerTypes}
          title="类型"
          oldValue={type}
          onClick={handleUpdateType}
        />
        <Horizon
          list={singerAreas}
          title="地域"
          oldValue={area}
          onClick={handleUpdateArea}
        />
        <Horizon
          list={singerAlphas}
          title="首字母"
          oldValue={alpha}
          onClick={handleUpdateAlpha}
        />
      </div>
      <div className="fixed top-52 left-0 bottom-0 w-full overflow-hidden">
        <Scroll
          ref={scrollRef}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          onScrollCallback={forceCheck}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
        >
          <SingerList singerList={singerList} />
        </Scroll>
      </div>
      {enterLoading && <EnterLoading />}
    </>
  )
}

export default memo(SingersPage)
