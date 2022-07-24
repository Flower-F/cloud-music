import { forwardRef, memo } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

interface IProps {
  /** 点击事件 */
  onClick?: (...args: any[]) => any
  /** 是否为滚动条 */
  isMarquee?: boolean
  /** 标题语录 */
  title?: string
}

const MarqueeHeader = forwardRef<HTMLDivElement | null, IProps>(({ onClick, isMarquee = true, title }, ref) => {
  return (
    <div className="bg-marquee fixed z-[100] flex h-10 w-full items-center px-1 text-white" ref={ref}>
      <div className="bg-filter-dark absolute z-50 flex h-9 w-9 items-center justify-center rounded-full text-2xl">
        <IoArrowBackOutline onClick={onClick} />
      </div>
      {isMarquee ? (
        <h1 className="absolute animate-marquee overflow-hidden whitespace-nowrap tracking-wider">
          {title || '暂无标题'}
        </h1>
      ) : (
        <h1 className="text-nowrap absolute left-14 tracking-wider">{title || '暂无标题'}</h1>
      )}
    </div>
  )
})

MarqueeHeader.displayName = 'MarqueeHeader'

export default memo(MarqueeHeader)
