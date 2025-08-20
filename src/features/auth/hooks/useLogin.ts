'use client'

import axiosInstance from '@/lib/axios'
import {useAccountStore} from '@/stores/useAccountStore'
import {useUserStore} from '@/stores/useUserStore'
import {writeItemFromStorage} from '@/utils'
import {useRouter} from 'next/navigation'
import {useSnackbar} from 'notistack'
import {ChangeEvent, FormEvent, useState} from 'react'
import useSWRMutation from 'swr/mutation'

type FormType = Record<'email' | 'password', string>
type LoginArg = {email: string; password: string}

const useLogin = () => {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const {setUserInfo} = useUserStore()
  const {setAccounts} = useAccountStore()
  const [{email, password}, setForm] = useState<FormType>({
    email: '',
    password: ''
  })

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({...p, email: e.target.value}))
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({...p, password: e.target.value}))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    trigger({email, password})
  }

  const {isMutating, trigger} = useSWRMutation(
    '/api/auth/login',
    (url, {arg}: {arg: LoginArg}) => {
      return axiosInstance
        .post(url, arg, {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        })
        .then(res => res.data)
    },
    {
      onSuccess: res => {
        const {userInfo, accessToken} = res

        setUserInfo({
          ...userInfo,
          defaultAccount: userInfo.accounts.find(account => account.isDefault)
        })
        setAccounts(userInfo.accounts)
        writeItemFromStorage('accessToken', accessToken)

        router.push('/board')
        enqueueSnackbar(`로그인되었습니다.`, {variant: 'success'})
      },
      onError: (e: any) => {
        enqueueSnackbar(
          `로그인 에러:${e?.response?.data?.errorMessage ?? '알 수 없는 에러'}`,
          {variant: 'error'}
        )
      }
    }
  )

  return {
    email,
    password,
    isSubmitting: isMutating,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    goSignUp: () => router.push('/sign-up')
  }
}

export default useLogin
