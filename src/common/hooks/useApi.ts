import {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig, isAxiosError} from 'axios'

type UseApiReturn<T> = ApiState<T> & {
  execute: (config: AxiosRequestConfig) => void
}

const useApi = <T = any>(
  initialConfig?: AxiosRequestConfig
): UseApiReturn<T> => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const execute = async config => {
    setLoading(true)
    try {
      const response = await axios.request(config)
      setData(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        setErrMsg(err.message)
      } else {
        setErrMsg('unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialConfig) {
      execute(initialConfig)
    }
  }, [initialConfig])

  return {execute, data, loading, errMsg}
}

export default useApi

// // hooks/useAuth.ts
// import { useState, useCallback } from 'react'
// import { useDispatch } from '@/store/store'
// import { setUserInfo } from '@/store/slices/authSlice'
// import useApi from './api/useApi'

// type Callback = () => void

// const useAuth = () => {
//   const dispatch = useDispatch()
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)

//   // useApi 훅을 이용하여 login API 설정
//   const { execute: loginRequest, data: loginData, error: loginError } = useApi()

//   // useApi 훅을 이용하여 signUp API 설정
//   const { execute: signUpRequest, data: signUpData, error: signUpError } = useApi()

//   // 로그인 기능
//   const login = useCallback(
//     async (email: string, password: string, callback?: Callback) => {
//       await loginRequest({
//         url: 'http://localhost:4000/auth/login',
//         method: 'POST',
//         data: new FormData().append('email', email).append('password', password),
//         withCredentials: true,
//       })

//       if (loginData?.ok) {
//         dispatch(setUserInfo(loginData.userInfo))
//         callback && callback()
//       } else {
//         setErrorMessage(loginError || 'Login failed')
//       }
//     },
//     [loginRequest, loginData, loginError]
//   )

//   // 회원가입 기능
//   const signUp = useCallback(
//     async (name: string, email: string, password: string, callback?: Callback) => {
//       await signUpRequest({
//         url: 'http://localhost:4000/auth/sign-up',
//         method: 'POST',
//         data: new FormData()
//           .append('name', name)
//           .append('email', email)
//           .append('password', password),
//       })

//       if (signUpData?.ok) {
//         dispatch(setUserInfo(signUpData.userInfo))
//         callback && callback()
//       } else {
//         setErrorMessage(signUpError || 'Sign Up failed')
//       }
//     },
//     [signUpRequest, signUpData, signUpError]
//   )

//   // 로그아웃 기능
//   const logout = (callback?: Callback) => {
//     dispatch(setUserInfo(null))
//     callback && callback()
//   }

//   return { login, signUp, logout, errorMessage }
// }

// export default useAuth

// // hooks/api/useApi.ts
// import { useState, useEffect } from 'react'
// import axios, { AxiosRequestConfig } from 'axios'

// type ApiState<T> = {
//   data: T | null
//   error: string | null
//   loading: boolean
// }

// type UseApiReturn<T> = ApiState<T> & {
//   execute: (config: AxiosRequestConfig) => Promise<void>
// }

// const useApi = <T = any>(initialConfig?: AxiosRequestConfig): UseApiReturn<T> => {
//   const [data, setData] = useState<T | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)

//   const execute = async (config: AxiosRequestConfig) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await axios.request<T>(config)
//       setData(response.data)
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.message)
//       } else {
//         setError('Unexpected error occurred')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (initialConfig) {
//       execute(initialConfig)
//     }
//   }, [initialConfig])

//   return { data, error, loading, execute }
// }

// export default useApi
