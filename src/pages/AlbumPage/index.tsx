import './style.css'

import { useCallback, useState } from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import AlbumHeader from '@/components/AlbumHeader'
import AlbumList from '@/components/AlbumList'
import AlbumMenu from '@/components/AlbumMenu'
import Header from '@/components/Header'
import Scroll from '@/ui/Scroll'

const AlbumPage = () => {
  const album = {
    creator: {
      avatarUrl:
        'http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg',
      nickname: '浪里推舟'
    },
    coverImgUrl:
      'http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg',
    subscribedCount: 2010711,
    name: '听完就睡，耳机是天黑以后柔软的梦境',
    tracks: [
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      },
      {
        name: '我真的受伤了',
        ar: [{ name: '张学友' }, { name: '周华健' }],
        al: {
          name: '学友 热'
        }
      }
    ]
  }

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
        <Scroll bounceTop={false}>
          <div>
            <AlbumHeader album={album} />
            <AlbumMenu />
            <AlbumList album={album} />
          </div>
        </Scroll>
      </div>
    </CSSTransition>
  )
}

export default memo(AlbumPage)
