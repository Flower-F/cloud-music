import { FC, memo } from 'react'

import Scroll from './Scroll'

export interface ISingerConfig {
  name: string
  key: string
}

interface IProps {
  list: ISingerConfig[]
  title?: string
  oldValue?: string
  onClick?: (newValue: string) => void
}

const Horizon: FC<IProps> = ({ list, title = '', oldValue = '', onClick }) => {
  const handleClick = (item: ISingerConfig) => {
    if (onClick) {
      onClick(item.key)
    }
  }

  return (
    <Scroll direction="horizontal" className="whitespace-nowrap">
      <div className="inline-block h-9 py-1">
        <h3 className="mr-0.5 inline-block text-base text-gray-500">{title}</h3>
        {list.map((item) => (
          <div
            key={item.key}
            className={`mx-0.5 inline-block rounded-md px-2 text-center text-base ${
              oldValue === item.key &&
              'border border-solid border-theme_color text-theme_color opacity-80'
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
