import {configureStore} from '@reduxjs/toolkit'
import {stockReducer} from './slices/stockSlice'

const middleware: any[] = []

export const store = configureStore({
  reducer: {
    stock: stockReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware)
})
