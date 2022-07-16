import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getBannerListApi, getRecommendListApi } from '@/api'
import { IBanner } from '@/components/BannerList'

import { IRecommend } from '../components/RecommendList'

export const getBannerList = createAsyncThunk(
  'recommend/getBannerList',
  async () => await getBannerListApi()
)

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => await getRecommendListApi()
)

const initialState: {
  bannerList: IBanner[]
  recommendList: IRecommend[]
  loading: boolean
} = {
  bannerList: [],
  recommendList: [],
  loading: false
}

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerList.pending, (state) => {
        state.loading = true
      })
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.bannerList = action.payload.banners
        state.loading = false
      })
      .addCase(getBannerList.rejected, (state) => {
        state.loading = false
      })
      .addCase(getRecommendList.pending, (state) => {
        state.loading = true
      })
      .addCase(getRecommendList.fulfilled, (state, action) => {
        state.recommendList = action.payload.result.map((item) => ({
          id: item.id,
          imageUrl: item.picUrl,
          playCount: item.playCount,
          description: item.name
        }))
        state.loading = false
      })
      .addCase(getRecommendList.rejected, (state) => {
        state.loading = false
      })
  }
})
