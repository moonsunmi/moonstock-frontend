declare global {
  export type ActionType = 'add' | 'update' | 'remove'
  export type ApiStatus = 'idle' | 'loading' | 'error' | 'success' | 'noResult'

  export interface ITransaction {
    id: string
    price: '' | number
    quantity: '' | number
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
