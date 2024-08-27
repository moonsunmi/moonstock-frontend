'use client'

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import * as U from '@/common/utils'
import axios from 'axios'

export type LoggedUser = {email: string; password: string}
type Callback = () => void

type ContextType = {
  loggedUser?: LoggedUser
  signup: (email: string, password: string, callback?: Callback) => void
  login: (email: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children
}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(
    undefined
  )
  const [jwt, setJwt] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const signup = useCallback(
    (email: string, password: string, callback?: Callback) => {
      const user = {email, password}

      axios
        .post('http://localhost:4000/auth/signup', user)
        .then(res => {
          const {status, data} = res

          U.writeStringP('jwt', data['body'] ?? '').finally(() => {
            setJwt(data['body'] ?? '')
          })
          setLoggedUser(user)
          U.writeStringP('user', JSON.stringify(user)).finally(
            () => callback && callback()
          )
        })
        .catch(error => {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.message)
          }
        })

      setLoggedUser({email, password})

      U.writeStringP('user', JSON.stringify(user)).finally(
        () => callback && callback()
      )
    },
    []
  )

  const login = (email: string, password: string, callback?: Callback) => {
    const user = {email, password}

    axios.post('http://localhost:4000/auth/login', user).then(res => {
      const {status, data} = res
      console.log(data)
    })

    setLoggedUser({email, password})
    callback && callback()
  }

  const logout = (callback?: Callback) => {
    setLoggedUser(undefined)
    callback && callback()
  }

  useEffect(() => {
    U.readStringP('jwt')
      .then(jwt => jwt ?? '')
      .catch(() => {})
  })

  const value = {jwt, errorMessage, loggedUser, signup, login, logout}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
