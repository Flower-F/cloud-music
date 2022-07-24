import { FC, memo, useCallback } from 'react'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'

import defaultSingerImage from '@/assets/images/default-singer.png'

export interface ISinger {
  /** 歌手id */
  id: number
  /** 图片链接 */
  picUrl: string
  /** 歌手名称 */
  name: string
  /** 图片id */
  picId: number
}

interface IProps {
  singerList: ISinger[]
}

const SingerList: FC<IProps> = ({ singerList }) => {
  const navigate = useNavigate()

  const enterDetail = useCallback((id: number) => {
    navigate(`/singer/${id}`)
  }, [])

  return (
    <ul className="flex flex-col overflow-hidden">
      {singerList.map(({ picId, picUrl, name, id }, index) => (
        <li
          key={`${picId}${index}`}
          className="mx-1 flex items-center border-b border-solid border-b-border_color py-1"
          onClick={() => enterDetail(id)}
        >
          <div className="mr-4">
            <LazyLoad placeholder={<img src={defaultSingerImage} alt="音乐歌单" className="h-12 w-14 rounded" />}>
              <img src={`${picUrl}?param=300x300`} className="h-12 w-14 rounded" alt="歌手列表" />
            </LazyLoad>
          </div>
          <div className="text-base font-medium text-desc_color">{name}</div>
        </li>
      ))}
    </ul>
  )
}

export default memo(SingerList)
