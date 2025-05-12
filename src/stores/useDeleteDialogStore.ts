import {create} from 'zustand'

interface DeleteDialogState {
  isOpen: boolean
  data: ITransaction
  openDialog: (data?: ITransaction) => void
  closeDialog: () => void
  setData: (data: ITransaction | ((prev: ITransaction) => ITransaction)) => void
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
