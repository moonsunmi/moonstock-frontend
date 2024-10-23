'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import {Button} from '../UI'
import {useDispatch, useSelector} from '@/store/store'
import {setUserInfo} from '@/store/slices/authSlice'
import axiosInstance from '@/common/lib/axios'

export const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {userInfo} = useSelector(state => state.auth)

  const [isMounted, setIsMounted] = useState(false)

  const logoutMutation = useSWRMutation('/api/auth/logout', url => {
    return axiosInstance.post(url)
  })

  const handleOnStock = () => {
    router.push('/stock-board')
  }

  const handleOnLogin = () => {
    router.push('/login')
  }

  const handleOnLogOut = () => {
    logoutMutation.trigger()
    dispatch(setUserInfo({name: null, email: null}))
    localStorage.removeItem('token')
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
