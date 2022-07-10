import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICounterState {
  count: number
  title: string
}

const initialState: ICounterState = {
  count: 0,
  title: 'redux toolkit'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrement: (state) => {
      state.count--
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
