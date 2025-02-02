import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface UserStateType {
  id: string
  name: string
  email: string
}
interface UserState {
  userInfo: UserStateType
  setUserInfo: (user: UserStateType) => void
  resetUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userInfo: {id: null, name: null, email: null},
      setUserInfo: user => set({userInfo: user}),
      resetUserInfo: () => set({userInfo: {id: null, name: null, email: null}})
    }),
    {name: 'user-state'}
  )
)
