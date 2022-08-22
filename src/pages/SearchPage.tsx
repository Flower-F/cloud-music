import { memo, useCallback, useEffect, useState } from 'react'
import { RiNeteaseCloudMusicFill } from 'react-icons/ri'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import defaultMusicImage from '@/assets/images/default-music.png'
import { getHotKeyWords, getSuggestList, playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import EnterLoading from '@/ui/EnterLoading'
import MarqueeHeader from '@/ui/MarqueeHeader'
import SearchBox from '@/ui/SearchBox'
import { getName } from '@/utils'

const SearchPage = () => {
  const [showStatus, setShowStatus] = useState(true)
  const [query, setQuery] = useState('')

  const { hotList, suggestList, resultList, enterLoading } = useAppSelector((store) => store.search)
  const { playingList, currentIndex, prevSong, sequencePlayingList } = useAppSelector((store) => store.player)
  const { setCurrentIndex, setPlayingList, setSequencePlayingList } = playerSlice.actions

  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const handleQueryRequest = useCallback((q: string) => {
    if (!q) {
      return
    }
    getSuggestList(q)
  }, [])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!hotList.length) {
      dispatch(getHotKeyWords())
    }
  }, [])

  const renderHotList = () => {
    return (
      <ul className="mx-auto mt-2 flex w-[90%] flex-wrap">
        {hotList.map((item) => {
          return (
            <li
              className=" m-1 flex max-w-[120px] items-center rounded-sm border-2 border-solid border-theme_color px-2 py-0.5"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <div className="text-nowrap">{item.first}</div>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderAlbum = () => {
    const albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <div>
        <h1 className="title">相关歌单</h1>
        {albums.map((item, index) => {
          return (
            <div key={`${item.accountId}${index}`} onClick={() => navigate(`/album/${item.id}`)}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={<img src={defaultMusicImage} alt="音乐歌单" className="h-full w-full rounded" />}
                >
                  <img src={`${item.coverImgUrl}?param=300x300`} alt="音乐歌单" className="h-full w-full rounded" />
                </LazyLoad>
              </div>
              <span className="name">歌单: {item.name}</span>
            </div>
          )
        })}
      </div>
    )
  }

  const renderSingers = () => {
    const singers = suggestList.artists
    if (!singers || !singers.length) return
    return (
      <div>
        <h1 className="title">相关歌手</h1>
        {singers.map((item, index) => {
          return (
            <div key={`${item.accountId}${index}`} onClick={() => navigate(`/singers/${item.id}`)}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={defaultMusicImage} alt="singer" />}>
                  <img src={item.picUrl} width="100%" height="100%" alt="music" />
                </LazyLoad>
              </div>
              <span className="name">歌手: {item.name}</span>
            </div>
          )
        })}
      </div>
    )
  }

  const selectItem = useCallback(
    (index: number) => {
      const newSong = resultList[index]
      if (prevSong && prevSong.id === newSong.id) {
        return
      }
      const existedIndex = playingList.findIndex((item) => item.id === newSong?.id)
      if (existedIndex !== -1) {
        dispatch(setCurrentIndex(existedIndex))
        return
      }
      dispatch(setPlayingList([...playingList, newSong]))
      dispatch(setSequencePlayingList([...sequencePlayingList, newSong]))
      dispatch(setCurrentIndex(currentIndex + 1))
    },
    [playingList, sequencePlayingList, prevSong, currentIndex]
  )

  const renderSongs = () => {
    return (
      <div className="pl-5">
        {resultList.map((item) => {
          return (
            <li key={item.id} onClick={() => selectItem(item.id)}>
              <div className="info">
                <div>{item.name}</div>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          )
        })}
      </div>
    )
  }

  return (
    <CSSTransition in={showStatus} timeout={300} classNames="page-change" appear={true} unmountOnExit onExited={goBack}>
      <div
        className={`fixed top-0 bottom-0 z-[150] w-full origin-bottom-right bg-background_color ${
          playingList.length > 0 && 'bottom-[60px]'
        }`}
      >
        <MarqueeHeader title="搜索" onBack={handleBack} isMarquee={false} />
        <SearchBox
          newQuery={query}
          handleQueryRequest={handleQueryRequest}
          className="mx-auto mt-12 flex w-[90%] items-center rounded border border-solid border-b-border_color bg-theme_color py-2 px-3"
        />
        {renderHotList()}
        <div className="flex h-40 items-center justify-center">
          <RiNeteaseCloudMusicFill className="text-6xl text-theme_color" />
        </div>
        <div className={`visible ${query.length === 0 && 'invisible'}`}>
          <div onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </div>
        </div>
        {enterLoading && <EnterLoading />}
      </div>
    </CSSTransition>
  )
}

export default memo(SearchPage)
