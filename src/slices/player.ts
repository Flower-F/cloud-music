import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EPlayingMode } from '@/api'
import { IPlayer } from '@/components/MiniPlayer'

const namespace = 'player'

interface IPlayerState {
  /** 是否全屏播放 */
  fullscreen: boolean
  /** 是否正在播放 */
  isPlaying: boolean
  /** 播放列表 */
  playingList: IPlayer[]
  /** 顺序播放列表 因为存在随机模式所以需要维护播放顺序 */
  sequencePlayList: IPlayer[]
  /** 当前歌曲的索引 */
  currentIndex: number
  /** 是否展示播放列表 */
  showPlayingList: boolean
  /** 当前歌曲 */
  currentSong: IPlayer | null
  /** 播放模式 */
  playingMode: EPlayingMode
}

const initialState: IPlayerState = {
  fullscreen: false,
  isPlaying: false,
  playingList: [],
  sequencePlayList: [],
  currentIndex: -1,
  showPlayingList: false,
  currentSong: null,
  playingMode: EPlayingMode.SEQUENCE_MODE
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
    setPlayingList: (state: IPlayerState, action: PayloadAction<IPlayer[]>) => {
      state.playingList = action.payload
    },
    setSequencePlayingList: (state: IPlayerState, action: PayloadAction<IPlayer[]>) => {
      state.sequencePlayList = action.payload
    },
    setCurrentIndex: (state: IPlayerState, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
    setShowPlayingList: (state: IPlayerState, action: PayloadAction<boolean>) => {
      state.showPlayingList = action.payload
    },
    setCurrentSong: (state: IPlayerState, action: PayloadAction<IPlayer>) => {
      state.currentSong = action.payload
    },
    setPlayingMode: (state: IPlayerState, action: PayloadAction<EPlayingMode>) => {
      state.playingMode = action.payload
    }
  }
})
