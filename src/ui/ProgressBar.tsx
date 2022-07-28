import { FC, memo, useCallback, useRef } from 'react'

interface IProps {
  className?: string
}

const ProgressBar: FC<IProps> = ({ className }) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const progressButtonRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  const handleTouchStart = useCallback(() => {
    console.log('touchstart')
  }, [])
  const handleTouchMove = useCallback(() => {
    console.log('touchmove')
  }, [])
  const handleTouchEnd = useCallback(() => {
    console.log('touchend')
  }, [])

  return (
    <div className={`relative mx-4 h-1 w-full rounded-md bg-black/30 ${className || ''}`} ref={progressBarRef}>
      <div className="absolute left-0 h-1 w-[70%] bg-black/60" ref={progressRef}></div>
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
