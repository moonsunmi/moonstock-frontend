import {createContext, ReactNode, useContext, useState} from 'react'

interface DialogContextType {
  dialogType: 'buy' | 'sell' | 'update' | 'delete'
  dialogData: any
  openDialog: (type: 'buy' | 'sell' | 'update' | 'delete', data?: any) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

const TransactionDialogProvider: React.FC<{children: ReactNode}> = ({
  children
}) => {
  const [dialogType, setDialogType] = useState<
    'buy' | 'sell' | 'update' | 'delete'
  >(null)
  const [dialogData, setDialogData] = useState<any>(null)

  const openDialog = (
    type: 'buy' | 'sell' | 'update' | 'delete',
    data?: any
  ) => {
    setDialogType(type)
    setDialogData(data || null)
  }

  const closeDialog = () => {
    setDialogType(null)
    setDialogData(null)
  }

  return (
    <DialogContext.Provider
      value={{dialogType, dialogData, openDialog, closeDialog}}>
      {children}
    </DialogContext.Provider>
  )
}

export const useTransactionDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useTransactionDialog must be used within a DialogProvider')
  }
  return context
}

export default TransactionDialogProvider
