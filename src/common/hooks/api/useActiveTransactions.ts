import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const initStock = {ticker: '', name: '', market: ''}

const useActiveTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    transactions: ITransaction[]
  }>(shouldFetch ? [`/api/transactions/${ticker}/active`, userInfo.id] : null, {
    fallbackData: {
      stock: initStock,
      transactions: []
    }
  })

  const stock = data.stock
  const tradings = data.transactions
  const buys: ITransaction[] = tradings.map(transaction => ({
    id: transaction.id,
    type: 'BUY',
    stockTicker: '', // todo.
    quantity: transaction.quantity,
    price: transaction.price,
    createdAt: transaction.createdAt,
    relatedBuyId: null
  }))

  return {stock, tradings, buys, error, isLoading, mutate}
}

export default useActiveTransactions
