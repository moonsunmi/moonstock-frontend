import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface DialogState {
  open: boolean
  ticker: string
  type: RequestType | 'MATCH'
  transaction: ITransaction | null
}

const initialState: DialogState = {
  open: false,
  ticker: '',
  type: null,
  transaction: null
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    createTransaction(state) {
      state.open = true
      state.type = 'CREATE'
      state.transaction = null
    },
    matchTransaction(state, action: PayloadAction<ITransaction>) {
      state.open = true
      state.type = 'MATCH'
      state.transaction = action.payload
    },
    updateTransaction(state, action: PayloadAction<ITransaction>) {
      state.open = true
      state.type = 'UPDATE'
      state.transaction = action.payload
    },
    closeDialog(state) {
      state.open = false
      state.type = null
      state.transaction = null
    }
  }
})

export const {
  createTransaction,
  matchTransaction,
  updateTransaction,
  closeDialog
} = dialogSlice.actions

export default dialogSlice.reducer
