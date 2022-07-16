import { memo } from 'react'

import { singerAlphas, singerAreas, singerTypes } from '@/api/config'
import HorizontalItem from '@/ui/HorizontalItem'

const SingerPage = () => {
  return (
    <div className="fixed top-24 w-full overflow-hidden p-1">
      <HorizontalItem list={singerTypes} title="类型" />
      <HorizontalItem list={singerAreas} title="地域" />
      <HorizontalItem list={singerAlphas} title="首字母" />
    </div>
  )
}

export default memo(SingerPage)
