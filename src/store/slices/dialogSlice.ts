import {createSlice, PayloadAction} from '@reduxjs/toolkit'

///////
// 매수와 매도의 CRUD를 한 다이얼로그에서 할지 생각해 보기
///////

interface DialogState {
  ticker: string
  type: RequestType
  transaction: ITransaction
}

const initialState: DialogState = {
  ticker: '',
  type: null,
  transaction: null
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openTransactionDialog(
      state,
      action: PayloadAction<{type: RequestType; transaction: ITransaction}>
    ) {
      state.type = action.payload.type
      state.transaction = action.payload.transaction
    },
    closeTransactionDialog(state) {
      state.type = null
      state.transaction = null
    }
  }
})

export const {openTransactionDialog, closeTransactionDialog} =
  dialogSlice.actions

export default dialogSlice.reducer
