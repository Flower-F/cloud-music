import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getArtistApi } from '@/api'
import { IArtist } from '@/components/SongList'

const namespace = 'artist'

export const getArtist = createAsyncThunk(
  `${namespace}/getArtist`,
  async (id: number, { dispatch }) => {
    const { setArtist, setEnterLoading } = artistSlice.actions

    try {
      dispatch(setArtist(null))
      dispatch(setEnterLoading(true))
      const res = await getArtistApi(id)
      dispatch(setEnterLoading(false))
      dispatch(
        setArtist({
          hotSongs: res.hotSongs,
          name: res.artist.name,
          picUrl: res.artist.picUrl
        })
      )
    } catch (error) {
      console.log('error:', error)
    }
  }
)

interface IArtistState {
  artist: IArtist | null
  enterLoading: boolean
}

const initialState: IArtistState = {
  artist: null,
  enterLoading: true
}

export const artistSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setArtist: (state: IArtistState, action: PayloadAction<IArtist | null>) => {
      state.artist = action.payload
    },
    setEnterLoading: (state: IArtistState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
