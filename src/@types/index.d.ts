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

  // stock
  export type TransactionType = 'BUY' | 'SELL'

  export interface ITransaction {
    id: string
    type: TransactionType
    transactedAt: Date
    price: number
    quantity: number
    stock: IStock
  }

  export interface IStock {
    ticker: string
    name: string
    market: string
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
