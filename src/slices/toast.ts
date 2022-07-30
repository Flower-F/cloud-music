import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const namespace = 'toast'

interface IToastState {
  toastShown: false
}

const initialState: IToastState = {}

export const albumSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setAlbum: (state: IAlbumState, action: PayloadAction<IAlbum | null>) => {
      state.album = action.payload
    },
    setEnterLoading: (state: IAlbumState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
