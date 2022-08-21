import { FC, memo, useCallback } from 'react'

import Scroll from './Scroll'

export interface ISingerConfig {
  name: string
  key: string
}

interface IProps {
  /** 滚动列表 */
  list: ISingerConfig[]
  /** 列表标题 */
  title?: string
  /** 列表原来的值 */
  oldValue?: string
  /** 点击列表项的回调 */
  onClick?: (...args: any[]) => any
  className?: string
}

const Horizon: FC<IProps> = ({ list, title = '', oldValue = '', onClick, className = '' }) => {
  const handleClick = useCallback((item: ISingerConfig) => {
    if (onClick) {
      onClick(item.key)
    }
  }, [])

  return (
    <Scroll direction="horizontal" className={`whitespace-nowrap ${className}`}>
      <div className="inline-block h-9 py-1">
        <h3 className="mr-0.5 inline-block text-base text-gray-500">{title}</h3>
        {list.map((item) => (
          <div
            key={item.key}
            className={`ml-1 inline-block rounded px-1 text-center text-base ${
              oldValue === item.key && 'border border-solid border-theme_color text-theme_color opacity-80'
            }`}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </Scroll>
  )
}

export default memo(Horizon)
