import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getRankListApi } from '@/api'
import { ISinger } from '@/components/SingerList'
import { RootState } from '@/store'

const namespace = 'rank'

export const getRankList = createAsyncThunk(
  `${namespace}/getRankList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setEnterLoading } = singersSlice.actions
    const { singers } = getState() as RootState

    try {
      dispatch(setEnterLoading(true))
      const res = await getRankListApi(singers.offset)
      dispatch(setEnterLoading(false))
      dispatch(setSingerList(res.artists))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

export const updateSingerList = createAsyncThunk(
  `${namespace}/updateSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setEnterLoading } = singersSlice.actions
    const { singers } = getState() as RootState

    try {
      dispatch(setEnterLoading(true))
      let res
      if (singers.alpha === '' && singers.area === '' && singers.type === '') {
        res = await getHotSingerListApi(singers.offset)
      } else {
        res = await getSingerListApi(
          singers.type,
          singers.area,
          singers.alpha,
          singers.offset
        )
      }
      dispatch(setEnterLoading(false))
      dispatch(setSingerList(res.artists))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

export const pullUpSingerList = createAsyncThunk(
  `${namespace}/pullUpSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setPullUpLoading, setOffset } = singersSlice.actions
    const { singers } = getState() as RootState

    try {
      dispatch(setPullUpLoading(true))
      dispatch(setOffset(singers.offset + 1))
      let res
      if (singers.alpha === '' && singers.area === '' && singers.type === '') {
        res = await getHotSingerListApi(singers.offset)
      } else {
        res = await getSingerListApi(
          singers.type,
          singers.area,
          singers.alpha,
          singers.offset
        )
      }
      dispatch(setPullUpLoading(false))
      dispatch(setSingerList([...singers.singerList, ...res.artists]))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

export const pullDownSingerList = createAsyncThunk(
  `${namespace}/pullDownSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setOffset, setPullDownLoading } =
      singersSlice.actions
    const { singers } = getState() as RootState

    try {
      dispatch(setPullDownLoading(true))
      dispatch(setOffset(0))
      let res
      if (singers.alpha === '' && singers.area === '' && singers.type === '') {
        res = await getHotSingerListApi(singers.offset)
      } else {
        res = await getSingerListApi(
          singers.type,
          singers.area,
          singers.alpha,
          singers.offset
        )
      }
      dispatch(setPullDownLoading(false))
      dispatch(setSingerList(res.artists))
    } catch (error) {
      console.log('error:', error)
    }
  }
)

interface ISingersState {
  singerList: ISinger[]
  enterLoading: boolean
  pullUpLoading: boolean
  pullDownLoading: boolean
  offset: number
  alpha: string
  type: string
  area: string
}

const initialState: ISingersState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  offset: 0,
  alpha: '',
  type: '',
  area: ''
}

export const singersSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setSingerList: (state: ISingersState, action: PayloadAction<ISinger[]>) => {
      state.singerList = action.payload
    },
    setEnterLoading: (state: ISingersState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    },
    setPullUpLoading: (
      state: ISingersState,
      action: PayloadAction<boolean>
    ) => {
      state.pullUpLoading = action.payload
    },
    setPullDownLoading: (
      state: ISingersState,
      action: PayloadAction<boolean>
    ) => {
      state.pullDownLoading = action.payload
    },
    setOffset: (state: ISingersState, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setAlpha: (state: ISingersState, action: PayloadAction<string>) => {
      state.alpha = action.payload
    },
    setArea: (state: ISingersState, action: PayloadAction<string>) => {
      state.area = action.payload
    },
    setType: (state: ISingersState, action: PayloadAction<string>) => {
      state.type = action.payload
    }
  }
})
