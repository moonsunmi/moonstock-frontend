import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const initStock = {ticker: '', name: '', market: ''}

const useTradingTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<IHolding>(
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

  return {tradings: data, error, isLoading, mutate}
}

export default useTradingTransactions
