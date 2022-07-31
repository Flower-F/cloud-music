import { shuffle } from 'lodash-es'
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react'

import { EPlayingMode } from '@/api'
import MiniPlayer, { ICommonPlayerProps } from '@/components/MiniPlayer'
import NormalPlayer from '@/components/NormalPlayer'
import { playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Toast from '@/ui/Toast'
import { getSongUrl } from '@/utils'

const PlayerPage = () => {
  const {
    fullscreen,
    isPlaying,
    currentIndex,
    playingMode,
    sequencePlayList,
    playingList,
    currentTime,
    duration,
    prevSong
  } = useAppSelector((store) => store.player)
  const {
    setFullscreen,
    setIsPlaying,
    setCurrentIndex,
    setPlayingList,
    setPlayingMode,
    setPrevSong,
    setCurrentTime,
    setDuration
  } = playerSlice.actions

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const dispatch = useAppDispatch()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    dispatch(setCurrentIndex(-1))
  }, [])

  useEffect(() => {
    if (
      !audioRef.current ||
      playingList.length === 0 ||
      !playingList[currentIndex] ||
      (prevSong && playingList[currentIndex].id === prevSong.id)
    ) {
      console.log('playingList', playingList)
      console.log('currentIndex', currentIndex)
      console.log('playingList[currentIndex]', playingList[currentIndex])
      return
    }
    audioRef.current.src = getSongUrl(playingList[currentIndex].id)
    dispatch(setPrevSong(playingList[currentIndex]))
    dispatch(setIsPlaying(true))
    dispatch(setCurrentTime(0))
    dispatch(setDuration(playingList[currentIndex].dt / 1000))
  }, [playingList, currentIndex])

  useEffect(() => {
    if (!audioRef.current || !playingList[currentIndex]) {
      return
    }
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying, playingList, currentIndex])

  const toggleToPause = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      dispatch(setIsPlaying(false))
    }
  }, [isPlaying])

  const toggleToPlay = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    if (!isPlaying) {
      dispatch(setIsPlaying(true))
    }
  }, [isPlaying])

  const handleTimeUpdate = useCallback((e: ChangeEvent<HTMLAudioElement>) => {
    dispatch(setCurrentTime(e.target.currentTime))
  }, [])

  const percentChangeCallback = useCallback(
    (currentPercent: number) => {
      if (!audioRef.current) {
        return
      }
      const newTime = currentPercent * duration
      dispatch(setCurrentTime(newTime))
      audioRef.current.currentTime = newTime
    },
    [duration]
  )

  const handleLoop = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    audioRef.current.currentTime = 0
  }, [])

  const handlePrev = useCallback(() => {
    if (playingList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) {
      index = playingList.length - 1
    }
    if (!isPlaying) {
      dispatch(setIsPlaying(true))
    }
    dispatch(setCurrentIndex(index))
  }, [playingList.length, currentIndex])

  const handleNext = useCallback(() => {
    if (playingList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index >= playingList.length) {
      index = 0
    }
    if (!isPlaying) {
      dispatch(setIsPlaying(true))
    }
    dispatch(setCurrentIndex(index))
  }, [playingList.length, currentIndex])

  const handleEnd = useCallback(() => {
    if (playingMode === EPlayingMode.LOOP_MODE) {
      handleLoop()
    } else {
      handleNext()
    }
  }, [playingMode])

  const changeMode = useCallback(() => {
    if (!playingList[currentIndex]) {
      return
    }

    const newMode: EPlayingMode = (playingMode + 1) % 3
    if (newMode === EPlayingMode.SEQUENCE_MODE) {
      dispatch(setPlayingList(sequencePlayList))
      const index = sequencePlayList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      Toast.show('顺序播放')
    } else if (newMode === EPlayingMode.LOOP_MODE) {
      dispatch(setPlayingList(sequencePlayList))
      Toast.show('循环播放')
    } else if (newMode === EPlayingMode.RANDOM_MODE) {
      const newList = shuffle(sequencePlayList)
      dispatch(setPlayingList(newList))
      const index = newList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      Toast.show('随机播放')
    }

    dispatch(setPlayingMode(newMode))
  }, [playingMode, playingList, currentIndex])

  const commonProps: ICommonPlayerProps = useMemo(() => {
    return {
      song: playingList[currentIndex],
      percent,
      isPlaying,
      setFullscreen,
      dispatch,
      play: toggleToPlay,
      pause: toggleToPause
    }
  }, [playingList, percent, isPlaying, currentIndex])

  return (
    <>
      {playingList[currentIndex] && <MiniPlayer {...commonProps} />}
      {playingList[currentIndex] && (
        <NormalPlayer
          {...commonProps}
          fullscreen={fullscreen}
          duration={duration}
          currentTime={currentTime}
          percentChangeCallback={percentChangeCallback}
          handlePrev={handlePrev}
          handleNext={handleNext}
          changeMode={changeMode}
          playingMode={playingMode}
        />
      )}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnd}></audio>
    </>
  )
}

export default memo(PlayerPage)
