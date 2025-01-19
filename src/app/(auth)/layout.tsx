'use client'

import {FC, PropsWithChildren} from 'react'
import RequireAuth from '@/common/context/RequireAuth'
import TransactionDialogProvider from '@/common/context/TransactionDialogProvider'
import GlobalDialog from '@/common/dialog/GlobalDialog'

const AuthPage: FC<PropsWithChildren> = ({children}) => {
  return (
    <RequireAuth>
      <TransactionDialogProvider>
        {children}
        <GlobalDialog />
      </TransactionDialogProvider>
    </RequireAuth>
  )
}
export default AuthPage
