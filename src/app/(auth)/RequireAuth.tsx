// React only (not with next.js using nextauth)
import {AuthContext} from '@/common/context'
import {useRouter} from 'next/navigation'
import {FC, PropsWithChildren, useContext, useEffect} from 'react'

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
