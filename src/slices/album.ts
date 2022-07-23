import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getAlbumApi } from '@/api'
import { IAlbum } from '@/components/SongList'

const namespace = 'album'

export const getAlbum = createAsyncThunk(
  `${namespace}/getAlbum`,
  async (id: number, { dispatch }) => {
    const { setAlbum, setEnterLoading } = albumSlice.actions

    try {
      dispatch(setEnterLoading(true))
      const res = await getAlbumApi(id)
      dispatch(setEnterLoading(false))
      dispatch(setAlbum(res.playlist))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

interface IAlbumState {
  album: IAlbum | null
  enterLoading: boolean
}

const initialState: IAlbumState = {
  album: null,
  enterLoading: true
}

export const albumSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setAlbum: (state: IAlbumState, action: PayloadAction<IAlbum>) => {
      state.album = action.payload
    },
    setEnterLoading: (state: IAlbumState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
