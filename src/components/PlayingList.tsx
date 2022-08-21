import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRandom } from 'react-icons/fa'
import { GrClearOption } from 'react-icons/gr'
import { TbRepeat, TbRepeatOnce } from 'react-icons/tb'
import { CSSTransition } from 'react-transition-group'

import { EPlayingMode } from '@/api'
import { useAppDispatch } from '@/store'
import Scroll from '@/ui/Scroll'
import { getName } from '@/utils'

import { ISong } from './SongList'

interface IProps {
  setShowPlayingList: ActionCreatorWithPayload<boolean, string>
  setCurrentIndex: ActionCreatorWithPayload<number, string>
  setIsPlaying: ActionCreatorWithPayload<boolean, string>
  setPlayingList: ActionCreatorWithPayload<ISong[], string>
  setSequencePlayingList: ActionCreatorWithPayload<ISong[], string>
  sequencePlayingList: ISong[]
  showPlayingList: boolean
  playingList: ISong[]
  dispatch: ReturnType<typeof useAppDispatch>
  changeMode: () => void
  playingMode: EPlayingMode
  currentIndex: number
  prevSong: ISong | null
}

const PlayingList: FC<IProps> = ({
  setShowPlayingList,
  setCurrentIndex,
  dispatch,
  changeMode,
  playingMode,
  showPlayingList,
  playingList,
  currentIndex,
  prevSong,
  setIsPlaying,
  setPlayingList,
  setSequencePlayingList,
  sequencePlayingList
}) => {
  const listWrapperRef = useRef<HTMLDivElement | null>(null)

  const setShowingPlayingListFalse = useCallback(() => {
    dispatch(setShowPlayingList(false))
  }, [])

  const handleOnEnter = useCallback(() => {
    if (!listWrapperRef.current) {
      return
    }
    dispatch(setShowPlayingList(true))
    listWrapperRef.current.style.transform = 'translate3d(0, 100%, 0)'
  }, [])

  const handleOnEntering = useCallback(() => {
    if (!listWrapperRef.current) {
      return
    }
    listWrapperRef.current.style.transition = 'all 0.3s'
    listWrapperRef.current.style.transform = 'translate3d(0, 0, 0)'
  }, [])

  const playingModeIcon = useMemo(() => {
    if (playingMode === EPlayingMode.RANDOM_MODE) {
      return (
        <div className="flex items-center" onClick={changeMode}>
          <FaRandom className="mr-1 pl-1 text-2xl" />
          <div>随机播放</div>
        </div>
      )
    } else if (playingMode === EPlayingMode.LOOP_MODE) {
      return (
        <div className="flex items-center" onClick={changeMode}>
          <TbRepeatOnce className="mr-1 text-2xl" />
          <div>循环播放</div>
        </div>
      )
    } else {
      return (
        <div className="flex items-center" onClick={changeMode}>
          <TbRepeat className="mr-1 text-2xl" />
          <div>顺序播放</div>
        </div>
      )
    }
  }, [playingMode])

  const selectItem = useCallback(
    (index: number) => {
      const newSong = playingList[index]
      if (prevSong && prevSong.id === newSong.id) {
        return
      }
      dispatch(setCurrentIndex(index))
      dispatch(setIsPlaying(true))
    },
    [prevSong, currentIndex]
  )

  const deleteItem = useCallback(
    (index: number) => {
      const newSequencePlayingList = sequencePlayingList.filter((item) => item.id !== playingList[index].id)
      const newPlayingList = playingList.filter((item) => item.id !== playingList[index].id)
      dispatch(setPlayingList(newPlayingList))
      dispatch(setSequencePlayingList(newSequencePlayingList))
      if (currentIndex >= index && currentIndex >= 0) {
        dispatch(setCurrentIndex(currentIndex - 1))
      }
    },
    [prevSong, currentIndex, playingList, sequencePlayingList]
  )

  return (
    <CSSTransition
      timeout={300}
      classNames="playing-list"
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      in={showPlayingList}
    >
      <div
        className={`fixed left-0 right-0 top-0 bottom-0 z-[2000] bg-background_color_shadow ${
          !showPlayingList && 'hidden'
        }`}
        onClick={setShowingPlayingListFalse}
      >
        <div
          className="absolute left-0 bottom-0 w-full rounded-t-lg bg-highlight_background_color"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between border-b-2 border-solid border-b-gray-400 pb-1.5 pl-3 pr-4 pt-2">
            {playingModeIcon}
            <GrClearOption className="text-xl" />
          </div>
          <div className="h-[60vh] overflow-hidden">
            <Scroll bounceTop={false}>
              <ul>
                {playingList.map((item, index) => (
                  <li
                    key={`${item.id}${index}`}
                    className={`flex items-center justify-between border-b border-solid border-b-border_color px-4 py-2 ${
                      currentIndex === index && 'font-bold text-theme_color'
                    }`}
                    onClick={() => selectItem(index)}
                  >
                    <div className="text-nowrap max-w-[50vw]">
                      {item.name} - {getName(item.ar)}
                    </div>
                    <AiOutlineClose className="text-base" onClick={() => deleteItem(index)} />
                  </li>
                ))}
              </ul>
            </Scroll>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(PlayingList)
