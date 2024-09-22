'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
// Components
import {Button} from '../UI'
import {useSelector} from '@/store/store'
import useAuth from '@/common/hooks/useAuth'

export const Header = () => {
  const router = useRouter()
  const {logout} = useAuth()

  const {userInfo} = useSelector(state => state.auth)

  const [isMounted, setIsMounted] = useState(false)

  const handleOnLogin = () => {
    router.push('/login')
  }

  const handleOnLogOut = () => {
    logout()
    router.push('/')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="fixed flex flex-row content-center justify-between w-full h-16 p-5 font-bold shadow-md text-primary-950 bg-secondary-200">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        MoonStock
      </div>
      <div className="flex gap-1">
        <Button variant="text">Components</Button>
        {isMounted && userInfo?.email !== null ? (
          <Button variant="text" onClick={handleOnLogOut}>
            LogOut
          </Button>
        ) : (
          <Button variant="text" onClick={handleOnLogin}>
            LogIn
          </Button>
        )}
      </div>
    </div>
  )
}
