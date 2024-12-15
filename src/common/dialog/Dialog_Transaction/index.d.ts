import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  open: boolean
  matchTransaction?: ITransaction
  defaultTicker?: string
  onClose: () => void
}
