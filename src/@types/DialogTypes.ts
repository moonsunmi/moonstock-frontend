export type DialogType = 'buy' | 'sell' | 'update' | 'delete'

// export interface BuyDialogData {
//   id: string
//   name: string
//   price: number
// }

export interface SellDialogData {
  id: string
  relatedBuyId: string
  quantity: number
}

export interface UpdateDialogData {
  id: string
  updatedField: string
  newValue: any
}

export type DialogData =
  | {type: 'buy'; data: ITransaction}
  | {type: 'sell'; data: SellDialogData}
  | {type: 'update'; data: UpdateDialogData}
