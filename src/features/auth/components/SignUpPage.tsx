'use client'

import {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import {useSnackbar} from 'notistack'
import {Button, Card, Input, Paragraph} from '@/components/ui'
import axiosInstance from '@/lib/axios'

type SignUpArg = {name: string; email: string; password: string}

type SignUpFormType = Record<
  'name' | 'email' | 'password' | 'confirmPassword',
  string
>

const initFormState = {name: '', email: '', password: '', confirmPassword: ''}

const SignUpPage = () => {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const [{name, email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>(initFormState)

  const signUpMutation = useSWRMutation(
    '/api/auth/sign-up',
    (url, {arg}: {arg: SignUpArg}) => {
      return axiosInstance
        .post(url, arg, {
          withCredentials: false
        })
        .then(res => res.data)
    },
    {
      onSuccess: () => {
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

  return (
    <div className="flex items-center justify-center w-full px-56">
      <Card>
        <div className="mb-4 text-center">
          <Paragraph variant="title">SignUp</Paragraph>
        </div>
        <hr className="h-1 pt-2 pb-2 border-secondary-300" />
        <div className="flex flex-col gap-6">
          <Input
            type="text"
            className="w-full"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleOnChange('name')}
          />
          <Input
            type="text"
            className="w-full"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange('email')}
          />
          <Input
            type="password"
            className="w-full"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleOnChange('password')}
          />
          <Input
            type="password"
            className="w-full"
            name="confirm_password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleOnChange('confirmPassword')}
          />
          <hr className="h-1 pt-2 pb-2 border-secondary-300" />
          <Button type="submit" className="w-full" onClick={createAccount}>
            계정 만들기
          </Button>
        </div>
      </Card>
    </div>
  )
}
export default SignUpPage
