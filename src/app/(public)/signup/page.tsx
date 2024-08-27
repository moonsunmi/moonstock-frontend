'use client'

import {ChangeEvent, useCallback, useContext, useState} from 'react'

import {AuthContext} from '@/common/context'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

type SignUpFormType = Record<'email' | 'password' | 'confirmPassword', string>
const initFormState = {email: '', password: '', confirmPassword: ''}

const SignUpPage = () => {
  const router = useRouter()
  const {signup} = useContext(AuthContext)

  const [{email, password, confirmPassword}, setForm] =
    useState<SignUpFormType>(initFormState)

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const createAccount = () => {
    signup(email, password, () => router.push('/'))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">회원 가입</h1>
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary"
            name="email"
            placeholder="Email"
            value={email}
            onChange={changed('email')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary"
            name="password"
            placeholder="Password"
            value={password}
            onChange={changed('password')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary"
            name="confirm_password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={changed('confirmPassword')}
          />
          <button
            type="submit"
            className="w-full btn btn-primary"
            onClick={createAccount}>
            계정 만들기
          </button>

          <div className="mt-6 text-grey-dark">
            Already have an account?
            <Link className="btn btn-link btn-primary" href="/login/">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  )
}
export default SignUpPage
