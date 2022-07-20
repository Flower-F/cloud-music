import { FC, memo } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

interface IProps {
  onClick?: (...args: any[]) => any
}

const Header: FC<IProps> = ({ onClick }) => {
  return (
    <div className="fixed z-[100] flex h-10 w-full items-center px-1 py-3 pt-0 leading-10 text-light_color">
      <IoArrowBackOutline className="mr-1 w-5 text-xl" onClick={onClick} />
      <h1 className="text-lg font-bold">返回</h1>
    </div>
  )
}

export default memo(Header)
