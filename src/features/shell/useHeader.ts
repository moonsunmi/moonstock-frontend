import axiosInstance from '@/lib/axios'
import {useUserStore} from '@/stores/useUserStore'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import useSWRMutation from 'swr/mutation'

const useHeader = () => {
  const router = useRouter()
  const {userInfo, resetUserInfo} = useUserStore()

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const {trigger: triggerLogout, isMutating: isLoggingOut} = useSWRMutation(
    '/api/auth/logout',
    url => {
      return axiosInstance.post(url)
    }
  )

  const isAuthed = isMounted && !!userInfo?.email

  const logout = useCallback(async () => {
    try {
      await triggerLogout()
    } catch {
    } finally {
      resetUserInfo()
      localStorage.removeItem('accessToken')
      router.push('/')
    }
  }, [triggerLogout, resetUserInfo, router])

  const go = useCallback(
    (url: string) => {
      router.push(url)
    },
    [router]
  )

  return {
    isAuthed,
    isLoggingOut,
    go,
    logout
  }
}

export default useHeader
