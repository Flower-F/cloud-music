import { memo, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom'
import { FaBars, FaSearch } from 'react-icons/fa'

const Home = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/recommend')
    }
  }, [pathname])

  return (
    <>
      <div
        className="flex items-center justify-between
        bg-theme_color px-[12px] py-[10px]"
      >
        <span className="text-xl leading-[40px] text-light_color">
          <FaBars className="text-xl" />
        </span>
        <span className="text-xl leading-[40px] text-light_color">
          Cloud Music
        </span>
        <span className="text-xl leading-[40px] text-light_color">
          <FaSearch className="text-xl" />
        </span>
      </div>
      <div className="flex h-[44px] items-center justify-around bg-theme_color">
        <NavLink to="/recommend">
          {({ isActive }) => (
            <span
              className={`px-[2px] text-sm text-border_color ${
                isActive &&
                'border-b-2 border-solid border-b-light_color px-[3px] font-bold text-light_color'
              }`}
            >
              推荐
            </span>
          )}
        </NavLink>
        <NavLink to="/singers">
          {({ isActive }) => (
            <span
              className={`px-[2px] text-sm text-border_color ${
                isActive &&
                'border-b-2 border-solid border-b-light_color px-[3px] font-bold text-light_color'
              }`}
            >
              歌手
            </span>
          )}
        </NavLink>
        <NavLink to="/rank">
          {({ isActive }) => (
            <span
              className={`px-[2px] text-sm text-border_color ${
                isActive &&
                'border-b-2 border-solid border-b-light_color px-[3px] font-bold text-light_color'
              }`}
            >
              排行榜
            </span>
          )}
        </NavLink>
      </div>
      <Outlet />
    </>
  )
}

export default memo(Home)
