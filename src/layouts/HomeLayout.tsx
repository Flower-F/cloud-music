import { memo, useCallback, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import PlayerPage from '@/pages/PlayerPage'

const HomeLayout = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/recommend')
    }
  }, [pathname])

  const renderLink = useCallback((title: string, link: string) => {
    return (
      <NavLink to={link} className="render-home-link">
        {({ isActive }) => (
          <span
            className={`h-full px-1 text-sm text-border_color ${
              isActive && 'border-b-2 border-solid border-b-light_color font-bold text-light_color'
            }`}
          >
            {title}
          </span>
        )}
      </NavLink>
    )
  }, [])

  const enterSearch = useCallback(() => {
    navigate('/search')
  }, [])

  return (
    <>
      <div className="flex h-12 items-center justify-between bg-theme_color px-3">
        <div className="text-xl" />
        <div className="text-xl text-light_color">Flower Music</div>
        <FaSearch className="text-xl text-light_color" onClick={enterSearch} />
      </div>
      <div className="flex h-11 items-center justify-around bg-theme_color">
        {renderLink('推荐', '/recommend')}
        {renderLink('歌手', '/singer')}
        {renderLink('排行榜', '/rank')}
      </div>
      <Outlet />
      <PlayerPage />
    </>
  )
}

export default memo(HomeLayout)
