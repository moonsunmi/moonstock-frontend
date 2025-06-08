export const initStock: IStock = {
  ticker: '',
  name: '',
  market: ''
}

export const initTransaction: ITrade = {
  id: '',
  stockTicker: '',
  tradeAt: new Date(),
  price: 0,
  quantity: 0
}
