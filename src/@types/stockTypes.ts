import {FieldValue} from './formTypes'

export interface IPurchase {
  id: string
  price: FieldValue
  quantity: FieldValue
}

export enum PurchaseType {
  HOLDING = 'holding',
  ADDITIONS = 'additions'
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
