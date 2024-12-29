import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface DialogState {
  open: boolean
  ticker: string
  type: RequestType | 'MATCH'
  transaction: ITransaction | null
  transactionId: string | null
}

const initialState: DialogState = {
  open: false,
  ticker: '',
  type: null,
  transaction: null,
  transactionId: null
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    createTransaction(state) {
      state.open = true
      state.type = 'CREATE'
      state.transaction = null
      state.transactionId = null
    },
    matchTransaction(state, action: PayloadAction<ITransaction>) {
      state.open = true
      state.type = 'MATCH'
      state.transaction = action.payload
      state.transactionId = action.payload.id
    },
    updateTransaction(state, action: PayloadAction<ITransaction>) {
      state.open = true
      state.type = 'UPDATE'
      state.transaction = action.payload
      state.transactionId = action.payload.id
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.open = true
      state.type = 'DELETE'
      state.transactionId = action.payload
      state.transaction = null
    },
    closeDialog(state) {
      state.open = false
      state.type = null
      state.transaction = null
      state.transactionId = null
    }
  }
})

export const {
  createTransaction,
  matchTransaction,
  updateTransaction,
  deleteTransaction,
  closeDialog
} = dialogSlice.actions

export default dialogSlice.reducer
