import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getBannerListApi, getRecommendListApi } from '@/api'
import { IBanner } from '@/components/BannerList'
import { IRecommend } from '@/components/RecommendList'

const namespace = 'recommend'

export const getBannerListAndRecommendList = createAsyncThunk(
  `${namespace}/getBannerListAndRecommendList`,
  (_, { dispatch }) => {
    const { setBannerList, setRecommendList, setEnterLoading } =
      recommendSlice.actions

    setEnterLoading(false)
    Promise.all([getRecommendListApi(), getBannerListApi()])
      .then((res) => {
        dispatch(setRecommendList(res[0].result))
        dispatch(setBannerList(res[1].banners))
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
        dispatch(setEnterLoading(false))
      })
  }
)

interface IInitialState {
  bannerList: IBanner[]
  recommendList: IRecommend[]
  enterLoading: boolean
}

const initialState: IInitialState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export const recommendSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setBannerList: (state: IInitialState, action: PayloadAction<IBanner[]>) => {
      state.bannerList = action.payload
    },
    setRecommendList: (
      state: IInitialState,
      action: PayloadAction<IRecommend[]>
    ) => {
      state.recommendList = action.payload
    },
    setEnterLoading: (state: IInitialState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    }
  }
})
