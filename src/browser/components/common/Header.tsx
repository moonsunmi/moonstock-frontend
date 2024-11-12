'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import {Button} from '../UI'
import {useTypedDispatch, useTypedSelector} from '@/store/store'
import {setUserInfo} from '@/store/slices/authSlice'
import axiosInstance from '@/common/lib/axios'

export const Header = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()

  const {userInfo} = useTypedSelector(state => state.auth)

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
    dispatch(setUserInfo({name: null, email: null}))
    localStorage.removeItem('accessToken')
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
        {/* {isMounted && userInfo?.email !== null && ( */}
        <Button variant="text" onClick={() => handleOnLink('/stock-board')}>
          내 주식
        </Button>
        {/* )} */}
        {/* {isMounted && userInfo?.email !== null && ( */}
        <Button variant="text" onClick={() => handleOnLink('/trading')}>
          진행중인거래
        </Button>
        <Button variant="text" onClick={() => handleOnLink('/profit')}>
          내 수익
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
