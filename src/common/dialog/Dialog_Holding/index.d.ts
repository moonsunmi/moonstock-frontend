import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  defaultTransaction?: ITransaction
  onClose: () => void
  open: boolean
}
