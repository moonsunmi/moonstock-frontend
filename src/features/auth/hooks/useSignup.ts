'use client'

import axiosInstance from '@/lib/axios'
import {useRouter} from 'next/navigation'
import {useSnackbar} from 'notistack'
import {ChangeEvent, useCallback, useState} from 'react'
import useSWRMutation from 'swr/mutation'
import {authQueryKeys} from '../data/key'
import {authApi} from '../data/api'

type SignUpArg = {name: string; email: string; password: string}

type SignUpFormType = Record<
  'name' | 'email' | 'password' | 'confirmPassword',
  string
>

const initFormState = {name: '', email: '', password: '', confirmPassword: ''}

const useSignup = () => {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const [{name, email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>(initFormState)

  const signUpMutation = useSWRMutation(
    authQueryKeys.signup,
    (_key, {arg}: {arg: SignUpArg}) => {
      return authApi.signup(arg)
    },
    {
      onSuccess: res => {
        router.push('/login')
        enqueueSnackbar(`성공적으로 회원 가입되었습니다.`, {variant: 'success'})
      },
      onError: (e: any) => {
        enqueueSnackbar(
          `회원가입에 실패했습니다: ${
            e?.response?.data?.errorMessage ?? '알 수 없는 에러'
          }`,
          {
            variant: 'error'
          }
        )
      }
    }
  )

  const handleOnChange = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const createAccount = () => {
    if (password != confirmPassword) {
      enqueueSnackbar(`비밀번호가 일치하지 않습니다.`, {variant: 'error'})
    } else {
      signUpMutation.trigger({name, email, password})
    }
  }

  return {
    name,
    email,
    password,
    confirmPassword,
    handleOnChange,
    createAccount
  }
}

export default useSignup
