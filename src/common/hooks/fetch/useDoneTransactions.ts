import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const useDoneTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    total: {profit: number; quantity: number}
    transactions: IRecording[]
  }>(
    shouldFetch
      ? [`/api/users/transactions/${ticker}/done`, userInfo.id]
      : null,
    {
      fallbackData: {
        stock: null,
        total: {profit: 0, quantity: 0},
        transactions: []
      }
    }
  )

  const transactions = data.transactions
  const stock = data.stock
  const total = data.total

  return {
    transactions,
    stock,
    total,
    error,
    isLoading,
    mutate
  }
}

export default useDoneTransactions
