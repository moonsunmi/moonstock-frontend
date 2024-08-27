import {ActionType} from '@/common/lib/constant'

export default function purchaseReducer(
  state: IPurchase[],
  action: PurchaseAction
) {
  switch (action.type) {
    case ActionType.ADD:
      return [...state, action.payload]
    case ActionType.REMOVE:
      const removedStocks = state.filter(
        stock => stock.id !== action.payload.id
      )
      return removedStocks
    case ActionType.UPDATE:
      const updatedStocks = state.map(stock =>
        stock.id === action.payload.id ? {...stock, ...action.payload} : stock
      )
      return updatedStocks
    default:
      throw new Error('Unhandled action type')
  }
}
