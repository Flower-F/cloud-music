import { memo } from 'react'

const EnterLoading = () => {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-ping rounded-full bg-theme_color opacity-75" />
    </div>
  )
}

export default memo(EnterLoading)
