import { FC, memo, PropsWithChildren } from 'react'

interface IProps {
  /** 半径 */
  radius: number
  /** 进度 */
  percent: number
  className?: string
}

const ProgressCircle: FC<PropsWithChildren<IProps>> = ({ radius, percent, children, className }) => {
  const dashArray = Math.PI * 100
  const dashOffset = (1 - percent) * dashArray

  return (
    <div className={className}>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        className="rounded-full border-2 border-solid border-red-600"
      >
        <circle
          className="origin-center scale-90 stroke-theme_color_shadow/60"
          r={50}
          cx={50}
          cy={50}
          strokeWidth={10}
          fill="transparent"
        ></circle>
        <circle
          className="origin-center -rotate-90 scale-90 stroke-theme_color"
          r={50}
          cx={50}
          cy={50}
          strokeWidth={10}
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
