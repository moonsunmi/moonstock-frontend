export default function purchaseReducer(
  state: ITrade[],
  action: PurchaseAction
) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload]
    case 'remove':
      const removedStocks = state.filter(
        stock => stock.id !== action.payload.id
      )
      return removedStocks
    case 'update':
      const updatedStocks = state.map(stock =>
        stock.id === action.payload.id ? {...stock, ...action.payload} : stock
      )
      return updatedStocks
    default:
      throw new Error('Unhandled action type')
  }
}
