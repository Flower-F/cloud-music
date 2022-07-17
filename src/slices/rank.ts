import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getRankListApi } from '@/api'
import { IRank } from '@/components/RankList'

const namespace = 'rank'

export const getRankList = createAsyncThunk(
  `${namespace}/getRankList`,
  async (_, { dispatch }) => {
    const { setRankList, setEnterLoading } = rankSlice.actions

    try {
      dispatch(setEnterLoading(true))
      const res = await getRankListApi()
      dispatch(setEnterLoading(false))
      dispatch(setRankList(res.list))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

interface IRankState {
  rankList: IRank[]
  enterLoading: boolean
}

const initialState: IRankState = {
  rankList: [],
  enterLoading: true
}

export const rankSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setRankList: (state: IRankState, action: PayloadAction<IRank[]>) => {
      state.rankList = action.payload
    },
    setEnterLoading: (state: IRankState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
