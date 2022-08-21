import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getHotSingerListApi, getSingerListApi } from '@/api'
import { ISinger } from '@/components/SingerList'
import { RootState } from '@/store'

const namespace = 'singers'

export const getHotSingerList = createAsyncThunk(`${namespace}/getHotSingerList`, async (_, { dispatch }) => {
  const { setSingerList, setEnterLoading, setOffset, setIsEnded } = singersSlice.actions

  try {
    dispatch(setEnterLoading(true))
    const res = await getHotSingerListApi(0)
    dispatch(setOffset(0))
    dispatch(setEnterLoading(false))
    dispatch(setIsEnded(false))
    dispatch(setSingerList(res.artists))
  } catch (error) {
    console.log('error:', error)
  }
})

export const updateSingerList = createAsyncThunk(`${namespace}/updateSingerList`, async (_, { dispatch, getState }) => {
  const { setSingerList, setEnterLoading, setOffset, setIsEnded } = singersSlice.actions
  const { singers } = getState() as RootState

  try {
    dispatch(setEnterLoading(true))
    let res
    if (singers.alpha === '' && singers.area === '' && singers.type === '') {
      res = await getHotSingerListApi(0)
    } else {
      res = await getSingerListApi(singers.type, singers.area, singers.alpha, 0)
    }
    dispatch(setOffset(0))
    dispatch(setEnterLoading(false))
    dispatch(setIsEnded(false))
    dispatch(setSingerList(res.artists))
  } catch (error) {
    console.log('error:', error)
  }
})

export const pullUpSingerList = createAsyncThunk(`${namespace}/pullUpSingerList`, async (_, { dispatch, getState }) => {
  const { setSingerList, setPullUpLoading, setOffset, setIsEnded } = singersSlice.actions
  const { singers } = getState() as RootState

  if (singers.isEnded || singers.pullUpLoading) {
    return
  }

  try {
    dispatch(setPullUpLoading(true))
    let res
    if (singers.alpha === '' && singers.area === '' && singers.type === '') {
      res = await getHotSingerListApi(singers.offset + 1)
    } else {
      res = await getSingerListApi(singers.type, singers.area, singers.alpha, singers.offset + 1)
    }
    if (res.artists.length === 0) {
      dispatch(setIsEnded(true))
    }
    dispatch(setOffset(singers.offset + 1))
    dispatch(setPullUpLoading(false))
    dispatch(setSingerList([...singers.singerList, ...res.artists]))
  } catch (error) {
    console.log('error:', error)
  }
})

export const pullDownSingerList = createAsyncThunk(
  `${namespace}/pullDownSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setOffset, setPullDownLoading, setIsEnded } = singersSlice.actions
    const { singers } = getState() as RootState

    if (singers.pullDownLoading) {
      return
    }

    try {
      dispatch(setPullDownLoading(true))
      let res
      if (singers.alpha === '' && singers.area === '' && singers.type === '') {
        res = await getHotSingerListApi(0)
      } else {
        res = await getSingerListApi(singers.type, singers.area, singers.alpha, 0)
      }
      dispatch(setOffset(0))
      dispatch(setPullDownLoading(false))
      dispatch(setIsEnded(false))
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
  isEnded: boolean
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
  area: '',
  isEnded: false
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
    setPullUpLoading: (state: ISingersState, action: PayloadAction<boolean>) => {
      state.pullUpLoading = action.payload
    },
    setPullDownLoading: (state: ISingersState, action: PayloadAction<boolean>) => {
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
    },
    setIsEnded: (state: ISingersState, action: PayloadAction<boolean>) => {
      state.isEnded = action.payload
    }
  }
})
