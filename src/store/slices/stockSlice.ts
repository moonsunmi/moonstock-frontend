import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const stockSlice = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {}
})

export const stockReducer = stockSlice.reducer
