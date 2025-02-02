import {create} from 'zustand'

interface UpdateDialogState {
  isOpen: boolean
  data: ITransaction
  type: 'buy' | 'sell'
  openDialog: (type: 'buy' | 'sell', data: ITransaction) => void
  closeDialog: () => void
  setData: (data: ITransaction | ((prev: ITransaction) => ITransaction)) => void
}

const useUpdateDialog = create<UpdateDialogState>(set => ({
  isOpen: false,
  data: null,
  type: null,
  openDialog: (type, data) => set({isOpen: true, type, data}),
  closeDialog: () => set({isOpen: false, data: null}),
  setData: data =>
    set(state => ({
      ...state,
      data: typeof data === 'function' ? data(state.data!) : data
    }))
}))

export default useUpdateDialog
