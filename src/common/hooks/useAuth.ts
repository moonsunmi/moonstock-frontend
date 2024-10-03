import useSWRMutation from 'swr/mutation'
import axiosInstance from '../lib/axios'

type loginArg = {email: string; password: string}
type signUpArg = {name: string; email: string; password: string}

const useAuth = () => {
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

  const logoutMutation = useSWRMutation('/auth/logout', url => {
    return axiosInstance.post(url)
  })

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
    logoutMutation,
    signUpMutation
  }
}
export default useAuth
