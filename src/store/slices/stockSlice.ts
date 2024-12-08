import {createSlice} from '@reduxjs/toolkit'

type StateType = {
  holdings: IStock[]
  selectedTicker: string
}

const initialState: StateType = {
  holdings: [],
  selectedTicker: null
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {
    init: () => {
      return {...initialState}
    },
    setHoldings: (state, action) => {
      state.holdings = action.payload
    },
    setSelectedTicker: (state, action) => {
      state.selectedTicker = action.payload
    }
  }
})

export const {setHoldings, setSelectedTicker} = stockSlice.actions
export const stockReducer = stockSlice.reducer
