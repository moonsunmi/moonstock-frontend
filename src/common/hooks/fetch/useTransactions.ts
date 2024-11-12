import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const useTransactions = ticker => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const {data, error, isLoading, mutate} = useSWR<{
    transactions: ITransaction[]
  }>([`/api/users/transactions/${ticker}`, userInfo.id], {
    fallbackData: {transactions: []}
  })
  return {data, error, isLoading, mutate}
}

export default useTransactions
