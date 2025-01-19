import {useState} from 'react'

interface SellDialogProps {
  onClose: () => void
}

const SellDialog = ({onClose}: SellDialogProps) => {
  const buyId = '' // todo.
  const url = `/api/transactions/${buyId}/sell`
  return <></>
}
export default SellDialog
