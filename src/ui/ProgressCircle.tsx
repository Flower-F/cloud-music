import { FC, memo, PropsWithChildren } from 'react'

interface IProps {
  /** 半径 */
  radius: number
  /** 进度 */
  percent: number
}

const ProgressCircle: FC<PropsWithChildren<IProps>> = ({ radius, percent, children }) => {
  const dashArray = Math.PI * 100
  const dashOffset = (1 - percent) * dashArray

  return (
    <div className="relative">
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="https://www.w3.org/2000/svg">
        <circle
          className="origin-center scale-90 stroke-theme_color_shadow"
          r={50}
          cx={50}
          cy={50}
          strokeWidth={8}
          fill="transparent"
        ></circle>
        <circle
          className="origin-center -rotate-90 scale-90 stroke-theme_color"
          r={50}
          cx={50}
          cy={50}
          strokeWidth={8}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          fill="transparent"
        ></circle>
      </svg>
      {children}
    </div>
  )
}

export default memo(ProgressCircle)
