import {useTransactionDialog} from '@/common/context/TransactionDialogProvider'
import DeleteDialog from '@/common/dialog/DeleteDialog'
import BuyDialog from './BuyDialog'

const GlobalDialog = () => {
  const {dialogType, dialogData, openDialog, closeDialog} =
    useTransactionDialog()

  if (!dialogType) return null

  const renderDialog = () => {
    switch (dialogType) {
      case 'buy':
        return <BuyDialog onClose={closeDialog} defaultValue={dialogData} />
      case 'sell':
        return <></>
      // return (
      //   <UpdateDialog
      //     defaultTransaction={transaction}
      //     defaultTicker={ticker}
      //     type={type}
      //     onClose={handleClose}
      //   />
      // )
      case 'delete':
        return <DeleteDialog onClose={closeDialog} transaction={dialogData} />
      default:
        return null
    }
  }

  return <>{renderDialog()}</>
}
export default GlobalDialog
