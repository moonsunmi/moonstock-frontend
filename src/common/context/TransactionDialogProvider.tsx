import {useTypedDispatch, useTypedSelector} from '@/store/store'
import {Dialog_Transaction} from '../dialog'
import {closeDialog} from '@/store/slices/dialogSlice'

const TransactionDialogProvider = () => {
  const {open, type, ticker, transaction} = useTypedSelector(
    state => state.dialog
  )
  const dispatch = useTypedDispatch()

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <>
      <Dialog_Transaction
        open={open}
        targetTransaction={transaction}
        defaultTicker={ticker}
        requestType={type}
        onClose={handleClose}
      />
    </>
  )
}
export default TransactionDialogProvider
