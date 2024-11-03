'use client'

import {FC, PropsWithChildren} from 'react'
import RequireAuth from '@/common/context/RequireAuth'

const AuthPage: FC<PropsWithChildren> = ({children}) => {
  return <RequireAuth>{children}</RequireAuth>
}
export default AuthPage
