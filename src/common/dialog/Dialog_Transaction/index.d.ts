import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  open: boolean
  defaultTransaction?: ITransaction
  defaultTicker?: string
  onClose: () => void
}
