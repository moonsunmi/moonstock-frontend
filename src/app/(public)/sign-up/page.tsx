'use client'

import {ChangeEvent, useCallback, useContext, useState} from 'react'

import {AuthContext} from '@/common/context'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {Button, Card, Input, Paragraph} from '@/browser/components/UI'

type SignUpFormType = Record<
  'name' | 'email' | 'password' | 'confirmPassword',
  string
>
const initFormState = {name: '', email: '', password: '', confirmPassword: ''}

const SignUpPage = () => {
  const router = useRouter()
  const {signUp} = useContext(AuthContext)

  const [{name, email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>(initFormState)

  const [showHelper, toggleShowHelper] = useState<boolean>(false) // todo. helpertext

  const handleOnChange = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const createAccount = () => {
    if (password != confirmPassword) toggleShowHelper(true)
    signUp(name, email, password) //, () => router.push('/'))
  }

  return (
    <div className="flex items-center justify-center w-full px-56">
      <Card>
        <div className="mb-4 text-center">
          <Paragraph type="title">SignUp</Paragraph>
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
