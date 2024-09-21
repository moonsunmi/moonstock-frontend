declare global {
  export type Callback = () => void

  // component
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  export type Variant = 'text' | 'outlined' | 'solid' | 'ghost'

  export type ActionType = 'add' | 'update' | 'remove'

  // api
  export type ApiStatus = 'idle' | 'loading' | 'error' | 'success' | 'noResult'
  export type ApiState<T> = {
    data: T | null
    loading: boolean
    errMsg: string | null
  }

  export interface ITransaction {
    id: string
    price: number
    quantity: number
  }

  export type PurchaseAction = {type: ActionType; payload: ITransaction}

  export type Output = {
    investmentAmount: string
  }

  export type TradeDetail = {
    totalQuantity: number
    investmentAmount: number
    averagePrice: number
  }
}

export {}
