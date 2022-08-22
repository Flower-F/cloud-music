import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getHotKeywordsApi, getResultSongListApi, getSuggestListApi } from '@/api'
import { ISinger } from '@/components/SingerList'
import { IAlbum } from '@/components/SongList'

const namespace = 'search'

export const getHotKeyWords = createAsyncThunk(`${namespace}/getHotKeyWords`, async (_, { dispatch }) => {
  const { setHotList, setEnterLoading } = searchSlice.actions

  try {
    dispatch(setEnterLoading(true))
    const res = await getHotKeywordsApi()
    dispatch(setHotList(res.result.hots))
    dispatch(setEnterLoading(false))
  } catch (error) {
    console.log('error:', error)
    dispatch(setEnterLoading(false))
  }
})

export const getSuggestList = createAsyncThunk(`${namespace}/getSuggestList`, async (query: string, { dispatch }) => {
  const { setSuggestList, setResultList, setEnterLoading } = searchSlice.actions

  dispatch(setEnterLoading(true))
  Promise.all([getSuggestListApi(query), getResultSongListApi(query)])
    .then((res) => {
      const suggestList = res[0].result
      const resultList = res[1].songs
      dispatch(setSuggestList(suggestList))
      dispatch(setResultList(resultList))
    })
    .catch((error) => {
      console.log('error:', error)
    })
    .finally(() => {
      dispatch(setEnterLoading(false))
    })
})

interface ISearchState {
  hotList: any[]
  suggestList: {
    playlists: IAlbum[]
    artists: ISinger[]
  }
  resultList: any[]
  enterLoading: boolean
}

const initialState: ISearchState = {
  hotList: [],
  suggestList: {
    playlists: [],
    artists: []
  },
  resultList: [],
  enterLoading: false
}

export const searchSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setHotList: (state: ISearchState, action: PayloadAction<any[]>) => {
      state.hotList = action.payload
    },
    setSuggestList: (state: ISearchState, action: PayloadAction<{ playlists: any[]; artists: any[] }>) => {
      state.suggestList = action.payload
    },
    setResultList: (state: ISearchState, action: PayloadAction<any[]>) => {
      state.resultList = action.payload
    },
    setEnterLoading: (state: ISearchState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
