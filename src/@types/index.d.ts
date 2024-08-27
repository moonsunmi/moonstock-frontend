declare global {
  interface AddPurchase {
    type: ActionType.ADD
    payload: IPurchase
  }

  interface UpdatePurchase {
    type: ActionType.UPDATE
    payload: IPurchase
  }

  interface RemovePurchase {
    type: ActionType.REMOVE
    payload: {id: string}
  }

  export type PurchaseAction = AddPurchase | UpdatePurchase | RemovePurchase

  type InputField = 'price' | 'quantity'

  export type Inputs = {
    [key in InputField]: string
  }

  export type Output = {
    investmentAmount: string
  }

  export type FieldValue = '' | number

  export interface IPurchase {
    id: string
    price: FieldValue
    quantity: FieldValue
  }

  export type APIStockDetail = {
    numOfRows: number
    pageNo: number
    totalCount: number
    items: {
      item: [
        {
          basDt: string
          srtnCd: string
          isinCd: string
          itmsNm: string
          mrktCtg: string
          clpr: string
          vs: string
          fltRt: string
          mkp: string
          hipr: string
          lopr: string
          trqu: string
          trPrc: string
          lstgStCnt: string
          mrktTotAmt: string
        }
      ]
    }
  }

  export type TradeDetail = {
    totalQuantity: number
    investmentAmount: number
    averagePrice: number
  }
}

export {}
