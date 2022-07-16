import { FC } from 'react'

export interface ISinger {
  picUrl: string
  name: string
  accountId: number
}

interface IProps {
  singerList: ISinger[]
}

const SingerList: FC<IProps> = ({ singerList }) => {
  return (
    <div className="flex flex-col overflow-hidden">
      {singerList.map((item) => (
        <div
          key={item.accountId}
          className="mx-1 flex items-center border-b border-solid border-b-border_color py-1"
        >
          <div className="mr-5">
            <img
              src={`${item.picUrl}?param=300x300`}
              className="h-14 w-14 rounded"
              alt="歌手列表"
            />
          </div>
          <span className="text-base font-medium text-desc_color">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SingerList
