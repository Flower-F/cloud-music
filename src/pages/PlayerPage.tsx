import { shuffle } from 'lodash-es'
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { EPlayingMode } from '@/api'
import MiniPlayer, { ICommonPlayerProps } from '@/components/MiniPlayer'
import NormalPlayer from '@/components/NormalPlayer'
import { ISong } from '@/components/SongList'
import { playerSlice } from '@/slices'
import { useAppDispatch, useAppSelector } from '@/store'
import Toast from '@/ui/Toast'
import { getSongUrl } from '@/utils'

const PlayerPage = () => {
  const currentSong: ISong = {
    id: 1,
    al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg', name: '木偶人' },
    name: '木偶人',
    ar: [{ name: '薛之谦' }],
    dt: 234947
  }

  const playList: ISong[] = [
    {
      al: {
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg'
      },
      name: '拾梦纪',
      dt: 234947,
      ar: [
        {
          name: '妖扬'
        },
        {
          name: '金天'
        }
      ],
      id: 1416767593
    }
  ]

  const { fullscreen, isPlaying, currentIndex, playingMode, sequencePlayList } = useAppSelector((store) => store.player)
  const { setFullscreen, setIsPlaying, setCurrentIndex, setCurrentSong, setPlayingList, setPlayingMode } =
    playerSlice.actions

  const dispatch = useAppDispatch()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [prevSong, setPrevSong] = useState<ISong | null>()

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    if (
      !audioRef.current ||
      playList.length === 0 ||
      !playList[currentIndex] ||
      (prevSong && playList[currentIndex].id === prevSong.id)
    ) {
      return
    }
    const newSong = playList[currentIndex]
    dispatch(setCurrentSong(newSong))
    setPrevSong(newSong)
    audioRef.current.src = getSongUrl(newSong.id)
    dispatch(setIsPlaying(false))
    setCurrentTime(0)
    setDuration(newSong.dt / 1000)
  }, [playList, currentIndex])

  const toggleToPause = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
      dispatch(setIsPlaying(false))
    }
  }, [isPlaying])

  const toggleToPlay = useCallback(() => {
    if (!audioRef.current) {
      return
    }
    if (!isPlaying) {
      audioRef.current.play()
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
  }, [])

  const handlePrev = useCallback(() => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) {
      index = playList.length - 1
    }
    if (!isPlaying) {
      setIsPlaying(true)
    }
    setCurrentIndex(index)
  }, [])

  const handleNext = useCallback(() => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index >= playList.length) {
      index = 0
    }
    if (!isPlaying) {
      setIsPlaying(true)
    }
    setCurrentIndex(index)
  }, [])

  const handleEnd = useCallback(() => {
    if (playingMode === EPlayingMode.LOOP_MODE) {
      handleLoop()
    } else {
      handleNext()
    }
  }, [playingMode])

  const changeMode = useCallback(() => {
    const newMode: EPlayingMode = (playingMode + 1) % 3
    console.log('newMode', newMode)
    if (newMode === EPlayingMode.SEQUENCE_MODE) {
      setPlayingList(sequencePlayList)
      const index = sequencePlayList.findIndex((item) => item.id === currentSong.id)
      setCurrentIndex(index)
      Toast.show('顺序播放')
    } else if (newMode === EPlayingMode.LOOP_MODE) {
      setPlayingList(sequencePlayList)
      Toast.show('循环播放')
    } else if (newMode === EPlayingMode.RANDOM_MODE) {
      const newList = shuffle(sequencePlayList)
      setPlayingList(newList)
      const index = newList.findIndex((item) => item.id === currentSong.id)
      setCurrentIndex(index)
      Toast.show('随机播放')
    }

    dispatch(setPlayingMode(newMode))
  }, [playingMode, sequencePlayList, currentSong])

  const commonProps: ICommonPlayerProps = useMemo(() => {
    return {
      song: currentSong,
      percent,
      isPlaying,
      setFullscreen,
      dispatch,
      play: toggleToPlay,
      pause: toggleToPause
    }
  }, [currentSong, percent, isPlaying])

  return (
    <div>
      {currentSong && <MiniPlayer {...commonProps} />}
      {currentSong && (
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
    </div>
  )
}

export default memo(PlayerPage)
