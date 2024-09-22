import {FC, PropsWithChildren, useContext, useEffect} from 'react'

import {useRouter} from 'next/navigation'
import {useSelector} from '@/store/store'

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const {userInfo} = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!userInfo) router.back()
  }, [userInfo, router])
  return <>{children}</>
}
export default RequireAuth
