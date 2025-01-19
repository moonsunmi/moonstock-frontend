import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  open: boolean
  type: RequestType
  defaultTransaction?: ITransaction
  defaultTicker?: string
  onClose: () => void
}
