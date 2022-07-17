import { FC, memo } from 'react'

export interface IRank {
  /** 封面id */
  coverImgId: number
  /** 封面链接 */
  coverImgUrl: string
  /** 具体歌曲 */
  tracks: {
    first: string
    second: string
  }[]
  /** 榜单名 */
  name: string
  /** 更新频率 */
  updateFrequency: string
}

interface IProps {
  rankList: IRank[]
}

const RankList: FC<IProps> = ({ rankList }) => {
  return (
    <ul className="mt-3 flex flex-wrap justify-between bg-background_color px-1">
      {rankList.map(
        ({ coverImgId, coverImgUrl, name, tracks, updateFrequency }) => (
          <li
            key={coverImgId}
            className={`border-b border-solid border-b-border_color py-1 ${
              tracks.length > 0 && 'flex'
            }`}
          >
            <div
              className={`relative h-[32vw] w-[32vw] rounded ${
                tracks.length && 'h-[27vw] w-[27vw]'
              }`}
            >
              <img
                src={coverImgUrl}
                alt={name}
                className="h-full w-full rounded"
              />
              <div className="bg-decorate absolute bottom-0 h-9 w-full rounded"></div>
              <div className="absolute left-2 bottom-2 text-sm text-light_color">
                {updateFrequency}
              </div>
            </div>
            {tracks.length > 0 && (
              <ul className="flex flex-1 flex-col justify-around p-3">
                {tracks.map((item, index) => (
                  <li
                    key={index}
                    className="w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-700"
                  >
                    {index + 1}. {item.first} - {item.second}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      )}
    </ul>
  )
}

export default memo(RankList)
