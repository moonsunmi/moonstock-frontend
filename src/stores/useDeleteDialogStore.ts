import {create} from 'zustand'

interface DeleteDialogState {
  isOpen: boolean
  data: ITrade
  openDialog: (data?: ITrade) => void
  closeDialog: () => void
  setData: (data: ITrade | ((prev: ITrade) => ITrade)) => void
}

const useDeleteDialog = create<DeleteDialogState>(set => ({
  isOpen: false,
  data: null,
  openDialog: data => set({isOpen: true, data}),
  closeDialog: () => set({isOpen: false, data: null}),
  setData: data =>
    set(state => ({
      ...state,
      data: typeof data === 'function' ? data(state.data!) : data
    }))
}))

export default useDeleteDialog
