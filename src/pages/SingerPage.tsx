import { memo } from 'react'

import { singerAlphas, singerAreas, singerTypes } from '@/api/config'
import SingerList from '@/components/SingerList'
import HorizontalItem from '@/ui/HorizontalItem'
import Scroll from '@/ui/Scroll'

const SingerPage = () => {
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
    return {
      picUrl:
        'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
      name: '隔壁老樊',
      accountId: 277313426
    }
  })

  return (
    <>
      <div className="fixed top-24 w-full overflow-hidden px-2">
        <HorizontalItem list={singerTypes} title="类型" />
        <HorizontalItem list={singerAreas} title="地域" />
        <HorizontalItem list={singerAlphas} title="首字母" />
      </div>
      <div className="fixed top-52 left-0 bottom-0 w-full overflow-hidden">
        <Scroll>
          <SingerList singerList={singerList} />
        </Scroll>
      </div>
    </>
  )
}

export default memo(SingerPage)
