import { cloneDeep } from 'lodash-es'
import { FC, memo, MouseEvent, TouchEvent, useCallback, useRef, useState } from 'react'

interface ITouch {
  startX: number
  inited: boolean
  left: number
}

interface IProps {
  className?: string
}

const ProgressBar: FC<IProps> = ({ className }) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const progressButtonRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const [touch, setTouch] = useState<ITouch | null>(null)

  const setOffsetWidth = (offsetWidth: number) => {
    if (!progressRef.current || !progressButtonRef.current) {
      return
    }
    progressRef.current.style.width = `${offsetWidth}px`
    progressButtonRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!progressRef.current) {
      return
    }
    const startTouch: ITouch = {
      startX: e.touches[0].pageX,
      left: progressRef.current.clientWidth,
      inited: true
    }
    setTouch(startTouch)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touch || !touch.inited || !progressBarRef.current || !progressButtonRef.current) {
        return
      }
      const deltaX = e.touches[0].pageX - touch.startX
      const progressBarWidth = progressBarRef.current.clientWidth - progressButtonRef.current.clientWidth
      const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), progressBarWidth)
      setOffsetWidth(offsetWidth)
    },
    [touch]
  )

  const handleTouchEnd = useCallback(() => {
    if (!touch) {
      return
    }
    const endTouch = cloneDeep(touch)
    endTouch.inited = false
    setTouch(endTouch)
  }, [touch])

  const handleClick = useCallback((e: MouseEvent) => {
    if (!progressBarRef.current) {
      return
    }

    const { left } = progressBarRef.current.getBoundingClientRect()
    const offsetWidth = e.pageX - left
    setOffsetWidth(offsetWidth)
  }, [])

  return (
    <div
      className={`relative mx-4 h-1 w-full rounded-md bg-black/30 ${className || ''}`}
      onClick={handleClick}
      ref={progressBarRef}
    >
      <div className="absolute left-0 h-1 bg-black/60" ref={progressRef}></div>
      <div
        className="absolute -top-1.5 -left-1.5 h-4 w-4 rounded-full border-[3px] border-solid border-white bg-theme_color"
        ref={progressButtonRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></div>
    </div>
  )
}

export default memo(ProgressBar)
