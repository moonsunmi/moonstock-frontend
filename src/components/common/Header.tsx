'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import {Button} from '../ui'
import axiosInstance from '@/lib/axios'
import {useUserStore} from '@/stores/useUserStore'

export const Header = () => {
  const router = useRouter()

  const {userInfo, resetUserInfo} = useUserStore()

  const [isMounted, setIsMounted] = useState(false)

  const logoutMutation = useSWRMutation('/api/auth/logout', url => {
    return axiosInstance.post(url)
  })

  const handleOnLink = url => {
    router.push(url)
  }

  const handleOnLogin = () => {
    router.push('/login')
  }

  const handleOnLogOut = () => {
    logoutMutation.trigger()
    resetUserInfo()
    localStorage.removeItem('accessToken')
    router.push('/')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="fixed flex flex-row content-center justify-between w-full h-16 p-5 font-bold shadow-md text-primary-950 bg-primary-200">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        MoonStock
      </div>
      <div className="flex gap-1">
        {/* {isMounted && userInfo?.email !== null && ( */}
        <Button variant="text" onClick={() => handleOnLink('/board')}>
          내 주식
        </Button>
        {/* )} */}
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
