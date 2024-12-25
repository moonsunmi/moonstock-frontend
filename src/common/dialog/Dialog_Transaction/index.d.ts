import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  open: boolean
  requestType: RequestType | 'MATCH'
  targetTransaction?: ITransaction
  defaultTicker?: string
  onClose: () => void
}
