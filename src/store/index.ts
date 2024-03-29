import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { albumSlice, artistSlice, playerSlice, rankSlice, recommendSlice, searchSlice, singersSlice } from '@/slices'

const store = configureStore({
  reducer: {
    recommend: recommendSlice.reducer,
    singers: singersSlice.reducer,
    rank: rankSlice.reducer,
    album: albumSlice.reducer,
    artist: artistSlice.reducer,
    player: playerSlice.reducer,
    search: searchSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
