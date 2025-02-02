'use client'

import {FC, PropsWithChildren} from 'react'
import RequireAuth from '@/common/context/RequireAuth'
import GlobalDialog from '@/common/dialog/GlobalDialog'

const AuthPage: FC<PropsWithChildren> = ({children}) => {
  return (
    <RequireAuth>
      {children}
      <GlobalDialog />
    </RequireAuth>
  )
}
export default AuthPage
