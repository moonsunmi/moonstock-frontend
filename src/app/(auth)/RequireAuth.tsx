import {FC, PropsWithChildren, useContext, useEffect} from 'react'

import {AuthContext} from '@/common/context'
import {useRouter} from 'next/navigation'

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const {loggedUser} = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!loggedUser) router.back()
  }, [loggedUser, router])
  return <>{children}</>
}
export default RequireAuth
