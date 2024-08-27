'use client'

import Link from 'next/link'
import {ChangeEvent, useContext, useEffect, useState} from 'react'
import * as U from '@/common/utils'
import {AuthContext} from '@/common/context'
import {useRouter} from 'next/navigation'

type FormType = Record<'email' | 'password', string>
const LoginPage = () => {
  const router = useRouter()

  const {login} = useContext(AuthContext)

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
      if (user) setForm(JSON.parse(user))
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">Login</h1>
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange('email')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChange('password')}
          />
          <button
            type="submit"
            className="w-full btn btn-primary"
            onClick={loginAccount}>
            LOGIN
          </button>

          <div className="mt-6 text-gray-800">
            Create account?
            <Link className="btn btn-link btn-primary" href="/signup/">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  )
}
export default LoginPage
