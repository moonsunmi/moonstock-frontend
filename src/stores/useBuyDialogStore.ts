import {create} from 'zustand'

interface BuyDialogState {
  isOpen: boolean
  data: ITransaction
  openDialog: (data?: ITransaction) => void
  closeDialog: () => void
  setData: (data: ITransaction | ((prev: ITransaction) => ITransaction)) => void
}

const useBuyDialog = create<BuyDialogState>(set => ({
  isOpen: false,
  data: null,
  openDialog: data => set({isOpen: true, data}),
  closeDialog: () => set({isOpen: false, data: null}),
  setData: data =>
    set(state => ({
      ...state,
      data: typeof data === 'function' ? data(state.data!) : data
    })),
  updateQuantity: quantity =>
    set(state => ({data: state.data ? {...state.data, quantity} : null}))
}))

export default useBuyDialog
