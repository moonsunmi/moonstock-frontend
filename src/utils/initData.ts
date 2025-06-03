export const initStock: IStock = {
  ticker: '',
  name: '',
  market: ''
}

export const initTransaction: ITransaction = {
  id: '',
  stockTicker: '',
  tradeAt: new Date(),
  price: 0,
  quantity: 0,
  accountId: 'cmap9m7vq00008hi2x1knbvie' // todo. account로 연결
}
