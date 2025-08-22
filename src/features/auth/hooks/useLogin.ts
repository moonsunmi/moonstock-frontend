'use client'

import axiosInstance from '@/lib/axios'
import {useAccountStore} from '@/stores/useAccountStore'
import {useUserStore} from '@/stores/useUserStore'
import {writeItemFromStorage} from '@/utils'
import {AxiosError} from 'axios'
import {useRouter} from 'next/navigation'
import {useSnackbar} from 'notistack'
import {ChangeEvent, FormEvent, useState} from 'react'
import useSWRMutation from 'swr/mutation'
import {authQueryKeys} from '../data/key'
import {authApi} from '../data/api'

type FormType = Record<'email' | 'password', string>
type LoginArg = {email: string; password: string}

const useLogin = () => {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const {setUserInfo} = useUserStore()
  const {setAccounts} = useAccountStore()
  const [form, setForm] = useState<FormType>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setForm(prev => ({...prev, [name]: value}))
    if (error) setError(null)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    trigger(form)
  }

  const {isMutating, trigger} = useSWRMutation(
    authQueryKeys.login,
    (_key, {arg}: {arg: LoginArg}) => {
      return authApi.login(arg)
    },
    {
      onSuccess: res => {
        const {userInfo, accessToken} = res?.data

        setUserInfo({
          ...userInfo,
          defaultAccount: userInfo.accounts.find(account => account.isDefault)
        })
        setAccounts(userInfo.accounts)
        writeItemFromStorage('accessToken', accessToken)

        router.push('/board')
        enqueueSnackbar(`로그인되었습니다.`, {variant: 'success'})
      },
      onError: (err: AxiosError<{message?: string}>) => {
        const errorMessage = err.response?.data?.message ?? '알 수 없는 에러'

        setError(errorMessage)
        enqueueSnackbar(`로그인 실패:${errorMessage}`, {variant: 'error'})
      }
    }
  )

  return {
    ...form,
    isSubmitting: isMutating,
    onChange,
    onSubmit
  }
}

export default useLogin
