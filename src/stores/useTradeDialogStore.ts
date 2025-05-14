import {TradeDialogMode} from '@/@types/DialogTypes'
import {initTransaction} from '@/common/lib/initData'
import {create} from 'zustand'

interface TradeDialogState {
  mode: TradeDialogMode
  tradeType: TransactionType
  isOpen: boolean
  data: ITransaction
}
interface TradeDialogActions {
  openDialog: (mode: TradeDialogMode, data?: ITransaction) => void
  closeDialog: () => void
  setData: (data: ITransaction | ((prev: ITransaction) => ITransaction)) => void
}

const initialState: TradeDialogState = {
  mode: null,
  tradeType: null,
  isOpen: false,
  data: null
}

const useTradeDialog = create<TradeDialogState & TradeDialogActions>(set => ({
  ...initialState,
  mode: null,
  tradeType: null,
  isOpen: false,
  data: null,
  openDialog: (mode, data = initTransaction) => set({isOpen: true, mode, data}),
  closeDialog: () => set({isOpen: false, data: null}),
  setData: data =>
    set(state => ({
      ...state,
      data: typeof data === 'function' ? data(state.data!) : data
    })),
  updateQuantity: quantity =>
    set(state => ({data: state.data ? {...state.data, quantity} : null}))
}))

export default useTradeDialog
