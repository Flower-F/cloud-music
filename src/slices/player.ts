import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EPlayingMode } from '@/api'
import { ISong } from '@/components/SongList'

const namespace = 'player'

interface IPlayerState {
  /** 是否全屏播放 */
  fullscreen: boolean
  /** 是否正在播放 */
  isPlaying: boolean
  /** 播放列表 */
  playingList: ISong[]
  /** 顺序播放列表 因为存在随机模式所以需要维护播放顺序 */
  sequencePlayingList: ISong[]
  /** 当前歌曲的索引 */
  currentIndex: number
  /** 是否展示播放列表 */
  showPlayingList: boolean
  /** 播放模式 */
  playingMode: EPlayingMode
  /** 上一首歌 */
  prevSong: ISong | null
}

const initialState: IPlayerState = {
  fullscreen: false,
  isPlaying: false,
  playingList: [],
  sequencePlayingList: [],
  currentIndex: -1,
  showPlayingList: false,
  playingMode: EPlayingMode.SEQUENCE_MODE,
  prevSong: null
}

export const playerSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setFullscreen: (state: IPlayerState, action: PayloadAction<boolean>) => {
      state.fullscreen = action.payload
    },
    setIsPlaying: (state: IPlayerState, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setPlayingList: (state: IPlayerState, action: PayloadAction<ISong[]>) => {
      state.playingList = action.payload
    },
    setSequencePlayingList: (state: IPlayerState, action: PayloadAction<ISong[]>) => {
      state.sequencePlayingList = action.payload
    },
    setCurrentIndex: (state: IPlayerState, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
    setShowPlayingList: (state: IPlayerState, action: PayloadAction<boolean>) => {
      state.showPlayingList = action.payload
    },
    setPlayingMode: (state: IPlayerState, action: PayloadAction<EPlayingMode>) => {
      state.playingMode = action.payload
    },
    setPrevSong: (state: IPlayerState, action: PayloadAction<ISong>) => {
      state.prevSong = action.payload
    }
  }
})
