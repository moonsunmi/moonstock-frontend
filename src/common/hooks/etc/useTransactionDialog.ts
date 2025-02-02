import {useContext} from 'react'
import {SellDialogData, UpdateDialogData} from '@/@types/DialogTypes'
import {DialogContext} from '@/common/context/DialogProvider'

export const useTypedDialog = () => {
  const context = useContext(DialogContext)

  if (!context)
    throw new Error('useTypedDialog must be used within a DialogProvider')

  const {dialogType, dialogData, openDialog, closeDialog} = context

  const openBuyDialog = (data: ITransaction) => openDialog('buy', data)
  const openSellDialog = (data: SellDialogData) => openDialog('sell', data)
  const openUpdateDialog = (data: UpdateDialogData) =>
    openDialog('update', data)

  const getDialogData = () => {
    switch (dialogType) {
      case 'buy':
        return dialogData as ITransaction
      case 'sell':
        return dialogData as SellDialogData
      case 'update':
        return dialogData as UpdateDialogData
      default:
        return null
    }
  }

  return {
    dialogType,
    dialogData: getDialogData(),
    openBuyDialog,
    openSellDialog,
    openUpdateDialog,
    closeDialog
  }
}
