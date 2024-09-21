'use client'

import {ChangeEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
// Components
import {Button, Card, Input, Paragraph} from '@/browser/components/UI'
// Utils
import * as U from '@/common/utils'
import useAuth from '@/common/hooks/useAuth'

type FormType = Record<'email' | 'password', string>
const LoginPage = () => {
  const router = useRouter()
  const {login, errorMessage} = useAuth()

  const [{email, password}, setForm] = useState<FormType>({
    email: '',
    password: ''
  })

  const handleOnChange =
    (key: 'email' | 'password') => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(prevObj => ({...prevObj, [key]: e.target.value}))
    }

  const loginAccount = () => {
    login(email, password, () => router.push('/'))
  }

  useEffect(() => {
    U.readStringP('user').then(user => {
      if (user) {
        setForm(JSON.parse(user))
      }
    })
  }, [])

  return (
    <div className="flex items-center justify-center w-full px-56">
      <Card>
        <div className="mb-4 text-center">
          <Paragraph type="title">Login</Paragraph>
        </div>
        <hr className="h-1 pt-2 pb-2 border-secondary-300" />
        <div className="flex flex-col gap-6">
          <Input
            name="email"
            className="w-full"
            placeholder="이메일"
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
          <Button type="submit" className="w-full" onClick={loginAccount}>
            LOGIN
          </Button>
          <hr className="h-1 pt-2 pb-2 border-secondary-300" />
          <Button variant="outlined" onClick={() => router.push('/sign-up')}>
            SignUp
          </Button>
        </div>
      </Card>
    </div>
  )
}
export default LoginPage
