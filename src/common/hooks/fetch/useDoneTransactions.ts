import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const useDoneTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    transactions: ITransaction[]
  }>(
    shouldFetch
      ? [`/api/users/transactions/${ticker}/done`, userInfo.id]
      : null,
    {
      fallbackData: {transactions: []}
    }
  )
  return {data, error, isLoading, mutate}
}

export default useDoneTransactions
