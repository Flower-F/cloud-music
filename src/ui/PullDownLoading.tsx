import { FC, memo } from 'react'

interface IProps {
  className?: string
}

const PullDownLoading: FC<IProps> = ({ className }) => {
  return (
    <div className={`mx-auto h-3 w-full text-center text-sm ${className}`}>
      <div className="mr-0.5 inline-block h-full w-0.5 animate-wave bg-theme_color" />
      <div className="-animation-delay-4 mr-0.5 inline-block h-full w-0.5 animate-wave bg-theme_color" />
      <div className="-animation-delay-6 mr-0.5 inline-block h-full w-0.5 animate-wave bg-theme_color" />
      <div className="-animation-delay-5 mr-0.5 inline-block h-full w-0.5 animate-wave bg-theme_color" />
      <div className="-animation-delay-2 mr-1 inline-block h-full w-0.5 animate-wave bg-theme_color" />
      <span>拼命加载中</span>
    </div>
  )
}

export default memo(PullDownLoading)
