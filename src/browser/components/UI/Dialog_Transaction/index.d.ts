import {Dispatch, SetStateAction} from 'react'

export interface Dialog_TransactionProps {
  defaultQuantity: number
  defaultPrice: number
  defaultTicker: string
  onClose: () => void
  open: boolean
  type: TransactionType
}
