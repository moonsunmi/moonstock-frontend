import useApi from './useApi'
import {useDispatch} from '@/store/store'
import {setUserInfo} from '@/store/slices/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()

  const {execute: loginRequest, data: loginData, errMsg: loginErrMsg} = useApi()
  const {
    execute: signUpRequest,
    data: signUpData,
    errMsg: signUpErrMsg
  } = useApi()

  const login = async (email: string, password: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    await loginRequest({
      url: 'http://localhost:4000/auth/login',
      method: 'POST',
      data: formData,
      withCredentials: true // cookie 안에 있는 token을 위해
    })
  }

  const logout = () => {
    dispatch(setUserInfo({name: null, email: null}))
  }

  const signUp = async (name: string, email: string, password: string) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)

    await signUpRequest({
      url: 'http://localhost:4000/auth/sign-up',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': undefined //(for 'multipart/form-data')
      }
    })
  }

  return {
    login,
    loginData,
    loginErrMsg,
    logout,
    signUp,
    signUpData,
    signUpErrMsg
  }
}
export default useAuth
