import './style.css'

import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import Header from '@/components/Header'

const AlbumPage = () => {
  const [showStatus, setShowStatus] = useState(true)

  const navigate = useNavigate()
  const goBack = () => {
    navigate('/recommend')
  }

  const handleClick = useCallback(() => {
    setShowStatus(false)
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      className="album-motion"
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[150] origin-bottom-right bg-background_color">
        <Header onClick={handleClick} />
      </div>
    </CSSTransition>
  )
}

export default AlbumPage
