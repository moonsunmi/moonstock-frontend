'use client'

import {FC, PropsWithChildren, useEffect} from 'react'

import {useRouter} from 'next/navigation'
import {readItemFromStorageP} from '../../utils'

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const accessToken = readItemFromStorageP('accessToken')
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) router.push('/')
  }, [accessToken, router])

  return <>{children}</>
}
export default RequireAuth
