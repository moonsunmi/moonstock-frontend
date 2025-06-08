import {TradeDialogMode} from '@/@types/DialogTypes'
import {initTransaction} from '@/utils/initData'
import {create} from 'zustand'

interface TradeDialogState {
  mode: TradeDialogMode
  tradeType: TradeType
  isOpen: boolean
  data: ITrade
}
interface TradeDialogActions {
  openDialog: (mode: TradeDialogMode, data?: ITrade) => void
  closeDialog: () => void
  setData: (data: ITrade | ((prev: ITrade) => ITrade)) => void
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
    }))
}))

export default useTradeDialog
