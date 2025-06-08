import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface AccountType {
  id: string
  userId: string
  name: string
  feeRate: number
  isDefault: boolean
}

interface AccountState {
  accounts: AccountType[]
  setAccounts: (accounts: AccountType[]) => void
  resetAccounts: () => void
}

export const useAccountStore = create<AccountState>()(
  persist(
    set => ({
      accounts: [],
      setAccounts: accounts => set({accounts: accounts}),
      resetAccounts: () => set({accounts: []})
    }),
    {name: 'account-state'}
  )
)
