import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getBannerListApi, getRecommendListApi } from '@/api'
import { IBanner } from '@/components/BannerList'
import { IRecommend } from '@/components/RecommendList'

export const getBannerListAndRecommendList = createAsyncThunk(
  'recommend/getBannerListAndRecommendList',
  () => {
    return Promise.all([getRecommendListApi(), getBannerListApi()])
  }
)

const initialState: {
  bannerList: IBanner[]
  recommendList: IRecommend[]
  loading: boolean
} = {
  bannerList: [],
  recommendList: [],
  loading: true
}

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerListAndRecommendList.fulfilled, (state, action) => {
        state.bannerList = action.payload[1].banners
        state.recommendList = action.payload[0].result.map((item) => ({
          id: item.id,
          imageUrl: item.picUrl,
          playCount: item.playCount,
          description: item.name
        }))
        state.loading = false
      })
      .addCase(getBannerListAndRecommendList.rejected, (state) => {
        state.loading = false
      })
  }
})
