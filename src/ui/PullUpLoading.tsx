import { FC, memo } from 'react'

interface IProps {
  className?: string
}

const PullUpLoading: FC<IProps> = ({ className = '' }) => {
  return (
    <div className={`rounded-xl py-4 ${className}`}>
      <div className="flex justify-center">
        <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-white p-2 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-slate-200/20">
          <svg
            className="h-6 w-6 text-theme_color"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default memo(PullUpLoading)
