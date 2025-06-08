import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {AccountType} from './useAccountStore'

export interface UserStateType {
  id: string
  name: string
  email: string
  defaultAccount?: AccountType | null
}

interface UserState {
  userInfo: UserStateType
  setUserInfo: (user: UserStateType) => void
  resetUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userInfo: {id: null, name: null, email: null, defaultAccount: null},
      setUserInfo: user => set({userInfo: user}),
      resetUserInfo: () =>
        set({
          userInfo: {id: null, name: null, email: null, defaultAccount: null}
        })
    }),
    {name: 'user-state'}
  )
)
