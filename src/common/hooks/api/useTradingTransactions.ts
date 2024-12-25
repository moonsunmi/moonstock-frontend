import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const initStock = {ticker: '', name: '', market: ''}

const useTradingTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    transactions: IMatchedTrade[]
  }>(
    shouldFetch
      ? [`/api/users/transactions/${ticker}/trading`, userInfo.id]
      : null,
    {
      fallbackData: {
        stock: initStock,
        transactions: []
      }
    }
  )

  const stock = data.stock
  const tradings = data.transactions
  const buys: ITransaction[] = tradings
    .filter(transaction => transaction.partiallyDone === 'BUY')
    .map(transaction => ({
      id: transaction.id,
      type: transaction.partiallyDone,
      stockTicker: transaction.stockTicker,
      quantity: transaction.quantity,
      transactedAt: transaction.buyCreatedAt,
      price: transaction.buyPrice
    }))
  const sells: ITransaction[] = tradings
    .filter(transaction => transaction.partiallyDone !== 'BUY')
    .map(transaction => ({
      id: transaction.id,
      type: transaction.partiallyDone,
      stockTicker: transaction.stockTicker,
      quantity: transaction.quantity,
      transactedAt: transaction.sellCreatedAt,
      price: transaction.sellPrice
    }))

  return {stock, tradings, buys, sells, error, isLoading, mutate}
}

export default useTradingTransactions
