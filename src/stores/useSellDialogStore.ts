import {create} from 'zustand'

interface SellDialogState {
  isOpen: boolean
  data: ITrade
  openDialog: (buyData: ITrade) => void
  closeDialog: () => void
  setData: (data: ITrade | ((prev: ITrade) => ITrade)) => void
}

const useSellDialog = create<SellDialogState>(set => ({
  isOpen: false,
  data: null,
  openDialog: buyData => set({isOpen: true, data: buyData}),
  closeDialog: () => set({isOpen: false, data: null}),
  setData: data =>
    set(state => ({
      ...state,
      data: typeof data === 'function' ? data(state.data!) : data
    }))
}))

export default useSellDialog
