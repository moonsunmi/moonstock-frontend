import axios from 'axios'
import {loginAPI, signUpAPI} from '../lib/api/auth'
import {useDispatch, useSelector} from '@/store/store'
import {setUserInfo} from '@/store/slices/authSlice'
import {useState} from 'react'

type Callback = () => void

const useAuth = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const login = async (
    email: string,
    password: string,
    callback?: Callback
  ) => {
    try {
      const response = await loginAPI(email, password)
      const {data} = response

      if (data.ok) {
        dispatch(setUserInfo(data.userInfo))
        if (callback) callback()
      } else {
        setErrorMessage(data.errorMessage)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        console.error('Unexpected error', error)
      }
    }
  }

  const logout = (callback?: Callback) => {
    setUserInfo(null)
    if (callback) callback()
  }

  const signUp = async (
    name: string,
    email: string,
    password: string,
    callback?: Callback
  ) => {
    try {
      const response = await signUpAPI(name, email, password)
      const {data} = response

      if (data.ok) {
        setUserInfo(data.userInfo)
        if (callback) callback()
      } else {
        setErrorMessage(data.errorMessage)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.message)
      } else {
        console.error('Unexpected error', error)
      }
    }
  }

  return {login, logout, signUp, errorMessage}
}
export default useAuth
