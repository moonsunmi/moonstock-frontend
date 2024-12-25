'use client'

import {FC, PropsWithChildren} from 'react'
import RequireAuth from '@/common/context/RequireAuth'
import TransactionDialogProvider from '@/common/context/TransactionDialogProvider'

const AuthPage: FC<PropsWithChildren> = ({children}) => {
  return (
    <RequireAuth>
      <TransactionDialogProvider />
      {children}
    </RequireAuth>
  )
}
export default AuthPage
