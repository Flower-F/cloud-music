import { FC, memo, useState } from 'react'

import Scroll from './Scroll'

export interface ISingerConfig {
  name: string
  key: string
}

interface IProps {
  list: ISingerConfig[]
  initialValue?: string
  title?: string
}

const HorizontalItem: FC<IProps> = ({
  list,
  initialValue = '',
  title = ''
}) => {
  const [value, setValue] = useState(initialValue)

  return (
    <Scroll direction="horizontal" className="whitespace-nowrap">
      <div className="inline-block py-1">
        <h3 className="mr-1 inline-block text-base text-gray-500">{title}</h3>
        {list.map((item) => (
          <div
            key={item.key}
            className={`mx-0.5 inline-block rounded-md px-2 text-center text-base ${
              value === item.key &&
              'border border-solid border-theme_color text-theme_color opacity-80'
            }`}
            onClick={() => setValue(item.key)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </Scroll>
  )
}

export default memo(HorizontalItem)
