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

  export interface IHolding {
    stock: IStock
    transactions: IMatchedTrade[]
  }

  export interface IMatchedTrade {
    id: string
    type: TransactionType
    stockTicker: string
    quantity: number
    partiallyDone: TransactionType
    buyCreatedAt: Date
    sellCreatedAt: Date
    buyPrice: number
    sellPrice: number
  }

  export interface ITransaction {
    id: string
    type: TransactionType
    stockTicker: string
    quantity: number
    // partiallyDone?: TransactionType
    transactedAt: Date
    price: number
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
