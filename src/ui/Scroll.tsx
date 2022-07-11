import {
  FC,
  forwardRef,
  memo,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import { noop, debounce } from 'lodash-es'
import BetterScroll from 'better-scroll'
import { useEffect } from 'react'
import { PULL_DOWN_DISTANCE, PULL_UP_DISTANCE } from '@/constants'

interface IProps {
  direction?: 'vertical' | 'horizontal' // 滚动的方向
  click?: boolean // 是否支持点击
  refresh?: boolean // 是否刷新
  pullUp?: () => void // 上拉加载逻辑
  pullDown?: () => void // 下拉加载逻辑
  pullUpLoading?: boolean // 是否显示上拉 loading 动画
  pullDownLoading?: boolean // 是否显示下拉 loading 动画
  onScrollCallback: () => void // 滑动触发的回调函数
  bounceTop?: boolean // 是否支持向上吸顶
  bounceBottom?: boolean // 是否支持向下吸底
  children: ReactNode
  className: string
}

const Scroll: FC<IProps> = forwardRef((props: IProps, ref) => {
  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true
  } = props

  const { pullUp = noop, pullDown = noop, onScrollCallback } = props

  const pullUpDebounce = useMemo(() => debounce(pullUp, 500), [pullUp])

  const pullDownDebounce = useMemo(() => debounce(pullDown, 500), [pullDown])

  // betterScroll 实例
  const [betterScroll, setBetterScroll] = useState<BetterScroll | null>(null)

  useEffect(() => {
    const scroll = new BetterScroll(scrollRef.current as HTMLElement, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      // 事件派发类型：https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#probetype
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })

    setBetterScroll(scroll)

    return () => {
      setBetterScroll(null)
    }
  }, [])

  // 监听回调
  useEffect(() => {
    if (!betterScroll || !onScrollCallback) {
      betterScroll?.on('scroll', onScrollCallback)
    }
    return () => {
      betterScroll?.off('scroll', onScrollCallback)
    }
  }, [onScrollCallback, betterScroll])

  // 滑底加载
  useEffect(() => {
    if (!betterScroll || !pullUp) {
      return
    }
    const handlePullUp = () => {
      if (betterScroll.y <= betterScroll.maxScrollY + PULL_UP_DISTANCE) {
        pullUpDebounce()
      }
    }
    // 滚动结束
    betterScroll.on('scrollEnd', handlePullUp)
    return () => {
      betterScroll.off('scrollEnd', handlePullUp)
    }
  }, [betterScroll, pullUpDebounce])

  // 下拉刷新
  useEffect(() => {
    if (!betterScroll || !pullDown) {
      return
    }
    const handlePullDown = (position: { x: number; y: number }) => {
      if (position.y > PULL_DOWN_DISTANCE) {
        pullDownDebounce()
      }
    }
    // 用户手指离开滚动区域
    betterScroll.on('touchEnd', handlePullDown)
    return () => {
      betterScroll.off('touchEnd', handlePullDown)
    }
  }, [betterScroll, pullDownDebounce])

  //刷新
  useEffect(() => {
    if (refresh && betterScroll) {
      betterScroll.refresh()
    }
  })

  // 暴露一些方法给组件的使用者
  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        if (betterScroll) {
          betterScroll.refresh()
          betterScroll.scrollTo(0, 0)
        }
      },
      getScroll() {
        if (betterScroll) {
          return betterScroll
        }
      }
    }),
    []
  )

  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={scrollRef}
      className={`h-full w-full overflow-hidden ${props.className}`}
    >
      {props.children}
      {/* 滑底加载 */}
      <div
        className={`absolute left-0 right-0 bottom-1 z-50 m-auto h-14 w-14
        ${!pullUpLoading && 'hidden'}`}
      >
        {/* <Loading /> */}
      </div>
      {/* 下拉加载 */}
      <div
        className={`absolute left-0 right-0 top-0 z-50 m-auto h-8
        ${!pullDownLoading && 'hidden'}`}
      >
        {/* <Loading /> */}
      </div>
    </div>
  )
})

Scroll.displayName = 'Scroll'

export default memo(Scroll)
