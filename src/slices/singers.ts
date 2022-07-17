import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getHotSingerListApi, getSingerListApi } from '@/api'
import { ISinger } from '@/components/SingerList'
import { RootState } from '@/store'

const namespace = 'singers'

export const getHotSingerList = createAsyncThunk(
  `${namespace}/getHotSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setPullUpLoading, setEnterLoading } =
      singersSlice.actions

    const { singers } = getState() as RootState

    try {
      dispatch(setEnterLoading(true))
      dispatch(setPullUpLoading(true))
      const res = await getHotSingerListApi(singers.offset)
      dispatch(setSingerList(res.artists))
      dispatch(setEnterLoading(false))
      dispatch(setPullUpLoading(false))
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const updateSingerList = createAsyncThunk(
  `${namespace}/updateSingerList`,
  async (_, { dispatch, getState }) => {
    const { setSingerList, setEnterLoading, setPullUpLoading } =
      singersSlice.actions
    const { singers } = getState() as RootState
    try {
      dispatch(setEnterLoading(true))
      dispatch(setPullUpLoading(true))
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
      dispatch(setSingerList(res.artists))
      dispatch(setEnterLoading(false))
      dispatch(setPullUpLoading(false))
    } catch (error) {
      console.log('error', error)
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
      dispatch(setSingerList([...singers.singerList, ...res.artists]))
      dispatch(setPullUpLoading(false))
    } catch (error) {
      console.log('error', error)
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
      dispatch(setSingerList([...singers.singerList, ...res.artists]))
      dispatch(setPullDownLoading(false))
    } catch (error) {
      console.log('error', error)
    }
  }
)

interface IInitialState {
  singerList: ISinger[]
  enterLoading: boolean
  pullUpLoading: boolean
  pullDownLoading: boolean
  offset: number
  alpha: string
  type: string
  area: string
}

const initialState: IInitialState = {
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
    setSingerList: (state: IInitialState, action: PayloadAction<ISinger[]>) => {
      state.singerList = action.payload
    },
    setEnterLoading: (state: IInitialState, action: PayloadAction<boolean>) => {
      state.enterLoading = action.payload
    },
    setPullUpLoading: (
      state: IInitialState,
      action: PayloadAction<boolean>
    ) => {
      state.pullUpLoading = action.payload
    },
    setPullDownLoading: (
      state: IInitialState,
      action: PayloadAction<boolean>
    ) => {
      state.pullDownLoading = action.payload
    },
    setOffset: (state: IInitialState, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setAlpha: (state: IInitialState, action: PayloadAction<string>) => {
      state.alpha = action.payload
    },
    setArea: (state: IInitialState, action: PayloadAction<string>) => {
      state.area = action.payload
    },
    setType: (state: IInitialState, action: PayloadAction<string>) => {
      state.type = action.payload
    }
  }
})
