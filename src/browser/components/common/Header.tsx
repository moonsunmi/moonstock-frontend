'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
// Components
import {Button} from '../UI'
import {useDispatch, useSelector} from '@/store/store'
import useAuth from '@/common/hooks/useAuth'
import {setUserInfo} from '@/store/slices/authSlice'

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {logoutMutation} = useAuth()

  const {userInfo} = useSelector(state => state.auth)

  const [isMounted, setIsMounted] = useState(false)

  const handleOnStock = () => {
    router.push('/stock-board')
  }

  const handleOnLogin = () => {
    router.push('/login')
  }

  const handleOnLogOut = () => {
    logoutMutation.trigger()
    dispatch(setUserInfo({name: null, email: null}))
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
        {isMounted && userInfo?.email !== null && (
          <Button variant="text" onClick={handleOnStock}>
            내 주식
          </Button>
        )}
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
