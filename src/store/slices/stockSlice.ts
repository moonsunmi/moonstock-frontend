import {createSlice} from '@reduxjs/toolkit'

type StateType = {
  selectedTicker: string
}

const initialState: StateType = {
  selectedTicker: null
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {
    init: () => {
      return {...initialState}
    },
    setSelectedTicker: (state, action) => {
      console.log('action', action.payload)
      return {...state, selectedTicker: action.payload}
    }
  }
})

export const {setSelectedTicker} = stockSlice.actions
export const stockReducer = stockSlice.reducer
