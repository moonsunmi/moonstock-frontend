import {create} from 'zustand'

interface UpdateDialogState {
  isOpen: boolean
  data: ITrade
  type: 'buy' | 'sell'
  openDialog: (type: 'buy' | 'sell', data: ITrade) => void
  closeDialog: () => void
  setData: (data: ITrade | ((prev: ITrade) => ITrade)) => void
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
