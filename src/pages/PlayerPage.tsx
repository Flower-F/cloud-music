import { shuffle } from 'lodash-es'
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { EPlayingMode, getLyricApi } from '@/api'
import MiniPlayer, { ICommonPlayerProps } from '@/components/MiniPlayer'
import NormalPlayer from '@/components/NormalPlayer'
import PlayingList from '@/components/PlayingList'
import { playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Toast from '@/ui/Toast'
import { getSongUrl, LyricParser } from '@/utils'

const PlayerPage = () => {
  const {
    fullscreen,
    isPlaying,
    currentIndex,
    playingMode,
    sequencePlayingList,
    playingList,
    prevSong,
    showPlayingList
  } = useAppSelector((store) => store.player)

  const {
    setFullscreen,
    setIsPlaying,
    setCurrentIndex,
    setPlayingList,
    setSequencePlayingList,
    setPlayingMode,
    setPrevSong,
    setShowPlayingList
  } = playerSlice.actions

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const dispatch = useAppDispatch()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const songReady = useRef(true)

  const currentLyric = useRef('')
  const currentLyricParser = useRef<LyricParser | null>(null)
  const currentLine = useRef(0)

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
        if (currentLyricParser.current) {
          currentLyricParser.current.togglePlayingState(currentTime * 1000)
        }
      }
    } else {
      audioRef.current.pause()
      if (currentLyricParser.current) {
        currentLyricParser.current.togglePlayingState(currentTime * 1000)
      }
    }
  }, [isPlaying, currentIndex])

  const toggleToPause = useCallback(() => {
    if (!audioRef.current || !currentLyricParser.current) {
      return
    }
    if (isPlaying) {
      dispatch(setIsPlaying(false))
    }
  }, [isPlaying])

  const toggleToPlay = useCallback(() => {
    if (!audioRef.current || !currentLyricParser.current) {
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

      if (currentLyricParser.current) {
        currentLyricParser.current.seek(newTime * 1000)
      }
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

    if (currentLyricParser.current) {
      currentLyricParser.current.seek(0)
    }
  }, [playingMode, playingList])

  useEffect(() => {
    if (!playingList[currentIndex]) {
      return
    }

    if (playingMode === EPlayingMode.RANDOM_MODE) {
      const shuffleList = shuffle(sequencePlayingList)
      dispatch(setPlayingList(shuffleList))
      const index = shuffleList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      Toast.show('随机播放')
    } else {
      dispatch(setPlayingList(sequencePlayingList))
      const index = sequencePlayingList.findIndex((item) => item.id === playingList[currentIndex].id)
      dispatch(setCurrentIndex(index))
      if (playingMode === EPlayingMode.SEQUENCE_MODE) {
        Toast.show('顺序播放')
      } else if (playingMode === EPlayingMode.LOOP_MODE) {
        Toast.show('循环播放')
      }
    }
  }, [playingMode])

  const changeMode = useCallback(() => {
    const newMode: EPlayingMode = (playingMode + 1) % 3
    dispatch(setPlayingMode(newMode))
  }, [playingMode])

  const handleError = useCallback(() => {
    songReady.current = true
    const newSequencePlayingList = sequencePlayingList.filter((item) => item.id !== playingList[currentIndex].id)
    const newPlayingList = playingList.filter((item) => item.id !== playingList[currentIndex].id)
    dispatch(setPlayingList(newPlayingList))
    dispatch(setSequencePlayingList(newSequencePlayingList))
    if (currentIndex >= 0) {
      dispatch(setCurrentIndex(currentIndex - 1))
    }
    Toast.show('暂无音源')
  }, [playingList, sequencePlayingList, currentIndex])

  const lyricCallback = useCallback(({ line, text }: { line: number; text: string }) => {
    currentLine.current = line
    currentLyric.current = text
  }, [])

  const getLyric = useCallback((id: number) => {
    let lyric = ''
    if (currentLyricParser.current) {
      currentLyricParser.current.stop()
    }
    getLyricApi(id)
      .then((data) => {
        lyric = data.lrc.lyric
        if (!lyric) {
          currentLyricParser.current = null
          return
        }
        currentLyricParser.current = new LyricParser(lyric, lyricCallback)
        currentLyricParser.current.play()
        currentLine.current = 0
        currentLyricParser.current.seek(0)
      })
      .catch(() => {
        songReady.current = true
        audioRef.current?.play()
      })
  }, [])

  useEffect(() => {
    if (currentIndex < 0) {
      return
    }

    getLyric(playingList[currentIndex].id)
    setCurrentTime(0)
    setDuration((playingList[currentIndex].dt / 1000) | 0)
  }, [currentIndex, playingList])

  const commonProps: ICommonPlayerProps = useMemo(() => {
    return {
      song: playingList[currentIndex],
      percent,
      isPlaying,
      setFullscreen,
      setShowPlayingList,
      dispatch,
      play: toggleToPlay,
      pause: toggleToPause
    }
  }, [percent, isPlaying, currentIndex, playingList])

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
          currentLyric={currentLyric.current}
          currentLyricParser={currentLyricParser.current}
          currentLine={currentLine.current}
        />
      )}
      <PlayingList
        playingList={playingList}
        setShowPlayingList={setShowPlayingList}
        setCurrentIndex={setCurrentIndex}
        showPlayingList={showPlayingList}
        dispatch={dispatch}
        changeMode={changeMode}
        playingMode={playingMode}
        currentIndex={currentIndex}
        prevSong={prevSong}
        setIsPlaying={setIsPlaying}
        setPlayingList={setPlayingList}
        setSequencePlayingList={setSequencePlayingList}
        sequencePlayingList={sequencePlayingList}
      />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnd} onError={handleError}></audio>
    </>
  )
}

export default memo(PlayerPage)
