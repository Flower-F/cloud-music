import { shuffle } from 'lodash-es'
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { EPlayingMode } from '@/api'
import MiniPlayer, { ICommonPlayerProps } from '@/components/MiniPlayer'
import NormalPlayer from '@/components/NormalPlayer'
import { playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Toast from '@/ui/Toast'
import { getSongUrl } from '@/utils'

const PlayerPage = () => {
  const { fullscreen, isPlaying, currentIndex, playingMode, sequencePlayingList, playingList, prevSong } =
    useAppSelector((store) => store.player)

  const {
    setFullscreen,
    setIsPlaying,
    setCurrentIndex,
    setPlayingList,
    setSequencePlayingList,
    setPlayingMode,
    setPrevSong
  } = playerSlice.actions

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const dispatch = useAppDispatch()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const songReady = useRef(true)

  useEffect(() => {
    dispatch(setCurrentIndex(-1))
  }, [])

  useEffect(() => {
    if (
      !audioRef.current ||
      !songReady.current ||
      currentIndex === -1 ||
      playingList.length === 0 ||
      !playingList[currentIndex] ||
      (prevSong && playingList[currentIndex].id === prevSong.id)
    ) {
      return
    }
    audioRef.current.src = getSongUrl(playingList[currentIndex].id)
    dispatch(setPrevSong(playingList[currentIndex]))
    setTimeout(() => {
      audioRef.current?.play().then(() => {
        songReady.current = true
      })
    }, 0)
    dispatch(setIsPlaying(true))
    setCurrentTime(0)
    setDuration(playingList[currentIndex].dt / 1000)
  }, [currentIndex, playingList, prevSong])

  useEffect(() => {
    if (!audioRef.current || !playingList[currentIndex]) {
      return
    }
    if (isPlaying) {
      if (audioRef.current.networkState !== 3) {
        audioRef.current.play()
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentIndex])

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
    setCurrentTime(e.target.currentTime)
  }, [])

  const percentChangeCallback = useCallback(
    (currentPercent: number) => {
      if (!audioRef.current) {
        return
      }
      const newTime = currentPercent * duration
      setCurrentTime(newTime)
      audioRef.current.currentTime = newTime
    },
    [duration]
  )

  const handleLoop = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    audioRef.current.currentTime = 0
    setTimeout(() => {
      audioRef.current?.play().then(() => {
        songReady.current = true
      })
    }, 0)
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
    dispatch(setIsPlaying(true))
    dispatch(setCurrentIndex(index))
  }, [currentIndex, isPlaying, playingList])

  const handleNext = useCallback(() => {
    if (playingList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index >= playingList.length) {
      index = 0
    }
    dispatch(setIsPlaying(true))
    dispatch(setCurrentIndex(index))
  }, [currentIndex, isPlaying, playingList])

  const handleEnd = useCallback(() => {
    if (playingMode === EPlayingMode.LOOP_MODE) {
      handleLoop()
    } else {
      handleNext()
    }
  }, [playingMode, playingList])

  const changeMode = useCallback(() => {
    if (!playingList[currentIndex]) {
      return
    }

    const newMode: EPlayingMode = (playingMode + 1) % 3
    if (newMode === EPlayingMode.SEQUENCE_MODE) {
      dispatch(setPlayingList(sequencePlayingList))
      const index = sequencePlayingList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      Toast.show('顺序播放')
    } else if (newMode === EPlayingMode.LOOP_MODE) {
      dispatch(setPlayingList(sequencePlayingList))
      Toast.show('循环播放')
    } else if (newMode === EPlayingMode.RANDOM_MODE) {
      const newList = shuffle(sequencePlayingList)
      dispatch(setPlayingList(newList))
      const index = newList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      Toast.show('随机播放')
    }

    dispatch(setPlayingMode(newMode))
  }, [playingMode, currentIndex])

  const handleError = useCallback(() => {
    songReady.current = true
    const newSequencePlayingList = sequencePlayingList.filter((item) => item.id !== playingList[currentIndex].id)
    const newPlayingList = playingList.filter((item) => item.id !== playingList[currentIndex].id)
    console.log('newSequencePlayingList:', newSequencePlayingList)
    console.log('newPlayingList:', newPlayingList)
    dispatch(setPlayingList(newPlayingList))
    dispatch(setSequencePlayingList(newSequencePlayingList))
    if (currentIndex >= 0) {
      dispatch(setCurrentIndex(currentIndex - 1))
    }
    Toast.show('暂无音源')
  }, [playingList, sequencePlayingList, currentIndex])

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
  }, [percent, isPlaying, currentIndex])

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
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnd} onError={handleError}></audio>
    </>
  )
}

export default memo(PlayerPage)
