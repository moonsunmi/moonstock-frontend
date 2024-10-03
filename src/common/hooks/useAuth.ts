import useSWRMutation from 'swr/mutation'
import {useDispatch} from '@/store/store'
import {setUserInfo} from '@/store/slices/authSlice'
// libs
import axiosInstance from '../lib/axios'

type loginArg = {email: string; password: string}
type signUpArg = {name: string; email: string; password: string}

const useAuth = () => {
  const dispatch = useDispatch()

  const loginMutation = useSWRMutation(
    '/auth/login',
    (url, {arg}: {arg: loginArg}) => {
      const {email, password} = arg

      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)

      return axiosInstance
        .post(url, formData, {withCredentials: false})
        .then(res => res.data)
    }
  )

  const logout = () => {
    // logout api 연결해야 함. token 무효화 시켜야.
    dispatch(setUserInfo({name: null, email: null}))
  }

  const signUpMutation = useSWRMutation(
    '/auth/sign-up',
    (url, {arg}: {arg: signUpArg}) => {
      const {name, email, password} = arg

      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)

      return axiosInstance
        .post(url, formData, {
          headers: {'Content-Type': undefined}, //(for 'multipart/form-data')
          withCredentials: false
        })
        .then(res => res.data)
    }
  )

  return {
    loginMutation,
    logout,
    signUpMutation
  }
}
export default useAuth
