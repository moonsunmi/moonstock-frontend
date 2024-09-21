'use client'

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState
} from 'react'
import axios from 'axios'
import * as U from '@/common/utils'

export type UserInfo = {name: string; email: string | null; image: string}
type Callback = () => void

type ContextType = {
  userInfo?: UserInfo
  signUp: (
    name: string,
    email: string,
    password: string,
    callback?: Callback
  ) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  userInfo: {name: '', email: '', image: null},
  signUp: (
    name: string,
    email: string,
    password: string,
    callback?: Callback
  ) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const signUp = useCallback(
    (name: string, email: string, password: string, callback?: Callback) => {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)

      axios
        .post('http://localhost:4000/auth/sign-up', formData, {
          headers: {
            'Content-Type': undefined //(for 'multipart/form-data')
          }
        })
        .then(res => {
          const {status, data} = res

          // // todo. store token in a http-only cookie
          // // document.cookie = `token=${data.token}; Secure; HttpOnly`;
          // U.writeStringP('jwt', data['body'] ?? '').finally(() => {
          //   setToken(data['body'] ?? '')
          // })
          // // setLoggedUser(user)
          // U.writeStringP('user', JSON.stringify(formData)).finally(
          //   () => callback && callback()
          // )
        })
        .catch(error => {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.message)
          }
        })

      // setLoggedUser({email, password})

      U.writeStringP('user', JSON.stringify(formData)).finally(
        () => callback && callback()
      )
    },
    []
  )

  const login = (email: string, password: string, callback?: Callback) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    axios
      .post('http://localhost:4000/auth/login', formData, {
        withCredentials: true // cookie 안에 있는 token을 위해
      })
      .then(res => {
        const {status, data} = res

        if (data.ok) {
          setUserInfo(data.userInfo)
          callback && callback()
        } else {
          console.error(data.errorMessage)
        }
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.message)
        }
      })
  }

  const logout = (callback?: Callback) => {
    setUserInfo(undefined)
    callback && callback()
  }

  // useEffect(() => {
  //   U.readStringP('jwt')
  //     .then(jwt => jwt ?? '')
  //     .catch(() => {})
  // })

  const value = {errorMessage, userInfo, signUp, login, logout}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
