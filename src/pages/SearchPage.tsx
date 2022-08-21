import { memo, useCallback, useState } from 'react'
import { RiNeteaseCloudMusicFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import MarqueeHeader from '@/ui/MarqueeHeader'
import SearchBox from '@/ui/SearchBox'

const SearchPage = () => {
  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [])

  const [showStatus, setShowStatus] = useState(true)
  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const [query, setQuery] = useState('')

  const handleQueryRequest = (q: string) => {
    setQuery(q)
  }

  return (
    <CSSTransition in={showStatus} timeout={300} classNames="page-change" appear={true} unmountOnExit onExited={goBack}>
      <div className="fixed top-0 bottom-0 z-[150] w-full origin-bottom-right bg-background_color">
        <MarqueeHeader title="搜索" onBack={handleBack} isMarquee={false} />
        <SearchBox
          newQuery={query}
          handleQueryRequest={handleQueryRequest}
          className="mx-auto mt-12 flex w-[90%] items-center rounded border border-solid border-b-border_color bg-theme_color py-2 px-3"
        />
        <div className="flex h-40 items-center justify-center">
          <RiNeteaseCloudMusicFill className="text-6xl text-theme_color" />
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(SearchPage)
