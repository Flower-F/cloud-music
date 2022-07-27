import { FC, memo } from 'react'

interface IProps {
  className?: string
}

const ProgressBar: FC<IProps> = ({ className }) => {
  return (
    <div className={`bg-[rgba(0, 0, 0, 0.3)] relative h-8 ${className || ''}`}>
      <div className="absolute h-full bg-theme_color"></div>
      {/* <div className="absolute -left-4 -top-3 h-8 w-8">
          <div className="relative top-2 left-2 h-4 w-4 rounded-full border-2 border-solid border-theme_color bg-theme_color"></div>
        </div> */}
    </div>
  )
}

export default memo(ProgressBar)
