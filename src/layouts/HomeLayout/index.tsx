import { memo, useEffect } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import styles from './style.module.css'

const Home = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/recommend')
    }
  }, [pathname])

  const renderLink = (title: string, link: string) => {
    return (
      <NavLink to={link} className={styles['render-link']}>
        {({ isActive }) => (
          <span
            className={`h-full px-1 text-sm text-border_color ${
              isActive &&
              'border-b-2 border-solid border-b-light_color font-bold text-light_color'
            }`}
          >
            {title}
          </span>
        )}
      </NavLink>
    )
  }

  return (
    <>
      <div className="flex h-12 items-center justify-between bg-theme_color px-3">
        <span className="text-xl leading-10 text-light_color">
          <FaBars className="text-xl" />
        </span>
        <span className="text-xl leading-10 text-light_color">Cloud Music</span>
        <span className="text-xl leading-10 text-light_color">
          <FaSearch className="text-xl" />
        </span>
      </div>
      <div className="flex h-10 items-center justify-around bg-theme_color">
        {renderLink('推荐', '/recommend')}
        {renderLink('歌手', '/singer')}
        {renderLink('排行榜', '/rank')}
      </div>
      <Outlet />
    </>
  )
}

export default memo(Home)
