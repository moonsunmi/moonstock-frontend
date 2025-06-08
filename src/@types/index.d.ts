declare global {
  export type Callback = () => void

  // component
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  export type Variant = 'text' | 'outlined' | 'solid' | 'ghost'

  export type ActionType = 'add' | 'update' | 'remove'

  // api
  export type RequestType = 'CREATE' | 'UPDATE' | 'DELETE'
  export type ApiStatus = 'idle' | 'loading' | 'error' | 'success' | 'noResult'
  export type ApiState<T> = {
    data: T | null
    loading: boolean
    errMsg: string | null
  }

  // stock
  export type TransactionType = 'BUY' | 'SELL'

  export interface IMatchedTrade {
    id: string

    buyTrade: ITransaction
    sellTrade: ITransaction

    stockTicker: string
    profit: number
    netProfit: number
    fee: number
    tax: number
    feeRate: number
    taxRate: number

    matchAt: Date
  }

  export interface ITransaction {
    id: string
    type?: TransactionType
    quantity: number | ''
    price: number | ''
    tradeAt: Date

    stockTicker: string
  }

  export type ISimpleTrade = Pick<ITransaction, 'id', 'quantity', 'price'>

  export interface IStock {
    ticker: string
    name: string
    market: string
  }

  export type PurchaseAction = {
    type: ActionType
    payload: ISimpleTrade
  }

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
